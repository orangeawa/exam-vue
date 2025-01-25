<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStudents, postStudent, updateStudent, deleteStudent, getClasses, postClassBatch, postStudentBatch } from '@/api/api'
import type { QueryParams, StudentData, ClassData } from '@/types/types'
import * as XLSX from 'xlsx'
import { ElMessageBox } from 'element-plus'

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

        console.log(res.data);
        
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

// 分页逻辑
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

// 添加文件上传相关的逻辑
const fileInputRef = ref<HTMLInputElement | null>(null)

// 处理文件上传
const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    // 读取文件
    const reader = new FileReader()
    reader.onload = async (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // 将表格数据转换为JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // 班级代码列表
        const classCodeList = new Set(jsonData.map((item: any) => item['班级']))

        // 新班级代码列表
        const newClassCodes: string[] = []

        classCodeList.forEach((item: any) => {
            if (classList.value.some(c => c.class_code === item)) 
                return
            newClassCodes.push(item)
        })

        // 有新的班级，是否添加？
        if (newClassCodes.length > 0) {
            await ElMessageBox.confirm(
                '有新的班级，是否添加？\n' + newClassCodes.join(', '), 
                '提示', 
                {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',}
            )

            await postClassBatch(newClassCodes)
            await getClassList()
        }

        // 处理学生数据
        const studentData: Omit<StudentData,'id'>[] = jsonData.map((item: any) => {
            return {
                student_id: item['学号'],
                student_name: item['姓名'],
                class_id: getClassIdByCode(item['班级'])
            }
        })

        // 发送批量添加学生请求
        postStudentBatch(studentData).then(res => {
            getList()
        })

    }
    reader.readAsBinaryString(file)

    // 清空文件输入框，以便可以重复上传同一个文件
    if (fileInputRef.value) {
        fileInputRef.value.value = ''
    }
}

// 通过班级代码获取班级ID
const getClassIdByCode = (classCode: string | undefined): number => {
    if (!classCode) return 0
    const classItem = classList.value.find(item => item.class_code === classCode)
    return classItem?.id || 0
}

// 触发文件选择
const handleBatchAdd = () => {
    fileInputRef.value?.click()
}

// 下载模板
const downloadTemplate = () => {
    // 创建工作簿
    const wb = XLSX.utils.book_new()
    
    // 创建工作表数据
    const wsData = [
        ['学号', '姓名', '班级'],
        ['2021001', '张三', '04F2111'],
        ['2021002', '李四', '04F2111']
    ]
    
    // 创建工作表
    const ws = XLSX.utils.aoa_to_sheet(wsData)
    
    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(wb, ws, '学生信息')
    
    // 导出文件
    XLSX.writeFile(wb, '学生信息导入模板.xlsx')
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
                    <el-button type="primary" @click="handleBatchAdd">批量添加</el-button>
                    <el-button type="info" @click="downloadTemplate">下载模板</el-button>
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

    <!-- 添加隐藏的文件输入框 -->
    <input
        ref="fileInputRef"
        type="file"
        accept=".xlsx,.xls"
        style="display: none"
        @change="handleFileUpload"
    >
</template>

<style scoped>
.el-pagination {
    margin-top: 20px;
}
</style>