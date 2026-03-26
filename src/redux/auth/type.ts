export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export type SessionStatus = 'unknown' | 'authenticated' | 'unauthenticated';

export interface UserSession {
  status: SessionStatus;
  isRefreshing: boolean;
  userProfile: User | null;
  lastVerifiedAt: string | null;
}

export interface AuthState {
  user: User | null;
  sessionStatus: SessionStatus;
  isLoading: boolean;
  isRefreshing: boolean;
  lastVerifiedAt: string | null;
  failureReason: string | null;
  error: string | null;
}

export interface AuthSlice {
  state: AuthState;
}
