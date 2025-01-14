<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getStudentList, addStudent, deleteStudent } from '@/api/student'
import { getClassList } from '@/api/class'
import type { Student, EditableStudent } from '@/model/Student'
import type { Classes } from '@/model/Class'

const tableList = ref<Student[]>([])
const form = ref<EditableStudent>({
    name: '',
    sid: '',
    class_name: ''
})

// 班级列表，用于选择班级
const classList = ref<Classes[]>([])

// 获取班级列表
function getClasses(): void {
    // 调用班级API获取班级列表
    getClassList().then(res => {
        classList.value = res.data
    })
}

// 获取学生列表
function getList(): void {
    getStudentList().then(res => {
        tableList.value = res
    })
}

// 提交表单
function submitForm(): void {
    if (!form.value.name || !form.value.sid || !form.value.class_name) {
        ElMessage.warning('请填写完整信息')
        return
    }
    addStudent(form.value).then(res => {
        ElMessage.success(res.msg)
        getList()
        // 重置表单
        form.value = {
            name: '',
            sid: '',
            class_name: ''
        }
    })
}

// 删除学生
function handleDelete(id: number): void {
    deleteStudent(id).then(res => {
        ElMessage.success(res.msg)
        getList()
    })
}

// 页面加载时获取数据
getList()
getClasses()
</script>

<template>
    <el-row :gutter="20" style="width: 85%;margin: 0 auto;">
        <el-col :span="8">
            <!-- 添加学生 -->
            <el-card>
                <el-form>
                    <el-form-item label="学号">
                        <el-input v-model="form.sid" placeholder="请输入学号" />
                    </el-form-item>
                    <el-form-item label="学生姓名">
                        <el-input v-model="form.name" placeholder="请输入学生姓名" />
                    </el-form-item>
                    <el-form-item label="所属班级">
                        <el-select v-model="form.class_name" placeholder="请选择班级">
                            <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                            />
                        </el-select>
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
                    <el-table-column prop="name" label="学生姓名" align="center"/>
                    <el-table-column prop="sid" label="学号" align="center"/>
                    <el-table-column prop="class_name" label="所属班级" align="center"/>
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

