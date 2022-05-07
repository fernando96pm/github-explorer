// Clase que representa los datos de un usuario de GitHub.
export class GitUser {
    id: number;
    login: string;
    avatar_url: string;
    followers: number;
    following: number;
    email: string | null;
    name: string | null;
    public_repos: number;

    constructor(id: number, login: string, avatar_url: string, followers: number, following: number, email:string | null, name: string | null, public_repos: number){
        this.id= id;
        this.login = login;
        this.avatar_url = avatar_url;
        this.followers = followers;
        this.following = following;
        this.email = email;
        this.name = name;
        this.public_repos = public_repos;
    }
}