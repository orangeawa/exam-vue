<script setup lang="ts">
import { ref } from 'vue'
import { getClasses, postClass, type QueryParams, type ClassData, updateClass, deleteClass, updateClassTotalStudents } from '@/api/api'

const classList = ref<ClassData[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const form = ref({
    id: 0,
    class_code: '',
    total_students: 0,
})

const queryParams = ref<QueryParams>({
    pageNum: 1,
    pageSize: 10,
    class_code: '',
    total_students: null,
})

const getList = () => {
    getClasses(queryParams.value).then(res => {
        classList.value = res.data
        total.value = res.total || 0
    })
}

// 新增班级
const handleAdd = () => {
    postClass(form.value).then(res => {
        getList()
    })
}

// 编辑班级
const handleEdit = (row: ClassData) => {
    dialogVisible.value = true
    form.value = row
}

// 编辑班级请求操作
const handleUpdate = () => {
    updateClass(form.value.id, form.value).then(res => {
        dialogVisible.value = false
        getList()
    })
}

// 删除班级
const handleDelete = (row: ClassData) => {
    deleteClass(row.id).then(res => {
        getList()
    })
}

// 更新班级人数
const handleUpdateTotalStudents = (row: ClassData) => {
    updateClassTotalStudents(row.id).then(res => {
        getList()
    })
}

// 添加这两个处理函数
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
                    <el-form-item label="班级名称">
                        <el-input v-model="form.class_code" placeholder="请输入班级代码" />
                    </el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-table :data="classList" style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="class_code" label="班级代码" />
                <el-table-column prop="total_students" label="班级人数" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="handleUpdateTotalStudents(scope.row)">刷新人数</el-button>
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 修改分页组件 -->
            <el-pagination hide-on-single-page v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize" :total="total" :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" background />
        </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="编辑班级" width="20%">
        <el-form :model="form" label-width="80px" label-position="top">
            <el-form-item label="班级代码">
                <el-input style="width: 100%;" v-model="form.class_code" placeholder="请输入班级代码" />
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