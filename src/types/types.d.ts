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

// 考场数据接口
export interface ExamRoomData {
    id: number
    room_name: string
    capacity: number
}

// 考试安排数据接口
export interface ExamScheduleData {
    id: number
    exam_id: number
    class_id: number
    room_id: number
    seat_number: number
    student_id: number
    // 关联数据（用于显示）
    exam?: ExamData
    class?: ClassData
    room?: ExamRoomData
    student?: StudentData
}

