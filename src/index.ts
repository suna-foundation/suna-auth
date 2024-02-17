import {sessionsInternal} from "./functions/auth";
import {Config, Secret} from "./types";
import {GET} from "./routes/route";
import {sendError, sendErrorRedirect, sendJson} from "./functions/responces";
import {createToken, decodeToken} from "./functions/jwt";

export class Auth {
  public static config: Config;
  public static secret: Secret;
  public auth
  public routes

  constructor(config: Config, secret: any) {
    Auth.config = config;
    Auth.secret = secret;

    this.routes = {GET: GET};
    this.auth = sessionsInternal
  }
}

export {
  sendError,
  sendJson,
  sendErrorRedirect,
  decodeToken,
  createToken
}
