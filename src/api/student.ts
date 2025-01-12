import request from '@/utils/request'
import type { response } from '@/model/Res'
import type { Student } from '@/model/Student'

// 获取学生列表
export function getStudentList(): Promise<Student[]> {
    return request.get('/students').then(res => res.data)
}

// 添加学生
export function addStudent(data: any): Promise<response> {
    return request.post('/students', data)
}

// 删除学生
export function deleteStudent(id: number): Promise<response> {
    return request.delete(`/students/${id}`)
} 