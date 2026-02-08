let credentials: { email: string; password: string } | null = null;

export function setSignupCredentials(email: string, password: string) {
  credentials = { email, password };
}

export function getSignupCredentials() {
  return credentials;
}

export function clearSignupCredentials() {
  credentials = null;
}
