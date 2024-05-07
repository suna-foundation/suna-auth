"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = exports.getPrivateKey = void 0;
const jose_1 = require("jose");
const nanoid_1 = require("nanoid");
const buffer_1 = require("buffer");
const index_1 = require("../index");
let privateKey;
const getPrivateKey = async () => {
    return (privateKey =
        privateKey ||
            (await (0, jose_1.importPKCS8)(buffer_1.Buffer.from(index_1.Auth.secret.secret, "base64").toString("utf-8"), index_1.Auth.secret.algorithm)));
};
exports.getPrivateKey = getPrivateKey;
const createToken = async (data, expiration) => {
    const privateKey = await (0, exports.getPrivateKey)();
    return await new jose_1.SignJWT(Object.assign({}, data))
        .setProtectedHeader({ alg: index_1.Auth.secret.algorithm })
        .setJti((0, nanoid_1.nanoid)())
        .setIssuedAt()
        .setExpirationTime(expiration)
        .sign(privateKey);
};
exports.createToken = createToken;
const decodeToken = async (sessionTokenString) => {
    try {
        const privateKey = await (0, exports.getPrivateKey)();
        return await (0, jose_1.jwtVerify)(sessionTokenString, privateKey);
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map