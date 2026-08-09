// Talks to GitHub's Contents API directly from the browser using a personal
// access token (classic PAT with `repo` scope, or a fine-grained token with
// Contents: Read and write on this repo) stored only in this browser's
// localStorage. A commit made here goes straight to `main` and triggers the
// same GitHub Pages deploy as any other push.

const OWNER = "yolofolo130-ship-it";
const REPO = "RRHL";
const BRANCH = "main";
const TOKEN_KEY = "rrhl-admin-token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function api(path: string, init: RequestInit = {}): Promise<any> {
  const token = getToken();
  if (!token) throw new Error("Not signed in.");
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status} ${res.statusText}: ${body}`);
  }
  return res.json();
}

// Confirms the token works and returns the authenticated username.
export async function verifyToken(): Promise<string> {
  const user = await api("/user");
  return user.login as string;
}

function decodeBase64Utf8(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function encodeBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export interface RemoteFile {
  content: string;
  sha: string;
}

export async function getFile(path: string): Promise<RemoteFile> {
  const data = await api(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  return { content: decodeBase64Utf8(data.content), sha: data.sha };
}

// Returns the new file sha, so the caller can chain another edit without
// re-fetching.
export async function commitFile(
  path: string,
  content: string,
  sha: string,
  message: string,
): Promise<string> {
  const data = await api(`/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: encodeBase64Utf8(content),
      sha,
      branch: BRANCH,
    }),
  });
  return data.content.sha as string;
}
