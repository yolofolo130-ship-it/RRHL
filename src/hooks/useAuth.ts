import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth, githubProvider, firebaseEnabled } from "@/lib/firebase";
import { AUTHORIZED_UIDS } from "@/data/authorizedEditors";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = () => {
    if (!auth) return;
    signInWithPopup(auth, githubProvider).catch((err) => {
      console.error("GitHub sign-in failed", err);
    });
  };

  const logOut = () => {
    if (!auth) return;
    signOut(auth);
  };

  const isEditor = Boolean(user && AUTHORIZED_UIDS.includes(user.uid));

  return { user, loading, isEditor, signIn, logOut, firebaseEnabled };
}
