export interface Student {
    id: number
    sid: string
    name: string
    class_name: string
}

export type EditableStudent = Omit<Student, 'id'>