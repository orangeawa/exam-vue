import { get, post, put, del } from "@/utils/request"
import type { QueryParams, ClassData, StudentData, ExamData, ExamRoomData, ExamScheduleData } from "@/types/types"

// *班级接口*
// url: /api.classes
export const getClasses = (params: QueryParams) => {
    return get<ClassData[]>('/classes', params)
}

export const postClass = (data: Partial<ClassData>) => {
    return post('/classes', data)
}

export const deleteClass = (id: number) => {
    return del(`/classes/${id}`)
}

export const updateClass = (id: number, data: Partial<ClassData>) => {
    return put(`/classes/${id}`, data)
}

export const updateClassTotalStudents = (id: number) => {
    return get(`/classes/update_student_count/${id}`, {})
}

export const postClassBatch = (data: string[]) => {
    return post('/classes/batch_add', data)
}

// *学生接口*
export const getStudents = (params: QueryParams) => {
    return get<StudentData[]>('/students', params)
}

export const postStudent = (data: Partial<StudentData>) => {
    return post('/students', data)
}

export const updateStudent = (id: number, data: Partial<StudentData>) => {
    return put(`/students/${id}`, data)
}

export const deleteStudent = (id: number) => {
    return del(`/students/${id}`)
}

export const postStudentBatch = (data: Omit<StudentData,'id'>[]) => {
    return post('/students/batch_add', data)
}

// *考试接口*
export const getExams = (params: QueryParams) => {
    return get<ExamData[]>('/exams', params)
}

export const postExam = (data: Partial<ExamData>) => {
    return post('/exams', data)
}

export const updateExam = (id: number, data: Partial<ExamData>) => {
    return put(`/exams/${id}`, data)
}

export const deleteExam = (id: number) => {
    return del(`/exams/${id}`)
}

// *考场接口*
export const postExamRoom = (data: Partial<ExamRoomData>) => {
    return post('/exam_rooms', data)
}

export const getExamRooms = (params: QueryParams) => {
    return get<ExamRoomData[]>('/exam_rooms', params)
}

export const updateExamRoom = (id: number, data: Partial<ExamRoomData>) => {
    return put(`/exam_rooms/${id}`, data)
}

export const deleteExamRoom = (id: number) => {
    return del(`/exam_rooms/${id}`)
}

// *考试安排接口*
export const getExamSchedules = (params: QueryParams) => {
    return get<ExamScheduleData[]>('/exam_schedules', params)
}

export const postExamSchedule = (data: Partial<ExamScheduleData>) => {
    return post('/exam_schedules', data)
}

export const updateExamSchedule = (id: number, data: Partial<ExamScheduleData>) => {
    return put(`/exam_schedules/${id}`, data)
}

export const deleteExamSchedule = (id: number) => {
    return del(`/exam_schedules/${id}`)
}

// 批量创建考试安排
export interface BatchScheduleParams {
    exam_id: number
    class_ids: number[]
    room_ids: number[]
}

export const batchCreateSchedules = (data: BatchScheduleParams) => {
    return post('/exam_schedules/batch', data)
}

