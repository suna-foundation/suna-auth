import { NextRequest } from "next/server";
export declare function GET(request: NextRequest, { params, }: {
    params: {
        [key: string]: string[];
    };
}): Promise<Response>;
