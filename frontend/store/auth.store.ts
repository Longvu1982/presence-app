import services from "@/api";
import { getSecureValueSync, saveSecureSync } from "@/utils";
import { router } from "expo-router";
import { create } from "zustand";

interface User {
  authentication: {
    sessionToken: string;
  };
  email: string;
  fullName: string;
  _id: string;
}

const initialUser = {
  authentication: {
    sessionToken: "",
  },
  email: "",
  fullName: "",
  _id: "",
};

interface AuthState {
  user: User;
  setToken: (token: string) => void;
  removeToken: () => void;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(getSecureValueSync("user") ?? "{}") ?? ({} as User),
  setToken: (token) => set((state) => ({ user: { ...state.user, sessionToken: token } })),
  removeToken: () => set((state) => ({ user: { ...state.user, sessionToken: "" } })),
  setUser: (user: User) => set({ user }),
  logout: async () => {
    const { user } = get();
    const email = user.email;
    const { result } = await services.auth.logout({ email });
    if (result) {
      set({ user: initialUser });
      saveSecureSync("user", JSON.stringify(initialUser));
      router.replace("/login");
    }
  },
}));

export default useAuthStore;
