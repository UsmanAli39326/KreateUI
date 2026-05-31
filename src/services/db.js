import { db, auth } from "../firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

// Helper to get current user ID
const getCurrentUserId = () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    return user.uid;
};

// --- User Stats ---

export const getUserStats = async () => {
    try {
        const uid = getCurrentUserId();
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().stats || null;
        } else {
            // Initialize user doc if it doesn't exist
            const initialStats = {
                accessibilityScore: { value: 0, trend: 0, trendDirection: "neutral", lastUpdated: "Never" },
                totalIssues: { value: 0, trend: 0, trendDirection: "neutral", breakdown: [0, 0, 0, 0] },
                pendingRecommendations: { value: 0, badge: "None", criticalFixes: 0 }
            };
            await setDoc(docRef, {
                email: auth.currentUser.email,
                displayName: auth.currentUser.displayName,
                stats: initialStats
            }, { merge: true });
            return initialStats;
        }
    } catch (error) {
        console.error("Error fetching user stats:", error);
        throw error;
    }
};

// --- Projects ---

export const getUserProjects = async () => {
    try {
        const uid = getCurrentUserId();
        const q = query(
            collection(db, "users", uid, "projects"),
            orderBy("lastScanned", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};

export const addUserProject = async (projectData) => {
    try {
        const uid = getCurrentUserId();
        const newProject = {
            ...projectData,
            createdAt: serverTimestamp(),
            lastScanned: serverTimestamp(), // Mock scan time
            status: "healthy", // Default
            score: 0,
            issuesCount: 0
        };
        const docRef = await addDoc(collection(db, "users", uid, "projects"), newProject);
        return { id: docRef.id, ...newProject };
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
};
