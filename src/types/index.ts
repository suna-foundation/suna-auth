import { NextRequest } from "next/server";

export interface Provider {
  handleCallback(request: NextRequest): Promise<Response>;

  handleSignIn(request: NextRequest, referer?: string): Promise<Response>;

  handleSignOut(request: NextRequest): Promise<void>;

  handleAuthCheck(token: string): Promise<{ user: UserType } | false>;
}

export interface Database {
  createAccount(data: AccountType): Promise<AccountType>;

  createUser(data: UserType): Promise<UserType>;

  createSession(data: SessionType): Promise<SessionType>;

  findAccount(data: Partial<AccountType>): Promise<AccountType | undefined>;

  findUser(data: Partial<UserType>): Promise<UserType | undefined>;

  findSession(data: Partial<SessionType>): Promise<SessionType | undefined>;

  purgeSessions(user: UserType): Promise<boolean>;
}

export interface Cache {
  getValue(key: string): Promise<string | null>;

  setValue(
    key: string,
    value: string,
    options?: { expire: number },
  ): Promise<unknown>;

  deleteKey(key: string): Promise<number>;
}

export interface SingleConfig {
  provider: Provider;
  database: Database;
  cache: Cache;
}

export interface Config {
  [key: string]: SingleConfig;
}

export type Secret = {
  secret: string;
  algorithm: string;
};

export interface Session {
  user: UserType;
}

export interface AccountType {
  accountId: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
  expiresAt?: Date | undefined;
  tokenType?: string;
  scope: string;
}

export interface SessionType {
  sessionToken: string;
  provider: string;
  accountId: string;
  expiresAt: Date;
}

export interface UserType {
  name: string;
  email: string;
  image: string;
  accountId: string;
  provider: string;
  emailVerified: boolean;
}

export type ErrorResult = { success: false; message: string; status: number };
export type ApiResult<T> = JsonResult<T> | ErrorResult;
export type JsonResult<T> = { success: true; data: T };

export interface SignInConfig {
  redirect_url?: string;
  email?: string;
  password?: string;
  method?: string;
}

export type SignInWithProviderResult = Promise<
  false | JsonResult<{ url: string }> | ErrorResult
>;
