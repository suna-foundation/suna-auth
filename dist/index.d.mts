import { Session, Config, Secret, AccountType, UserType, SessionType } from './types/index.mjs';
import { NextRequest } from 'next/server';
import { JWTVerifyResult } from 'jose';

declare function sessionsInternal(): Promise<false | Session>;

interface RequestContext {
    params: {
        [key: string]: string[];
    };
}
declare function GET(request: NextRequest, ctx: RequestContext): Promise<void | Response>;

/**
 * Sends an error response with the given status and message.
 *
 * @param {number} status - The HTTP status code of the error response.
 * @param {string} message - The error message to be included in the response.
 * @returns {object} - The error response object.
 */
declare const sendError: (status: number, message: string) => Response;
/**
 * Creates a JSON response object with optional status code.
 *
 * @param {any} data - The data to be included in the response.
 * @param {number} [code] - The optional status code for the response.
 * @returns {object} - The JSON response object.
 */
declare const sendJson: (data: any, code?: number) => Response;
/**
 * Redirects to the error page with the provided status and message.
 *
 * @param {number} status - The HTTP status code of the error.
 * @param {string} message - The error message.
 */
declare const sendErrorRedirect: (status: number, message: string) => Response;

interface CreatTokenPayload {
    provider: string;
    email: string;
    sub: string;
    [key: string]: string;
}
declare const createToken: (data: CreatTokenPayload, expiration: Date) => Promise<string>;
declare const decodeToken: <T = CreatTokenPayload>(sessionTokenString: string) => Promise<false | JWTVerifyResult<T>>;

declare class Auth {
    static config: Config;
    static secret: Secret;
    auth: typeof sessionsInternal;
    routes: {
        GET: typeof GET;
    };
    static callbacks: {
        handleAuthCheck(session: Session): Promise<Session>;
        handleCreate(account: AccountType, user: UserType, session: SessionType): Promise<any>;
    };
    constructor(config: Config, secret: any, callbacks?: typeof Auth.callbacks);
}

export { Auth, createToken, decodeToken, sendError, sendErrorRedirect, sendJson };
