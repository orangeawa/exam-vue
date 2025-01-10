export interface ExamRoom{
    /**
     * 考场id
     */
    id: number
    /**
     * 考场名称
     */
    name: string
    /**
     * 考场容量
     */
    capacity: number
}
export type EditableExamRoom = Omit<ExamRoom, 'id'> & {id: null}