<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { 
    getExamSchedules, 
    postExamSchedule, 
    updateExamSchedule, 
    deleteExamSchedule,
    getExams,
    getClasses,
    getExamRooms,
    getStudents
} from '@/api/api'
import type { QueryParams, ExamScheduleData, ExamData, ClassData, ExamRoomData, StudentData } from '@/types/types'
import { formatDate } from '@/utils/tools'

const scheduleList = ref<ExamScheduleData[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const examList = ref<ExamData[]>([])
const classList = ref<ClassData[]>([])
const roomList = ref<ExamRoomData[]>([])
const studentList = ref<StudentData[]>([])

const form = ref({
    id: 0,
    exam_id: 0,
    class_id: 0,
    room_id: 0,
    seat_number: 1,
    student_id: 0
})

const queryParams = ref<QueryParams>({
    pageNum: 1,
    pageSize: 10
})

// 获取所有下拉选项数据
const getOptions = async () => {
    const [exams, classes, rooms, students] = await Promise.all([
        getExams({ pageNum: 1, pageSize: 1000 }),
        getClasses({ pageNum: 1, pageSize: 1000 }),
        getExamRooms({ pageNum: 1, pageSize: 1000 }),
        // TODO 需要优化，获取学生数据时，需要根据班级id进行筛选
        getStudents({ pageNum: 1, pageSize: 2000 })
    ])
    examList.value = exams.data
    classList.value = classes.data
    roomList.value = rooms.data
    studentList.value = students.data

    // 设置默认值为第一项
    if (examList.value.length > 0) {
        form.value.exam_id = examList.value[0].id
    }
    if (classList.value.length > 0) {
        form.value.class_id = classList.value[0].id
    }
    if (roomList.value.length > 0) {
        form.value.room_id = roomList.value[0].id
    }
    // 学生会通过 watch 和 computed 自动设置
}

const getList = () => {
    getExamSchedules(queryParams.value).then(res => {
        scheduleList.value = res.data
        total.value = res.total || 0
    })
}

// 新增考试安排
const handleAdd = () => {
    postExamSchedule(form.value).then(res => {
        getList()
    })
}

// 编辑考试安排
const handleEdit = (row: ExamScheduleData) => {
    dialogVisible.value = true
    form.value = { ...row }
}

// 编辑考试安排请求操作
const handleUpdate = () => {
    updateExamSchedule(form.value.id, form.value).then(res => {
        dialogVisible.value = false
        getList()
    })
}

// 删除考试安排
const handleDelete = (row: ExamScheduleData) => {
    deleteExamSchedule(row.id).then(res => {
        getList()
    })
}

const handleSizeChange = (val: number) => {
    queryParams.value.pageSize = val
    getList()
}

const handleCurrentChange = (val: number) => {
    queryParams.value.pageNum = val
    getList()
}

// 获取关联数据的显示名称
const getExamName = (examId: number) => {
    const exam = examList.value.find(e => e.id === examId)
    return exam ? exam.course_name : '未知考试'
}

const getClassName = (classId: number) => {
    const cls = classList.value.find(c => c.id === classId)
    return cls ? cls.class_code : '未知班级'
}

const getRoomName = (roomId: number) => {
    const room = roomList.value.find(r => r.id === roomId)
    return room ? room.room_name : '未知考场'
}

const getStudentName = (studentId: number) => {
    const student = studentList.value.find(s => s.id === studentId)
    return student ? `${student.student_name}(${student.student_id})` : '未知学生'
}

// 添加计算属性来过滤学生列表
const filteredStudentList = computed(() => {
    if (!form.value.class_id) return []
    return studentList.value.filter(student => student.class_id === form.value.class_id)
})

// 修改监听班级选择变化的逻辑
watch(() => form.value.class_id, (newClassId) => {
    // 当班级变化时，设置为过滤后学生列表的第一个学生
    const filteredStudents = studentList.value.filter(student => student.class_id === newClassId)
    form.value.student_id = filteredStudents.length > 0 ? filteredStudents[0].id : 0
}, { immediate: true })

onMounted(() => {
    getOptions()
    getList()
})
</script>

<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <!-- 新增考试安排功能 -->
            <el-card shadow="hover">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="考试">
                        <el-select 
                            v-model="form.exam_id" 
                            placeholder="请选择考试" 
                            style="width: 100%"
                            filterable
                        >
                            <el-option
                                v-for="item in examList"
                                :key="item.id"
                                :label="item.course_name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select 
                            v-model="form.class_id" 
                            placeholder="请选择班级" 
                            style="width: 100%"
                            filterable
                        >
                            <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.class_code"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考场">
                        <el-select 
                            v-model="form.room_id" 
                            placeholder="请选择考场" 
                            style="width: 100%"
                            filterable
                        >
                            <el-option
                                v-for="item in roomList"
                                :key="item.id"
                                :label="item.room_name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="座位号">
                        <el-input-number 
                            v-model="form.seat_number" 
                            :min="1" 
                            :max="200"
                            style="width: 100%"
                        />
                    </el-form-item>
                    <el-form-item label="学生">
                        <el-select 
                            v-model="form.student_id" 
                            placeholder="请选择学生" 
                            style="width: 100%"
                            :disabled="!form.class_id"
                            filterable
                        >
                            <el-option
                                v-for="item in filteredStudentList"
                                :key="item.id"
                                :label="`${item.student_name}(${item.student_id})`"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-table :data="scheduleList" style="width: 100%; margin-bottom: 20px">
                <el-table-column label="考试">
                    <template #default="{ row }">
                        {{ getExamName(row.exam_id) }}
                    </template>
                </el-table-column>
                <el-table-column label="班级">
                    <template #default="{ row }">
                        {{ getClassName(row.class_id) }}
                    </template>
                </el-table-column>
                <el-table-column label="考场">
                    <template #default="{ row }">
                        {{ getRoomName(row.room_id) }}
                    </template>
                </el-table-column>
                <el-table-column prop="seat_number" label="座位号" width="100" />
                <el-table-column label="学生">
                    <template #default="{ row }">
                        {{ getStudentName(row.student_id) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="display: flex; justify-content: flex-end;">
                <el-pagination 
                    hide-on-single-page
                    v-model:current-page="queryParams.pageNum" 
                    v-model:page-size="queryParams.pageSize" 
                    :total="total" 
                    :page-sizes="[10, 20, 30, 40]" 
                    layout="total, sizes, prev, pager, next" 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    background
                />
            </div>
        </el-col>
    </el-row>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑考试安排" width="30%">
        <el-form :model="form" label-width="80px" label-position="top">
            <el-form-item label="考试">
                <el-select 
                    v-model="form.exam_id" 
                    placeholder="请选择考试" 
                    style="width: 100%"
                    filterable
                >
                    <el-option
                        v-for="item in examList"
                        :key="item.id"
                        :label="item.course_name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="班级">
                <el-select 
                    v-model="form.class_id" 
                    placeholder="请选择班级" 
                    style="width: 100%"
                    filterable
                >
                    <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.class_code"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="考场">
                <el-select 
                    v-model="form.room_id" 
                    placeholder="请选择考场" 
                    style="width: 100%"
                    filterable
                >
                    <el-option
                        v-for="item in roomList"
                        :key="item.id"
                        :label="item.room_name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="座位号">
                <el-input-number 
                    v-model="form.seat_number" 
                    :min="1" 
                    :max="200"
                    style="width: 100%"
                />
            </el-form-item>
            <el-form-item label="学生">
                <el-select 
                    v-model="form.student_id" 
                    placeholder="请选择学生" 
                    style="width: 100%"
                    :disabled="!form.class_id"
                    filterable
                >
                    <el-option
                        v-for="item in filteredStudentList"
                        :key="item.id"
                        :label="`${item.student_name}(${item.student_id})`"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleUpdate">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.el-pagination {
    margin-top: 20px;
}
</style> 