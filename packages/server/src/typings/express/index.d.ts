declare namespace Express {
    export interface Request {
        file: any;
        files: any[];
    }
    export interface Response {
        jsongo: (body: any) => any;
    }
}
