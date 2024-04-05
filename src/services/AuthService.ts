import { axiosInstance } from "../axios";
import { AuthResponseData } from "../models/responce/AuthResponse.ts";
import { IUserAuth } from "../models/IUser.ts";

export default class AuthService {
  static async login(email: string, password: string) {
    return axiosInstance.post<AuthResponseData>("/auth/login", {
      email: email,
      password: password,
    });
  }

  static async registration(userAuth: IUserAuth) {
    return axiosInstance.post<AuthResponseData>(
        `/auth/register_${userAuth.role.toLowerCase()}`,
      {
        email: userAuth.email,
        password: userAuth.password,
      },
    );
  }
}
