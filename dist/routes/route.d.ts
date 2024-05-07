import { NextRequest } from "next/server";
interface RequestContext {
    params: {
        [key: string]: string[];
    };
}
export declare function GET(request: NextRequest, ctx: RequestContext): Promise<void | Response>;
export {};
