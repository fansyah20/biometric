"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthState, AuthStep, UserProfile } from "@/types/user";
import { emptyDocumentRecords, type DocumentKey, type DocumentRecord } from "@/types/document";

interface LoginResult {
  ok: boolean;
  error?: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (payload: RegisterPayload) => Promise<LoginResult>;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  setDocument: (key: DocumentKey, patch: Partial<DocumentRecord>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const mockAccounts = new Map<string, { password: string; profile: UserProfile }>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ step: "idle", user: null, error: null });

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setState({ step: "authenticating", user: null, error: null });
    await new Promise((resolve) => setTimeout(resolve, 700));

    const account = mockAccounts.get(email);
    if (!account || account.password !== password) {
      const message = "Email atau password salah.";
      setState({ step: "error", user: null, error: message });
      return { ok: false, error: message };
    }

    setState({ step: "authenticated", user: account.profile, error: null });
    return { ok: true };
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<LoginResult> => {
    setState({ step: "authenticating", user: null, error: null });
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (mockAccounts.has(payload.email)) {
      const message = "Email sudah terdaftar.";
      setState({ step: "error", user: null, error: message });
      return { ok: false, error: message };
    }

    const profile: UserProfile = {
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      documents: emptyDocumentRecords(),
    };
    mockAccounts.set(payload.email, { password: payload.password, profile });

    setState({ step: "idle", user: null, error: null });
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setState({ step: "idle", user: null, error: null });
  }, []);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated: UserProfile = { ...prev.user, ...patch };
      const account = mockAccounts.get(prev.user.email);
      if (account) account.profile = updated;
      return { ...prev, user: updated };
    });
  }, []);

  const setDocument = useCallback((key: DocumentKey, patch: Partial<DocumentRecord>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const documents = { ...(prev.user.documents ?? emptyDocumentRecords()) };
      documents[key] = { ...documents[key], key, ...patch };
      const updated: UserProfile = { ...prev.user, documents };
      const account = mockAccounts.get(prev.user.email);
      if (account) account.profile = updated;
      return { ...prev, user: updated };
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, login, register, logout, updateProfile, setDocument }),
    [state, login, register, logout, updateProfile, setDocument]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export type { AuthStep };