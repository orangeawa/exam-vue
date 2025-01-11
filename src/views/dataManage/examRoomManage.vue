<script setup lang="ts">
import { ref } from 'vue'
import type { ExamRoom, EditableExamRoom } from "@/model/ExamRoom";
import { getExamRoomList,createExamRoom,deleteExamRoom } from '@/api/examRoom'
import { ElMessage } from 'element-plus'

const tableList = ref<ExamRoom[]>([])
const form = ref<EditableExamRoom>({
    id: null,
    name: '',
    capacity: 0
})

function getList(): void {
    getExamRoomList().then(res => {
        tableList.value = res
    })
}
function submitForm(): void {
    createExamRoom(form.value).then(res => {
        ElMessage.success(res.msg)
        getList()
    })
}
function handleDelete(id: number): void {
    deleteExamRoom(id).then(res => {
        ElMessage.success(res.msg)
        getList()
    })
}

getList()
</script>

<template>
    <el-row :gutter="20" style="width: 85%;margin: 0 auto;">
        <el-col :span="8">
            <!-- 添加班级 -->
            <el-card>
                <el-form>
                    <el-form-item label="考场名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="容纳人数">
                        <el-input v-model="form.capacity"></el-input>
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
                    <el-table-column prop="name" label="考场名称"  align="center"/>
                    <el-table-column prop="capacity" label="容纳人数"  align="center"/>
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
