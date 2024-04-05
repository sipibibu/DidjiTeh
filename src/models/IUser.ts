export interface IUser{
    login: string,
    role: string
}

export interface IUserAuth extends IUser{
    password: string
}

