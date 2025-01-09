// Objective: Define the response object for the API request.
export interface response<T = any> {
    code: number;
    msg: string;
    data?: T;
    // [key: string]: any;
}