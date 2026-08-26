export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: string[];
  sessionId: string;
}
