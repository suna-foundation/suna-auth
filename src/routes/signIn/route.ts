import { NextRequest } from "next/server";
import { sendError } from "../../functions/responces";
import { Auth } from "../../index";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider") as
    | keyof typeof Auth.config
    | null;
  const referer =
    request.headers.get("redirect_url") ||
    request.headers.get("referer") ||
    "/";

  if (!provider) return sendError(400, "please provide a ?provider");

  const providerData = Auth.config[provider];

  if (!providerData)
    return sendError(400, `Provider ${provider} is not supported.`);

  return providerData.provider.handleSignIn(request, referer);
}
