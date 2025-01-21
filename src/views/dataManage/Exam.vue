<script setup lang="ts">
import { ref } from 'vue'
import { getExams, postExam, updateExam, deleteExam } from '@/api/api'
import type { QueryParams, ExamData } from '@/types/types'
import { formatDate, formatTime } from '@/utils/tools'

const examList = ref<ExamData[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const form = ref({
    id: 0,
    course_name: '',
    exam_time: '',
    duration: 0,
    description: ''
})

const queryParams = ref<QueryParams>({
    pageNum: 1,
    pageSize: 10,
    course_name: '',
    exam_time: ''
})

const getList = () => {
    getExams(queryParams.value).then(res => {
        examList.value = res.data
        total.value = res.total || 0
    })
}

// 新增考试
const handleAdd = () => {
    postExam(form.value).then(res => {
        getList()
        form.value = {
            id: 0,
            course_name: '',
            exam_time: '',
            duration: 0,
            description: ''
        }
    })
}

// 编辑考试
const handleEdit = (row: ExamData) => {
    dialogVisible.value = true
    form.value = { ...row }
}

// 编辑考试请求操作
const handleUpdate = () => {
    updateExam(form.value.id, form.value).then(res => {
        dialogVisible.value = false
        getList()
    })
}

// 删除考试
const handleDelete = (row: ExamData) => {
    deleteExam(row.id).then(res => {
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

// 格式化考试时间显示
const formatExamTime = (row: ExamData) => {
    return formatTime(row.exam_time, row.duration)
}

// 格式化日期显示
const formatExamDate = (row: ExamData) => {
    return formatDate(row.exam_time, 'YYYY-MM-DD HH:mm')
}

getList()
</script>

<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card shadow="hover">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="课程名称">
                        <el-input v-model="form.course_name" placeholder="请输入课程名称" />
                    </el-form-item>
                    <el-form-item label="考试时间">
                        <el-date-picker
                            v-model="form.exam_time"
                            type="datetime"
                            placeholder="选择考试时间"
                            style="width: 100%"
                            value-format="YYYY-MM-DD HH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="考试时长">
                        <el-input-number 
                            v-model="form.duration" 
                            :min="0" 
                            :max="360"
                            placeholder="请输入考试时长(分钟)"
                            style="width: 100%"
                        />
                    </el-form-item>
                    <el-form-item label="考试说明">
                        <el-input
                            v-model="form.description"
                            type="textarea"
                            placeholder="请输入考试说明"
                            :rows="3"
                        />
                    </el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-table :data="examList" style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="id" label="唯一id" />
                <el-table-column prop="course_name" label="课程名称" />
                <el-table-column label="开始时间">
                    <template #default="{ row }">
                        {{ formatExamDate(row) }}
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="考试时长">
                    <template #default="{ row }">
                        {{ row.duration }} 分钟
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="考试说明" show-overflow-tooltip />
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

    <el-dialog v-model="dialogVisible" title="编辑考试信息" width="30%">
        <el-form :model="form" label-width="80px" label-position="top">
            <el-form-item label="课程名称">
                <el-input v-model="form.course_name" placeholder="请输入课程名称" />
            </el-form-item>
            <el-form-item label="考试时间">
                <el-date-picker
                    v-model="form.exam_time"
                    type="datetime"
                    placeholder="选择考试时间"
                    style="width: 100%"
                    value-format="YYYY-MM-DD HH:mm:ss"
                />
            </el-form-item>
            <el-form-item label="考试时长">
                <el-input-number 
                    v-model="form.duration" 
                    :min="0" 
                    :max="360"
                    placeholder="请输入考试时长(分钟)"
                    style="width: 100%"
                />
            </el-form-item>
            <el-form-item label="考试说明">
                <el-input
                    v-model="form.description"
                    type="textarea"
                    placeholder="请输入考试说明"
                    :rows="3"
                />
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