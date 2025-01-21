import { get, post, put, del } from "@/utils/request"
import type { QueryParams, ClassData, StudentData } from "@/types/types"

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


