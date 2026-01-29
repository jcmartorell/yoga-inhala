import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@shared/routes";
import { useMutation } from "@tanstack/react-query";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: "inhara-auth",
    }
  )
);

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);
  
  return useMutation({
    mutationFn: async (password: string) => {
      const res = await fetch(api.admin.login.path, {
        method: api.admin.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
      }
      
      return api.admin.login.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
}

export function useLogout() {
  const logoutLocal = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async () => {
      if (!token) return;
      await fetch(api.admin.logout.path, {
        method: api.admin.logout.method,
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      logoutLocal();
    },
  });
}
