import { NextRequest } from 'next/server';

interface Provider {
    handleCallback(request: NextRequest): Promise<Response>;
    handleSignIn(request: NextRequest, referer?: string): Promise<Response>;
    handleSignOut(request: NextRequest): Promise<void>;
    handleAuthCheck(token: string): Promise<{
        user: UserType;
    } | false>;
}
interface Database {
    createAccount(data: AccountType): Promise<AccountType>;
    createUser(data: UserType): Promise<UserType>;
    createSession(data: SessionType): Promise<SessionType>;
    findAccount(data: Partial<AccountType>): Promise<AccountType | undefined>;
    findUser(data: Partial<UserType>): Promise<UserType | undefined>;
    findSession(data: Partial<SessionType>): Promise<SessionType | undefined>;
    purgeSessions(user: UserType): Promise<boolean>;
}
interface Cache {
    getValue(key: string): Promise<string | null>;
    setValue(key: string, value: string, options?: {
        expire: number;
    }): Promise<unknown>;
    deleteKey(key: string): Promise<number>;
}
interface SingleConfig {
    provider: Provider;
    database: Database;
    cache: Cache;
}
interface Config {
    [key: string]: SingleConfig;
}
type Secret = {
    secret: string;
    algorithm: string;
};
interface Session {
    user: UserType;
}
interface AccountType {
    accountId: string;
    provider: string;
    accessToken: string;
    refreshToken: string;
    expiresAt?: Date | undefined;
    tokenType?: string;
    scope: string;
}
interface SessionType {
    sessionToken: string;
    provider: string;
    accountId: string;
    expiresAt: Date;
}
interface UserType {
    name: string;
    email: string;
    image: string;
    accountId: string;
    provider: string;
    emailVerified: boolean;
}
type ErrorResult = {
    success: false;
    message: string;
    status: number;
};
type ApiResult<T> = JsonResult<T> | ErrorResult;
type JsonResult<T> = {
    success: true;
    data: T;
};
interface SignInConfig {
    redirect_url?: string;
    email?: string;
    password?: string;
    method?: string;
}
type SignInWithProviderResult = Promise<false | JsonResult<{
    url: string;
}> | ErrorResult>;

export type { AccountType, ApiResult, Cache, Config, Database, ErrorResult, JsonResult, Provider, Secret, Session, SessionType, SignInConfig, SignInWithProviderResult, SingleConfig, UserType };
