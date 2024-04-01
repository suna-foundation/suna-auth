import { NextRequest } from "next/server";
import { Auth } from "../../../index";
import { SingleConfig } from "../../../types";
import { sendErrorRedirect } from "../../../functions/responces";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      [key: string]: string[];
    };
  },
) {
  const key = Object.keys(params)[0];
  if (!params[key].at(-1))
    return sendErrorRedirect(500, "this provider is not implemented");
  const authProvider: SingleConfig =
    Auth.config[params[key].at(-1) as keyof typeof Auth.config];

  return authProvider.provider.handleCallback(request);
}
