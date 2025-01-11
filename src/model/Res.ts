// Objective: Define the response object for the API request.
export interface response<T = any> {
    /**
     * 状态码
     */
    code: number;
    /**
     * 消息
     */
    msg: string;
    /**
     * 数据
     */
    data?: T;
    // [key: string]: any;
}