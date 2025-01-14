import type { EditableExam } from "@/model/Exam";
import type { response } from "@/model/Res";
import req from "@/utils/request";
import type { Exam } from "@/model/Exam";

/**
 * 获取考试列表
 * @returns 
 */
export function getExamList(): Promise<Exam[]> {
    return req.get("/exams").then(res => res.data);
}

// 添加考试
export function addExam(data: EditableExam): Promise<response> {
    return req.post("/exams", data);
}

// 删除考试
export function deleteExam(id: number): Promise<response> {
    return req.delete(`/exams/${id}`);
}