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

// 学生数据接口
export interface StudentData {
    id: number
    student_id: string
    student_name: string
    class_id: number
}

// 考试数据接口
export interface ExamData {
    id: number
    course_name: string
    exam_time: string
    duration: number
    description: string
}

