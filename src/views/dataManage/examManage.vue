<script setup lang="ts">
import { ref } from 'vue'
import type { Exam, EditableExam } from "@/model/Exam";
import { getExamList,addExam,deleteExam } from '@/api/exam'
import { formatDate } from '@/utils/tools'
import { ElMessage } from 'element-plus'

const tableList = ref<Exam[]>([])
const form = ref<EditableExam>({
    id: null,
    name: '',
    time: '',
    duration: 0
})

function getList(): void {
    getExamList().then(res => {
        tableList.value = res.data
    })
}
function submitForm(): void {
    addExam(form.value).then(res => {
        ElMessage.success(res.msg)
        getList()
    })
}
function handleDelete(id: number): void {
    deleteExam(id).then(res => {
        ElMessage.success(res.msg)
        getList()
    })
}

getList()
</script>

<template>
    <el-row :gutter="20" style="width: 85%;margin: 0 auto;">
        <el-col :span="8">
            <!-- 添加考试 -->
            <el-card>
                <el-form>
                    <el-form-item label="考试名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <!-- <el-input v-model="form.time"></el-input> -->
                        <el-date-picker
                            v-model="form.time"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <!-- 考试时长 -->
                    <el-form-item label="考试时长">
                        <el-input v-model="form.duration"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="Plus" @click="submitForm">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card>
                <el-table :data="tableList" :border="true">
                    <el-table-column prop="name" label="考试名称"  align="center"/>
                    <el-table-column prop="time" label="考试时间"  align="center">
                        <template #default="{ row }">
                            <span>{{ formatDate(row.time,'YYYY-MM-DD HH:mm:ss') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default="{ row }">
                            <el-button link type="danger" icon="Delete" circle @click="handleDelete(row.id)" />
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped></style>
