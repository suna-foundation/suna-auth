import {signIn, signOut} from "./client";
import {sessionsInternal} from "./functions/auth";
import {Config, Secret} from "./types";
import {ReactNode} from "react"
import {GET} from "./routes/route";
import {SignOutAndReloadResult} from "./client/callbacks/signout";
import {SignInConfig, SignInWithProviderResult} from "./client/callbacks/signin";

export class Auth {
  public static config: Config;
  public static secret: Secret;
  public static components: { signIn: (provider: keyof typeof Auth.config, config?: SignInConfig) => SignInWithProviderResult; signOut: () => SignOutAndReloadResult };
  public static routes: any;

  constructor(config: Config, secret: any) {
    Auth.config = config;
    Auth.secret = secret;
    Auth.components = {
      signIn,
      signOut
    };
    Auth.routes = {GET: GET };
  }
}

export const auth = sessionsInternal