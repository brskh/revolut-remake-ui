import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

// Mock user data for demo
const mockUsers = [
  { id: '1', email: 'demo@apple.com', password: 'demo123', name: 'Apple User' },
  { id: '2', email: 'user@example.com', password: '123456', name: 'Jane Smith' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const token = `mock_token_${user.id}_${Date.now()}`;
          set({
            user: { id: user.id, email: user.email, name: user.name },
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }
        
        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          name,
        };
        
        mockUsers.push(newUser);
        
        const token = `mock_token_${newUser.id}_${Date.now()}`;
        set({
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      },
    }),
    {
      name: 'revolut-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);