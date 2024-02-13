import {NextRequest} from "next/server";

interface Provider {
  handleCallback(request: NextRequest): Promise<Response>;
  handleSignIn(request: NextRequest, referer?: string): Promise<Response>;
  handleSignOut(request: NextRequest): Promise<void>;
  handleAuthCheck(token: string): Promise<{ user: UserType } | false>;
}

declare class Database {
  public createAccount(data: AccountType): Promise<AccountType>;
  public createUser(data: UserType): Promise<UserType>;
  public createSession(data: SessionType): Promise<SessionType>;
  public findAccount(data: Partial<AccountType>): Promise<AccountType | undefined>;
  public findUser(data: Partial<UserType>): Promise<UserType | undefined>;

  public findSession(data: Partial<SessionType>): Promise<SessionType | undefined>;
  public purgeSessions(user: UserType) : Promise<boolean>;
}


export declare class Cache {
  public getValue(key: string): Promise<string | null>;
  public setValue(key: string, value: string, options?: { expire: number; }): Promise<unknown>;
  public deleteKey(key: string): Promise<number>;
}

export interface SingleConfig {
  provider: Provider,
  database: Database,
  cache: Cache
}

export interface Config {
  [key: string]: SingleConfig
}

export type Secret = string

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
  provider: string
  accountId: string
  expiresAt: Date
}

export interface UserType {
  name: string;
  email: string;
  image: string;
  accountId: string;
  provider: string;
  emailVerified: boolean;
}