import request from '@/utils/request'
import type { response } from '@/model/Res'
import type { ExamRoomSeat } from '@/model/ExamRoomSeat';

// 获取考场座位列表
export function getExamRoomSeatList(): Promise<ExamRoomSeat[]> {
    return request.get('/examRoomSeat').then(res => res.data)
}

// 添加考场座位
export function addExamRoomSeat(data: any): Promise<response> {
    return request.post('/examRoomSeat', data)
}