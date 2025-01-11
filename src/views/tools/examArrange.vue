<script setup lang="ts">
import { getExamArrange } from "@/api/examArrange";
import { onMounted, ref } from "vue";
import type { ExamArrange } from "@/model/ExamArrange";
import { formatTime } from "@/utils/tools";

const data = ref<ExamArrange[]>([]);

const getList = () => {
    getExamArrange().then((res) => {
        data.value = res;
        console.log(data.value);
        
    });
};

onMounted(() => {
    getList();
});
</script>
<template>
    <div>
        <el-button type="primary">考试安排预览</el-button>  
    </div>
    <el-card style="margin-top: 20px">
        <el-table :data="data" style="width: 100%">
            <el-table-column prop="className" label="班级" />
            <el-table-column prop="studentCount" label="人数" >
                <template #default="scope">
                    {{ scope.row.studentCount }}人
                </template>
            </el-table-column>
            <el-table-column prop="examName" label="课程（考试科目）" />
            <el-table-column prop="examTime" label="考试时间" >
                <template #default="scope">
                    {{ formatTime(scope.row.examTime, scope.row.examDuration) }}
                </template>
            </el-table-column>
            <el-table-column prop="examRoomName" label="考试地点" />
        </el-table>
    </el-card>
</template>
<style scoped>

</style>

