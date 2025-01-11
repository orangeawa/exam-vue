import type { ExamArrange } from "@/model/ExamArrange";
import req from "@/utils/request";

export function getExamArrange(): Promise<ExamArrange[]> {
    return req.get("/examArrange").then((res) => res.data);
}

