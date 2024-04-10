export interface RegisterDTOInterface {
    email: string,
    password: string,
    repassword: string
}

export class RegisterDTO {
    public readonly email: string;
    public readonly password: string;
    public readonly repassword: string;

    constructor(data: RegisterDTOInterface) {
        this.email = data.email;
        this.password = data.password;
        this.repassword = data.repassword;
    }
}