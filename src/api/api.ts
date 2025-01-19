import { get, post, put, del } from "@/utils/request"
import type { QueryParams, ClassData } from "@/types/types"

// 班级接口
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
