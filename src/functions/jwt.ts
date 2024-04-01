import {
  importPKCS8,
  jwtVerify,
  type JWTVerifyResult,
  KeyLike,
  SignJWT,
} from "npm:jose";
import { nanoid } from "@jlarky/nanoid";
import { Buffer } from "buffer";
import { Auth } from "../index";

export interface CreatTokenPayload {
  provider: string;
  email: string;
  sub: string;

  [key: string]: string;
}

let privateKey: KeyLike | Uint8Array;
export const getPrivateKey = async (): Promise<KeyLike | Uint8Array> => {
  return (privateKey =
    privateKey ||
    (await importPKCS8(
      Buffer.from(Auth.secret.secret, "base64").toString("utf-8"),
      Auth.secret.algorithm,
    )));
};

export const createToken = async (
  data: CreatTokenPayload,
  expiration: Date,
): Promise<string> => {
  const privateKey = await getPrivateKey();
  return await new SignJWT({
    ...data,
  })
    .setProtectedHeader({ alg: Auth.secret.algorithm })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(privateKey);
};

export const decodeToken = async <T = CreatTokenPayload>(
  sessionTokenString: string,
): Promise<JWTVerifyResult<T> | false> => {
  try {
    const privateKey = await getPrivateKey();
    return await jwtVerify<T>(sessionTokenString, privateKey);
  } catch (e) {
    console.log(e);
    return false;
  }
};
