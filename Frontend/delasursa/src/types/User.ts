export interface User {
    id: number;
    email:string;
    roles: string[];
    avatar: string | null;
    status: boolean;
    registrationDate: string;
    userDetails: {
        nume: string,
        prenume: string
    }
}