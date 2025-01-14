// {"id":3,"exam_room_id":1,"seat_number":1,"student_id":"20218553","exam_id":1}
export interface ExamRoomSeat {
    /**
     * 主键
     */
    id: number;
    /**
     * 考场id
     */
    exam_room_id: number;
    /**
     * 座位号
     */
    seat_number: number;
    /**
     * 学生id
     */
    student_id: string;
    /**
     * 考试id
     */
    exam_id: number;
}

