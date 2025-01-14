<script setup lang="ts">
import { formatTime } from "@/utils/tools";
import { onMounted, ref } from "vue";
import type { ExamArrange } from "@/model/ExamArrange";
import type { Classes } from "@/model/Class";
import type { Exam } from "@/model/Exam";
import type { ExamRoom } from "@/model/ExamRoom";
import { getExamArrange } from "@/api/examArrange";
import { getClassList } from "@/api/class";
import { getExamList } from "@/api/exam";
import { getExamRoomList } from "@/api/examRoom";
// tab栏
const activeName = ref<string>("preview");

// 考试安排预览
const data = ref<ExamArrange[]>([]);

const getList = () => {
    getExamArrange().then((res) => {
        data.value = res;
        console.log(data.value);

    });
};

const handleEdit = (row: ExamArrange) => {
    activeName.value = "edit";
};

const handleDelete = (row: ExamArrange) => {
    console.log(row);
};


// 编辑考试安排
const form = ref<{
    examId: number
    className: string[]
    examRoomId: number[]
}>({
    examId: 0,
    className: [],
    examRoomId: []
})

const examList = ref<Exam[]>([])
const examRoomList = ref<ExamRoom[]>([])
const classList = ref<Classes[]>([])

getClassList().then(res => {
    classList.value = res.data
})
getExamList().then(res => {
    examList.value = res
})
getExamRoomList().then(res => {
    examRoomList.value = res
})

onMounted(() => {
    getList();
});
</script>
<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="考试安排预览" name="preview">
            <el-table :data="data" style="width: 100%" border>
                <el-table-column prop="className" label="班级" align="center" />
                <el-table-column prop="studentCount" label="人数" align="center">
                    <template #default="scope">
                        {{ scope.row.studentCount }}人
                    </template>
                </el-table-column>
                <el-table-column prop="examName" label="课程（考试科目）" align="center" />
                <el-table-column prop="examTime" label="考试时间" align="center">
                    <template #default="scope">
                        {{ formatTime(scope.row.examTime, scope.row.examDuration) }}
                    </template>
                </el-table-column>
                <el-table-column prop="examRoomName" label="考试地点" align="center" />
                <!-- 操作 -->
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>

        <el-tab-pane label="考试安排编辑" name="edit">
            <el-row :gutter="20">
                <!-- 左侧表单 -->
                <el-col :span="12">
                    <!-- <el-card shadow="never"> -->
                        <el-form :model="form" ref="formRef" label-width="100px">
                            <!-- 选择考试 -->
                            <el-form-item label="选择考试" prop="examId">
                                <el-select v-model="form.examId" placeholder="请选择考试" style="width: 100%">
                                    <el-option v-for="item in examList" :key="item.id" :label="item.name" :value="item.id" />
                                </el-select>
                            </el-form-item>
                            <!-- 分割线 -->
                            <el-divider />
                            <!-- 选择班级（多选） -->
                            <el-form-item label="选择班级" prop="className">
                                <el-select v-model="form.className" placeholder="请选择班级" multiple style="width: 100%">
                                    <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
                                </el-select>
                            </el-form-item>
                            <!-- 选择考场（多选） -->
                            <el-form-item label="选择考场" prop="examRoomId">
                                <el-select v-model="form.examRoomId" placeholder="请选择考场" multiple style="width: 100%">
                                    <el-option v-for="item in examRoomList" :key="item.id" :label="item.name" :value="item.id" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    <!-- </el-card> -->
                </el-col>
                <!-- 右侧预览区域 -->
                <el-col :span="12">
                    <el-card shadow="never">
                        <template #header>
                            <div class="card-header">
                                <span>预览区域</span>
                            </div>
                        </template>
                        <div>
                            {{ form }}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
.card-header {
    font-weight: bold;
}
</style>

