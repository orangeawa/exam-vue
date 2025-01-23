<script setup lang="ts">
import { ref } from 'vue'
import { getExamRooms, postExamRoom, updateExamRoom, deleteExamRoom } from '@/api/api'
import type { QueryParams, ExamRoomData } from '@/types/types'

const examRoomList = ref<ExamRoomData[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const form = ref({
    id: 0,
    room_name: '',
    capacity: 30
})

const queryParams = ref<QueryParams>({
    pageNum: 1,
    pageSize: 10,
    room_name: ''
})

const getList = () => {
    getExamRooms(queryParams.value).then(res => {
        examRoomList.value = res.data
        total.value = res.total || 0
    })
}

// 新增考场
const handleAdd = () => {
    postExamRoom(form.value).then(res => {
        getList()
    })
}

// 编辑考场
const handleEdit = (row: ExamRoomData) => {
    dialogVisible.value = true
    form.value = { ...row }
}

// 编辑考场请求操作
const handleUpdate = () => {
    updateExamRoom(form.value.id, form.value).then(res => {
        dialogVisible.value = false
        getList()
    })
}

// 删除考场
const handleDelete = (row: ExamRoomData) => {
    deleteExamRoom(row.id).then(res => {
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

getList()
</script>

<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card shadow="hover">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="考场名称">
                        <el-input v-model="form.room_name" placeholder="请输入考场名称" />
                    </el-form-item>
                    <el-form-item label="考场容量">
                        <el-input-number 
                            v-model="form.capacity" 
                            :min="1" 
                            :max="200"
                            placeholder="请输入考场容量"
                            style="width: 100%"
                        />
                    </el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-table :data="examRoomList" style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="id" label="唯一id" />
                <el-table-column prop="room_name" label="考场名称" />
                <el-table-column prop="capacity" label="考场容量">
                    <template #default="{ row }">
                        {{ row.capacity }} 人
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

    <el-dialog v-model="dialogVisible" title="编辑考场信息" width="30%">
        <el-form :model="form" label-width="80px" label-position="top">
            <el-form-item label="考场名称">
                <el-input v-model="form.room_name" placeholder="请输入考场名称" />
            </el-form-item>
            <el-form-item label="考场容量">
                <el-input-number 
                    v-model="form.capacity" 
                    :min="1" 
                    :max="200"
                    placeholder="请输入考场容量"
                    style="width: 100%"
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