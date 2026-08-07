import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";

export function useAccoladeWinners() {
  const [winners, setWinners] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!db) return;
    return onSnapshot(collection(db, "accolades"), (snapshot) => {
      const next: Record<string, string> = {};
      snapshot.forEach((docSnap) => {
        const winner = docSnap.data().winner;
        if (typeof winner === "string") next[docSnap.id] = winner;
      });
      setWinners(next);
    });
  }, []);

  const setWinner = async (accoladeId: string, winner: string) => {
    if (!db) return;
    await setDoc(doc(db, "accolades", accoladeId), { winner });
  };

  return { winners, setWinner, firebaseEnabled };
}
