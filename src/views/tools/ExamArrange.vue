<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getExams, getExamSchedules } from '@/api/api'
import type { ExamData, ExamScheduleData } from '@/types/types'
import { formatDate } from '@/utils/tools'
import setExam from '@/components/setExam.vue'

const activeTab = ref('examArrange')
</script>

<template>
    <el-tabs v-model="activeTab" >
        <el-tab-pane label="考试安排" name="examArrange">
            <setExam />
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
</style> 