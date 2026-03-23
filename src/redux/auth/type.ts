export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface UserSession {
  token: string;
  isAuthenticated: boolean;
  userProfile: User | null;
}

export interface AuthState {
  authenticating: boolean;
  authenticated: boolean;
  isAuthenticated: boolean;
  token: string | null;
  userProfile: User | null;
  error: string | null;
}

export interface AuthSlice {
  state: AuthState;
}
