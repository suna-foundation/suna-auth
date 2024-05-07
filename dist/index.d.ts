import { sessionsInternal } from "./functions/auth";
import { AccountType, Config, Secret, Session, SessionType, UserType } from "./types";
import { GET } from "./routes/route";
import { sendError, sendErrorRedirect, sendJson } from "./functions/responces";
import { createToken, decodeToken } from "./functions/jwt";
export declare class Auth {
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
export { sendError, sendJson, sendErrorRedirect, decodeToken, createToken };
