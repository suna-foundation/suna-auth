export interface IWebRequest {
  headers: IHeaderAdapter;
  cookies: ICookieAdapter;
  query: IQueryAdapter;
  params: IParamsAdapter;
}

export interface IHeaderAdapter {
  get(name: string): string | undefined;
  getAll(): Record<string, string>;
  has(name: string): boolean;
}

export interface ICookieAdapter {
  get(name: string): { value: string } | undefined;
  set(name: string, value: string, options?: CookieOptions): void;
  delete(name: string): void;
  getAll(): Record<string, string>;
}

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export interface IQueryAdapter {
  get(name: string): string | undefined;
  getAll(): Record<string, string>;
}

export interface IParamsAdapter {
  get(name: string): string | undefined;
  getAll(): Record<string, string>;
}
