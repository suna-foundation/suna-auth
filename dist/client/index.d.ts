import { Auth } from '../index.js';
import { SignInConfig, JsonResult, ErrorResult } from '../types/index.js';
import 'next/server';
import 'jose';

declare function signIn(provider: keyof typeof Auth.config, config?: SignInConfig): Promise<false | JsonResult<{
    url: string;
}> | ErrorResult>;
declare function signOut(): Promise<void>;

export { signIn, signOut };
