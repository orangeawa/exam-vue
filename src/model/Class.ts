// 班级
export interface Classes {
    id: number
    name: string
    number: number
}
export type EditableClasses = Omit<Classes, 'id'> & {id: null}