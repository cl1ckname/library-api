export interface ConfigInterface {
    host: string,
    port: string,
    username: string,
    password: string,
    database: string,
    [name: string]: string 
}
