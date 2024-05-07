import { Auth } from "../index";
import { ErrorResult, JsonResult, SignInConfig } from "../types";
export declare function signIn(provider: keyof typeof Auth.config, config?: SignInConfig): Promise<false | ErrorResult | JsonResult<{
    url: string;
}>>;
export declare function signOut(): Promise<void>;
