"use client";


export type SignOutAndReloadResult = Promise<void>

export async function signOutAndReload() {
  await fetch(`/api/auth/signOut`);

  if (typeof window !== "undefined") {
    window.location.reload();
  } else {
    throw new Error("This function can only be used on the client-side.");
  }
}
