import { axiosInstance } from "../axios";
import { AuthResponseData } from "../models/responce/AuthResponse.ts";
import { IUserAuth } from "../models/IUser.ts";

export default class AuthService {
  static async login(login: string, password: string) {
    return axiosInstance.post<AuthResponseData>("/auth/login", {
      email: login,
      password: password,
    });
  }

  static async registration(userAuth: IUserAuth) {
    return axiosInstance.post<AuthResponseData>(
      "/auth/register",
      {
        email: userAuth.login,
        password: userAuth.password,
      },
    );
  }

  static async logout() {
    return await axiosInstance.post("/auth/logout");
  }
}
