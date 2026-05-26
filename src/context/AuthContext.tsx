"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, signOut, onAuthStateChanged } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
  createdAt: string;
  subscription: string;
  onboardingCompleted: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  isFirebaseConfigured: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isFirebaseConfigured = !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "dummy-api-key-for-viralflow-ai"
  );

  const refreshUser = async () => {
    if (isFirebaseConfigured && auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const data = userSnap.data() as UserProfile;
          setUser(data);
          localStorage.setItem("userSession", JSON.stringify({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: data.name,
            isLoggedIn: true,
            photoURL: data.avatar,
            onboardingCompleted: data.onboardingCompleted,
            subscription: data.subscription
          }));
        }
      } catch (err) {
        console.error("Error refreshing user profile:", err);
      }
    } else {
      const sessionStr = localStorage.getItem("userSession");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        setUser({
          uid: session.uid || "local_mock_uid",
          name: session.name || "Local Creator",
          email: session.email || "local@example.com",
          avatar: session.photoURL || "",
          provider: "local",
          createdAt: new Date().toISOString(),
          subscription: session.subscription || "Free Tier",
          onboardingCompleted: session.onboardingCompleted ?? true
        });
      }
    }
  };

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setLoading(true);
        if (firebaseUser) {
          try {
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userDocRef);
            
            if (userSnap.exists()) {
              const data = userSnap.data() as UserProfile;
              setUser(data);
              localStorage.setItem("userSession", JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: data.name,
                isLoggedIn: true,
                photoURL: data.avatar,
                onboardingCompleted: data.onboardingCompleted,
                subscription: data.subscription
              }));
            } else {
              const defaultProfile: UserProfile = {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "AI Creator",
                email: firebaseUser.email || "",
                avatar: firebaseUser.photoURL || "",
                provider: firebaseUser.providerData[0]?.providerId || "google.com",
                createdAt: new Date().toISOString(),
                subscription: "Free Tier",
                onboardingCompleted: false
              };
              await setDoc(userDocRef, defaultProfile);
              setUser(defaultProfile);
              localStorage.setItem("userSession", JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: defaultProfile.name,
                isLoggedIn: true,
                photoURL: defaultProfile.avatar,
                onboardingCompleted: false,
                subscription: "Free Tier"
              }));
            }
          } catch (err) {
            console.error("Firestore user sync error:", err);
            const fallbackProfile: UserProfile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || "AI Creator",
              email: firebaseUser.email || "",
              avatar: firebaseUser.photoURL || "",
              provider: firebaseUser.providerData[0]?.providerId || "unknown",
              createdAt: new Date().toISOString(),
              subscription: "Free Tier",
              onboardingCompleted: false
            };
            setUser(fallbackProfile);
          }
        } else {
          setUser(null);
          localStorage.removeItem("userSession");
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      const checkLocalSession = () => {
        const sessionStr = localStorage.getItem("userSession");
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          setUser({
            uid: session.uid || "local_mock_uid",
            name: session.name || "Local Creator",
            email: session.email || "local@example.com",
            avatar: session.photoURL || "",
            provider: "local",
            createdAt: new Date().toISOString(),
            subscription: session.subscription || "Free Tier",
            onboardingCompleted: session.onboardingCompleted ?? true
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      };
      checkLocalSession();
      window.addEventListener("storage", checkLocalSession);
      return () => window.removeEventListener("storage", checkLocalSession);
    }
  }, [isFirebaseConfigured]);

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    } else {
      localStorage.removeItem("userSession");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, isFirebaseConfigured, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
