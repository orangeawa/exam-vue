import { get, post, put, del } from "@/utils/request"

export interface QueryParams {
    pageNum: number,
    pageSize: number,
    [key: string]: any
}

export interface ClassData {
  id: number;
  class_code: string;
  total_students: number;
  // ... 其他属性
}

// 班级接口
export const getClasses = (params: QueryParams) => {
    return get<ClassData[]>('/classes', params);
}

export const postClass = (data: Partial<ClassData>) => {
    return post('/classes', data);
}

export const deleteClass = (id: number) => {
    return del(`/classes/${id}`)
}

export const updateClass = (id: number, data: any) => {
    return put(`/classes/${id}`, data)
}

export const updateClassTotalStudents = (id: number) => {
    return get(`/classes/update_student_count/${id}`,{})
}
