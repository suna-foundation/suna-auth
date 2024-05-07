import { importPKCS8, jwtVerify, SignJWT, } from "jose";
import { nanoid } from "nanoid";
import { Buffer } from "buffer";
import { Auth } from "../index";
let privateKey;
export const getPrivateKey = async () => {
    return (privateKey =
        privateKey ||
            (await importPKCS8(Buffer.from(Auth.secret.secret, "base64").toString("utf-8"), Auth.secret.algorithm)));
};
export const createToken = async (data, expiration) => {
    const privateKey = await getPrivateKey();
    return await new SignJWT(Object.assign({}, data))
        .setProtectedHeader({ alg: Auth.secret.algorithm })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime(expiration)
        .sign(privateKey);
};
export const decodeToken = async (sessionTokenString) => {
    try {
        const privateKey = await getPrivateKey();
        return await jwtVerify(sessionTokenString, privateKey);
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
//# sourceMappingURL=jwt.js.map