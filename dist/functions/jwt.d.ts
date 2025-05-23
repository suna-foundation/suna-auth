import { type JWTVerifyResult, KeyLike } from "jose";
export interface CreatTokenPayload {
    provider: string;
    email: string;
    sub: string;
    [key: string]: string;
}
export declare const getPrivateKey: () => Promise<KeyLike | Uint8Array>;
export declare const createToken: (data: CreatTokenPayload, expiration: Date) => Promise<string>;
export declare const decodeToken: <T = CreatTokenPayload>(sessionTokenString: string) => Promise<JWTVerifyResult<T> | false>;
