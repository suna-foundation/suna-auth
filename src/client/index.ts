"use client";

import {signInWithProvider} from "./callbacks/signin";
import {signOutAndReload} from "./callbacks/signout";

export const signIn = signInWithProvider
export const signOut = signOutAndReload