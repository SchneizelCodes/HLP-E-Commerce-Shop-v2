import { projectId, publicAnonKey } from './info.tsx';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c776dae1`;

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  session?: {
    access_token: string;
    refresh_token: string;
  };
  error?: string;
}

export const authClient = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.error || 'Signup failed',
          error: result.error,
        };
      }

      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error during signup',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.error || 'Login failed',
          error: result.error,
        };
      }

      // Store session in localStorage
      if (result.session) {
        localStorage.setItem('access_token', result.session.access_token);
        localStorage.setItem('refresh_token', result.session.refresh_token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error during login',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async getCurrentUser(): Promise<AuthResponse | null> {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        return null;
      }

      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        // Clear invalid session
        this.logout();
        return null;
      }

      const result = await response.json();
      return {
        success: true,
        message: 'User authenticated',
        user: result.user,
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
