import type { EditableExam } from "@/model/Exam";
import type { response } from "@/model/Res";
import req from "@/utils/request";

// 考试管理页面api
export function getExamList() {
    return req.get("/exams");
}

// 添加考试
export function addExam(data: EditableExam): Promise<response> {
    return req.post("/exams", data);
}

// 删除考试
export function deleteExam(id: number): Promise<response> {
    return req.delete(`/exams/${id}`);
}