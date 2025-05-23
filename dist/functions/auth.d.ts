import "server-only";
import { Session } from "../types";
import { IWebRequest } from "../adaptor/types";
export declare function sessionsInternal(request: IWebRequest): Promise<false | Session>;
