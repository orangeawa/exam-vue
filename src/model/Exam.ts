export interface Exam{
    id: number
    name: string
    time: string
    duration: number
}

export type EditableExam = Omit<Exam, 'id'> & {id: null}