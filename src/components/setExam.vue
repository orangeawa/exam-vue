<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getExams, getClasses, batchCreateSchedules, getSeats, getExamScheduleById } from '@/api/api'
import type { ExamData, ClassData } from '@/types/types'

const form = ref<{
    exam_id: number,
    class_ids: number[],
}>({
    exam_id: 0,
    class_ids: [],
})


// 考试列表
const examList = ref<ExamData[]>([])
// 班级列表
const classList = ref<ClassData[]>([])
// 当前考试时间段总共有多少个座位
const totalSeats = ref(0)
// 当前考试时间段还剩多少个座位
const remainingSeats = ref(0)



// 获取座位信息
const getSeatsInfo = async (examId: number) => {
    if (!examId) return
    try {
        const { data } = await getSeats(examId)
        if (data) {
            totalSeats.value = data.total_seats
            remainingSeats.value = data.remaining_seats
        }
    } catch (error) {
        console.error('获取座位信息失败:', error)
        totalSeats.value = 0
        remainingSeats.value = 0
    }
}

// 监听考试选择变化
watch(() => form.value.exam_id, (newExamId) => {
    if (newExamId) {
        getSeatsInfo(newExamId)
        getExamInfo()
    }
})

// 获取考试列表
const getExamList = async () => {
    const res = await getExams({ pageNum: 1, pageSize: 1000 })
    examList.value = res.data
    if (examList.value.length > 0) {
        form.value.exam_id = examList.value[0].id
        // 初始获取座位信息
        await getSeatsInfo(form.value.exam_id)
    }
}

// 获取班级列表
const getClassList = async () => {
    const res = await getClasses({ pageNum: 1, pageSize: 1000 })
    classList.value = res.data
}

// 批量添加考试安排
const handleBatchAdd = async () => {
    const res = await batchCreateSchedules({
        exam_id: form.value.exam_id,
        class_ids: form.value.class_ids,
    })
    getSeatsInfo(form.value.exam_id)

}


// ========= 排考信息显示 =========
const infoData = ref<{ classes: string, examinees: number, examroom: string, course: string }[]>([])

const getExamInfo = async () => {
    const res = await getExamScheduleById(form.value.exam_id)
    infoData.value = res.data
}


onMounted(() => {
    getExamList()
    getClassList()
})

</script>

<template>
    <div style="display: flex;gap: 40px;">
        <el-form :model="form" label-position="top" style="flex: 2;">
            <el-form-item label="考试名称">
                <el-select v-model="form.exam_id" placeholder="请选择考试" style="width: 100%" filterable>
                    <el-option v-for="exam in examList" :key="exam.id" :label="exam.course_name" :value="exam.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="选择待考班级">
                <el-select multiple filterable v-model="form.class_ids" placeholder="请选择班级" style="width: 100%">
                    <el-option v-for="item in classList" :key="item.id" :label="item.class_code" :value="item.id" />
                </el-select>

            </el-form-item>

            <div class="seats-info">
                当前考试时间段总共有 <span class="seat-number">{{ totalSeats }}</span> 个座位，
                还剩 <span class="seat-number">{{ remainingSeats }}</span> 个座位
            </div>

            <!-- 点击批量添加考试安排 -->
            <el-button type="primary" @click="handleBatchAdd">批量添加考试安排</el-button>

        </el-form>

        <div style="flex: 3;">
            <h3 style="text-align: center;">考试名称：{{ examList.find(exam => exam.id === form.exam_id)?.course_name ||
            '未选择' }}</h3>
            <el-table :data="infoData">
                <el-table-column prop="classes" label="班级"></el-table-column>
                <el-table-column prop="examinees" label="考场人数"></el-table-column>
                <el-table-column prop="examroom" label="考试地点"></el-table-column>
                <el-table-column prop="course" label="考试科目"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style scoped>
.seats-info {
    margin: 20px 0;
    color: #606266;
}

.seat-number {
    color: #409EFF;
    font-weight: bold;
    margin: 0 5px;
}
</style>
