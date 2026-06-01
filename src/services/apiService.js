const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
  const url = `${BASE_URL}${endpoint}`;
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
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login'; // Adjust based on router setup
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
          window.location.href = '/login';
          return Promise.reject('Session expired');
        }
      }

      // Wait for token refresh and retry
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(customFetch(endpoint, { ...options, headers: config.headers }));
        });
      });
    }

    // Global error handling based on status codes
    if (response.status === 400) {
      console.error('Validation Error:', data.errors || data.error);
    } else if (response.status === 403) {
      console.error('Access Denied');
    } else if (response.status === 404) {
      console.error('Resource Not Found');
    } else if (response.status === 429) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      console.error('Rate Limit Exceeded. Reset at:', resetTime);
    } else if (response.status >= 500) {
      console.error('Service Unavailable');
    }

    return Promise.reject(data);
  } catch (error) {
    // Network errors
    return Promise.reject(error);
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
