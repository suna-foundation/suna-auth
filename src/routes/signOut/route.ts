import { cookies } from "next/headers";

export async function GET() {
  const cookieHandler = cookies();
  cookieHandler.delete("SessionToken");

  return new Response();
}
