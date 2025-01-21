<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getExams, getExamSchedules } from '@/api/api'
import type { ExamData, ExamScheduleData } from '@/types/types'
import { formatDate } from '@/utils/tools'

const examList = ref<ExamData[]>([])
const scheduleList = ref<ExamScheduleData[]>([])
const currentExam = ref<number>(0)

// 获取考试列表
const getExamList = async () => {
    const res = await getExams({ pageNum: 1, pageSize: 1000 })
    examList.value = res.data
    if (examList.value.length > 0) {
        currentExam.value = examList.value[0].id
        getScheduleList()
    }
}

// 获取考试安排列表
const getScheduleList = async () => {
    if (!currentExam.value) return
    const res = await getExamSchedules({ 
        pageNum: 1, 
        pageSize: 1000,
        exam_id: currentExam.value 
    })
    scheduleList.value = res.data
}

// 监听考试选择变化
const handleExamChange = () => {
    getScheduleList()
}

// 格式化考试时间
const formatExamTime = (time: string) => {
    return formatDate(time, 'YYYY年MM月DD日 HH:mm')
}

onMounted(() => {
    getExamList()
})
</script>

<template>
    <div class="exam-arrange">
        <!-- 考试选择 -->
        <div class="exam-select">
            <el-select 
                v-model="currentExam"
                placeholder="请选择考试"
                style="width: 300px"
                filterable
                @change="handleExamChange"
            >
                <el-option
                    v-for="exam in examList"
                    :key="exam.id"
                    :label="`${exam.course_name} (${formatExamTime(exam.exam_time)})`"
                    :value="exam.id"
                />
            </el-select>
        </div>

        <!-- 考试信息展示 -->
        <div v-if="currentExam" class="exam-info">
            <el-descriptions :column="3" border>
                <el-descriptions-item label="考试科目">
                    {{ examList.find(e => e.id === currentExam)?.course_name }}
                </el-descriptions-item>
                <el-descriptions-item label="考试时间">
                    {{ formatExamTime(examList.find(e => e.id === currentExam)?.exam_time || '') }}
                </el-descriptions-item>
                <el-descriptions-item label="考试时长">
                    {{ examList.find(e => e.id === currentExam)?.duration }} 分钟
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <!-- 考试安排列表 -->
        <div class="schedule-list">
            <el-table :data="scheduleList" border style="width: 100%">
                <el-table-column prop="class_id" label="班级" align="center">
                    <template #default="{ row }">
                        {{ row.class_code }}
                    </template>
                </el-table-column>
                <el-table-column prop="room_id" label="考场" align="center">
                    <template #default="{ row }">
                        {{ row.room_name }}
                    </template>
                </el-table-column>
                <el-table-column prop="seat_number" label="座位号" width="100" align="center" />
                <el-table-column label="学生信息" align="center">
                    <template #default="{ row }">
                        {{ row.student_name }} ({{ row.student_id }})
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style scoped>
.exam-arrange {
    padding: 20px;
}

.exam-select {
    margin-bottom: 20px;
}

.exam-info {
    margin-bottom: 20px;
}

.schedule-list {
    margin-top: 20px;
}

:deep(.el-descriptions) {
    margin-bottom: 20px;
}

:deep(.el-descriptions__cell) {
    text-align: center;
}
</style> 