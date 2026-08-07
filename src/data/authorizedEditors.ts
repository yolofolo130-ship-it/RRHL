// Firebase Auth UIDs allowed to edit accolade winners in the app.
// Sign in with GitHub once each (button on /accolades), then copy the UID
// shown next to "Signed in as" (or from Firebase console > Authentication >
// Users) into this list for BackendsMan and yolofolo130-ship-it.
//
// This is a client-side convenience check only — the real enforcement is
// the Firestore security rule, which must list the same UIDs.
export const AUTHORIZED_UIDS: string[] = [
  // "uid-for-BackendsMan",
  // "uid-for-yolofolo130-ship-it",
];
