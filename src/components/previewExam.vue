<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getExamTimeRanges } from '@/api/api'

const examTimeRanges = ref<{ exam_time: string, duration: number }[]>([])
// 选中的考试时间段
const selectedTimeRange = ref<{ exam_time: string, duration: number } | null>(null)

console.log(examTimeRanges.value);

onMounted(async () => {
    const { data } = await getExamTimeRanges()
    if (data) {
        examTimeRanges.value = data
    }
})

</script>

<template>
    <dev>
        <!-- 选择时间段 -->
        <el-select v-model="selectedTimeRange">
            <el-option v-for="(item, index) in examTimeRanges" :key="index"
                :label="item.exam_time + ' - ' + item.duration" :value="item"></el-option>
        </el-select>
        <!-- 表格显示 -->
    </dev>
</template>