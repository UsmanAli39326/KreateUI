const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://webuifixer.onrender.com/api';

// Helper to get tokens
export const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

// Helper to set tokens
export const setTokens = (token, refreshToken) => {
  if (token) localStorage.setItem('token', token);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

// Helper to clear tokens
export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

async function customFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle FormData separately since it doesn't need Content-Type JSON
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    let data;
    const contentType = response.headers.get('content-type');

    // Handle binary responses (e.g. PDF/ZIP)
    if (contentType && (
      contentType.includes('application/pdf') ||
      contentType.includes('application/zip') ||
      contentType.includes('application/octet-stream')
    )) {
      return response.blob();
    }

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (response.ok) {
      return data; // Usually returns { message, data, error, errors }
    }

    // Handle 401 Unauthorized (Token Expiry)
    if (response.status === 401) {
      if (options._retry) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(data || 'Unauthorized');
      }

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        window.location.href = '/auth'; // Adjust based on router setup
        return Promise.reject(data || 'Unauthorized');
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
          });

          if (!refreshRes.ok) {
            throw new Error('Refresh failed');
          }

          const refreshData = await refreshRes.json();
          setTokens(refreshData.token, refreshData.refreshToken || refreshToken);
          isRefreshing = false;
          onRefreshed(refreshData.token);
        } catch (refreshErr) {
          isRefreshing = false;
          clearTokens();
          window.location.href = '/auth';
          return Promise.reject({ error: 'Session expired. Please log in again.' });
        }
      }

      // Wait for token refresh and retry
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(customFetch(endpoint, { ...options, _retry: true, headers: config.headers }));
        });
      });
    }

    // Global error handling based on status codes
    let errorMessage = 'An unexpected error occurred';
    if (data && data.error) {
      errorMessage = data.error;
    } else if (data && data.message) {
      errorMessage = data.message;
    }

    if (response.status === 400) {
      console.error('Validation Error:', data?.errors || data?.error);
    } else if (response.status === 401) {
      errorMessage = 'Session expired. Please log in again.';
    } else if (response.status === 403) {
      console.error('Access Denied');
      window.dispatchEvent(new CustomEvent('api:forbidden'));
      errorMessage = 'Access Denied: You do not have permission to perform this action.';
    } else if (response.status === 404) {
      console.error('Resource Not Found');
      errorMessage = 'Resource Not Found: The requested endpoint does not exist.';
    } else if (response.status === 429) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      console.error('Rate Limit Exceeded. Reset at:', resetTime);
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (response.status >= 500) {
      console.error('Service Unavailable');
      errorMessage = 'Service Unavailable: Our servers are currently experiencing issues. Please try again later.';
    }

    if (typeof data === 'object' && data !== null) {
      return Promise.reject({ ...data, error: data.error || errorMessage });
    }

    return Promise.reject({ error: errorMessage, originalData: data });
  } catch (error) {
    // Network errors
    console.error('Fetch Error:', error);
    return Promise.reject({
      error: 'Network Error: Unable to connect to the server. Please check your connection and try again.'
    });
  }
}

const apiService = {
  get: (endpoint, options = {}) => customFetch(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => customFetch(endpoint, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (endpoint, body, options = {}) => customFetch(endpoint, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: (endpoint, body, options = {}) => customFetch(endpoint, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: (endpoint, options = {}) => customFetch(endpoint, { ...options, method: 'DELETE' }),
};

export default apiService;
