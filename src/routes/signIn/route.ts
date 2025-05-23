import { IWebRequest } from "../../adaptor/types";
import { sendError } from "../../functions/responces";
import { Auth } from "../../index";

export async function GET(request: IWebRequest) {
  const searchQuery = request.query
  const provider = searchQuery.get("provider") as
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
