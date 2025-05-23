import { IWebRequest } from "../../adaptor/types";

export async function GET(request: IWebRequest) {
  const cookieHandler = request.cookies;
  cookieHandler.delete("SessionToken");

  return new Response();
}
