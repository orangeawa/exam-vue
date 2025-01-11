export interface Exam{
    /**
     * 考试id
     */
    id: number
    /**
     * 考试名称
     */
    name: string
    /**
     * 考试时间
     */
    time: string
    /**
     * 考试时长
     */
    duration: number
}

export type EditableExam = Omit<Exam, 'id'> & {id: null}