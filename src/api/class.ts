import type { Classes, EditableClasses } from "@/model/Class";
import type { response } from "@/model/Res";
import req from "@/utils/request";

// 获取班级列表
export function getClassList(): Promise<response> {
    return req.get("/classes");
}

// 添加班级
export function addClassList(data: EditableClasses): Promise<response> {
    return req.post("/classes", data);
}

// 删除班级
export function deleteClass(id: number): Promise<response> {
    return req.delete(`/classes/${id}`);
}