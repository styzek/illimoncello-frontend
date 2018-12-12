export class Usersignup {

    constructor(public username = '',
    public password = '',
    public email = '',
    public name = '',
    public street = '',
    public city = '',
    public birthdate?:Date,
    public zip?: Number) {}
}
