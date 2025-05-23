import { Auth } from "../../../index";
import { SingleConfig } from "../../../types";
import { sendErrorRedirect } from "../../../functions/responces";
import { IWebRequest } from "../../../adaptor/types";

export async function GET(
  request: IWebRequest

) {
  const params = request.params.getAll()
  const key = Object.keys(params)[0];
  if (!params[key].at(-1))
    return sendErrorRedirect(500, "this provider is not implemented");
  const authProvider: SingleConfig =
    Auth.config[params[key].at(-1) as keyof typeof Auth.config];

  return authProvider.provider.handleCallback(request);
}
