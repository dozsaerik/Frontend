export interface LoginDTOInterface {
    email: string,
    password: string
}

export class LoginDTO {
    public readonly email: string;
    public readonly password: string;

    constructor(data: LoginDTOInterface) {
        this.email = data.email;
        this.password = data.password;
    }
}