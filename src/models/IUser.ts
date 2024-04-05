export interface IUser{
    email: string,
    role: string
}

export interface IUserAuth extends IUser{
    password: string
}

