<script setup lang="ts">
import { ref } from 'vue';
import type { ExamRoomSeat } from '@/model/ExamRoomSeat';
import { getExamRoomSeatList } from '@/api/examRoomSeat';

const tableList = ref<ExamRoomSeat[]>([])

const getList = () => {
    getExamRoomSeatList().then(res => {
        tableList.value = res
    })
}

getList()
</script>
<template>
    <el-row :gutter="20" style="width: 85%;margin: 0 auto;">
        <el-col :span="8">
            <el-card>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card>
                <el-table :data="tableList" :border="true">
                    <el-table-column prop="exam_room_id" label="考场号"  align="center"/>
                    <el-table-column prop="seat_number" label="座位号"  align="center"/>
                    <el-table-column prop="student_id" label="学生姓名"  align="center"/>
                    <el-table-column prop="exam_id" label="考试名称"  align="center"/>
                    <!-- <el-table-column label="操作" align="center">
                        <template #default="{ row }">
                            <el-button link type="danger" icon="Delete" circle @click="handleDelete(row.id)" />
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>
<style scoped>

</style>

