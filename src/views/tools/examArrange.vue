<script setup lang="ts">
import { getExamArrange } from "@/api/examArrange";
import { onMounted, ref } from "vue";
import type { ExamArrange } from "@/model/ExamArrange";
import { formatTime } from "@/utils/tools";

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


onMounted(() => {
    getList();
});
</script>
<template>
    <!-- <div>
        <el-button type="primary">考试安排预览</el-button>  
    </div> -->
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

        </el-tab-pane>
    </el-tabs>
</template>
<style scoped></style>

