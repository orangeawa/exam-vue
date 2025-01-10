import type { EditableExamRoom, ExamRoom } from "@/model/ExamRoom";
import type { response } from "@/model/Res";
import req from "@/utils/request";

/**
 * 获取考场列表
 * @returns response
 */
export function getExamRoomList():Promise<ExamRoom[]> {
    return req.get('/rooms').then(res => res.data)
}

/**
 * 创建考场
 * @param data 
 * @returns 
 */
export function createExamRoom(data: EditableExamRoom): Promise<response>{
    return req.post('/rooms', data)
}

// export function updateExamRoom(data: ExamRoom){
//     return request.put<ExamRoom>('/rooms', data)
// }

export function deleteExamRoom(id: number): Promise<response>{
    return req.delete(`/rooms/${id}`)
}