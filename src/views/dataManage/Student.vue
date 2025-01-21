<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStudents, postStudent, updateStudent, deleteStudent, getClasses } from '@/api/api'
import type { QueryParams, StudentData, ClassData } from '@/types/types'

const studentList = ref<StudentData[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const form = ref({
    id: 0,
    student_id: '',
    student_name: '',
    class_id: 0
})

const queryParams = ref<QueryParams>({
    pageNum: 1,
    pageSize: 10,
    student_id: '',
    student_name: '',
    class_id: null
})

// 添加班级列表数据
const classList = ref<ClassData[]>([])

const getList = () => {
    getStudents(queryParams.value).then(res => {
        studentList.value = res.data
        total.value = res.total || 0
    })
}

// 获取班级列表
const getClassList = () => {
    getClasses({ pageNum: 1, pageSize: 1000 }).then(res => {
        classList.value = res.data
    })
}

// 新增学生
const handleAdd = () => {
    postStudent(form.value).then(res => {
        getList()
    })
}

// 编辑学生
const handleEdit = (row: StudentData) => {
    dialogVisible.value = true
    form.value = { ...row }
}

// 编辑学生请求操作
const handleUpdate = () => {
    updateStudent(form.value.id, form.value).then(res => {
        dialogVisible.value = false
        getList()
    })
}

// 删除学生
const handleDelete = (row: StudentData) => {
    deleteStudent(row.id).then(res => {
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

// 修改初始化
onMounted(() => {
    getList()
    getClassList()
})

// 获取班级名称的方法
const getClassName = (classId: number) => {
    const classItem = classList.value.find(item => item.id === classId)
    return classItem ? classItem.class_code : '未知班级'
}
</script>

<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card shadow="hover">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="学号">
                        <el-input v-model="form.student_id" placeholder="请输入学号" />
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.student_name" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="form.class_id" placeholder="请选择班级" style="width: 100%">
                            <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.class_code"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-table :data="studentList" style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="student_id" label="学号" />
                <el-table-column prop="student_name" label="姓名" />
                <el-table-column prop="class_id" label="班级">
                    <template #default="{ row }">
                        {{ getClassName(row.class_id) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
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

    <el-dialog v-model="dialogVisible" title="编辑学生信息" width="30%">
        <el-form :model="form" label-width="80px" label-position="top">
            <el-form-item label="学号">
                <el-input v-model="form.student_id" placeholder="请输入学号" />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.student_name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="form.class_id" placeholder="请选择班级" style="width: 100%">
                    <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.class_code"
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