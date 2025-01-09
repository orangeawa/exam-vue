import type { Classes } from "@/model/Class";
import req from "@/utils/request";

export function getClassList(): Promise<Classes[]> {
    return req.get("/classes");
}