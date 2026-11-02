"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

interface AuthContextValue {
  user: any | null;
  profile: Profile | null;
  credits: number;
  freeCredits: number;
  paidCredits: number;
  loading: boolean;
  refreshCredits: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  credits: 3,
  freeCredits: 3,
  paidCredits: 0,
  loading: true,
  refreshCredits: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.profile) {
          setProfile(data.profile);
          setUser(data.user);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch user profile from /api/auth/profile", err);
    }
  }, []);

  useEffect(() => {
    // Check Supabase auth state
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.trim() === "") {
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Initial session check
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setUser(user);
          fetchProfile().finally(() => setLoading(false));
        } else {
          // If no Supabase user, check if demo profile is active
          fetchProfile().finally(() => setLoading(false));
        }
      }).catch(() => {
        fetchProfile().finally(() => setLoading(false));
      });

      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser(session.user);
            await fetchProfile();
          } else {
            // Check if demo session still active
            await fetchProfile();
          }
          setLoading(false);
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    } catch (e) {
      fetchProfile().finally(() => setLoading(false));
    }
  }, [fetchProfile]);

  const refreshCredits = async () => {
    await fetchProfile();
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    setProfile(null);
    window.location.href = "/login";
  };

  const freeCredits = profile?.free_credits ?? 3;
  const paidCredits = profile?.paid_credits ?? 0;
  const totalCredits = freeCredits + paidCredits;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        credits: totalCredits,
        freeCredits,
        paidCredits,
        loading,
        refreshCredits,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
