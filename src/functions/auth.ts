import "server-only";

import { cookies } from "next/headers";
import { Session } from "../types";
import { Auth } from "../index";
import { decodeToken } from "./jwt";

export async function sessionsInternal(): Promise<false | Session> {
  const cookie = cookies();
  const sessionTokenString = cookie.get("SessionToken")?.value;

  if (!sessionTokenString) return false;

  try {
    const decodedPayload = await decodeToken(sessionTokenString);
    if (
      !decodedPayload ||
      !decodedPayload.payload ||
      !decodedPayload.payload.provider
    )
      return false;

    const currentProvider =
      Auth.config[decodedPayload.payload.provider as keyof typeof Auth.config];

    /*let cacheAccount: IAccounts | undefined = undefined
    if (currentProvider.cache) {
      const cachedAccountString = await currentProvider.cache.getValue(Session)
      if (cachedAccountString) cacheAccount = JSON.parse(cachedAccountString)
    }*/

    const userSession =
      await currentProvider.provider.handleAuthCheck(sessionTokenString);

    if (!userSession) return false;
    return await Auth.callbacks.handleAuthCheck(userSession);
  } catch (e) {
    console.log("Error while fetching session token", e);
    return false;
  }
}
