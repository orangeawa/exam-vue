// 通用查询参数接口
export interface QueryParams {
    pageNum: number
    pageSize: number
    [key: string]: any
}

// 班级数据接口
export interface ClassData {
    id: number
    class_code: string
    total_students: number
}
