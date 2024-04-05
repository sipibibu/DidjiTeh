export interface AuthResponse {
  data: AuthResponseData;
  status: number;
}

export interface AuthResponseData {
  email: string;
  role: string;
  access_jwt_token: string;
}
