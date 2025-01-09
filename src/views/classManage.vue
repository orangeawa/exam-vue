<script setup lang="ts">
import { getClassList } from '@/api/class'

getClassList().then(res => {
    console.log(res)
})
</script>

<template>
    <div>
        <!-- <el-button type="primary">cha</el-button> -->

    </div>
</template>

<style scoped>

</style>
