<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getExams, getExamSchedules } from '@/api/api'
import type { ExamData, ExamScheduleData } from '@/types/types'
import { formatDate } from '@/utils/tools'
import setExam from '@/components/setExam.vue'
import PreviewExam from '@/components/previewExam.vue'

const activeTab = ref('examArrange')
</script>

<template>
    <el-tabs v-model="activeTab" >
        <el-tab-pane label="考试安排" name="examArrange">
            <setExam />
        </el-tab-pane>
        <el-tab-pane label="考试预览" name="examPreview">
            <PreviewExam />
        </el-tab-pane>
    </el-tabs>
    <!-- <div class="examArrange">
        <div style="flex: 2;">
            <setExam />
        </div>
        <div style="flex: 3;">
            <PreviewExam />
        </div>
    </div> -->
</template>

<style scoped>
.examArrange {
    width: 100%;
    gap: 20px;
    display: flex;
}
</style> 