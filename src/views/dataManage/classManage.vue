<script setup lang="ts">
import { ref } from 'vue'
import type { Classes, EditableClasses } from "@/model/Class";
import { getClassList,addClassList,deleteClass } from '@/api/class'
import { ElMessage } from 'element-plus'

const tableList = ref<Classes[]>([])
const form = ref<EditableClasses>({
    id: null,
    name: '',
    number: 0
})

function getList(): void {
    getClassList().then(res => {
        tableList.value = res.data
    })
}
function submitForm(): void {
    addClassList(form.value).then(res => {
        ElMessage.success(res.msg)
        getList()
    })
}
function handleDelete(id: number): void {
    deleteClass(id).then(res => {
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
                    <el-form-item label="班级代码">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="班级人数">
                        <el-input v-model="form.number"></el-input>
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
                    <el-table-column prop="name" label="班级代码"  align="center"/>
                    <el-table-column prop="number" label="班级人数"  align="center"/>
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
