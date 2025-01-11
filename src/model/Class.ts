// 班级
export interface Classes {
    /**
     * 班级id
     */
    id: number
    /**
     * 班级名称
     */
    name: string
    /**
     * 班级人数
     */
    number: number
}
export type EditableClasses = Omit<Classes, 'id'> & {id: null}