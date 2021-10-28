export type AuthToken = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type SignIn = {
  userId: string;
  userPassword: string;
};

export type RefreshToken = {
  token: string;
};

export type Category = {
  id: number;
  name: string;
  type: string;
  depth: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiConfigProps = {
  options?: object;
  token?: string;
  categoryGroup?: string;
  page?: number;
  limit?: number;
  headers?: object;
  contentsType: string;
  bodyProps?: string | object;
};
