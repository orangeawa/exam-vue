<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <el-container>
        <el-aside width="200px">
            <!-- 滚动条 -->
             <el-scrollbar>
                <el-menu
                class="el-menu"
                router
                default-active="/"
                >
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/exam">考试管理</el-menu-item>
                    <el-menu-item index="/class">班级管理</el-menu-item>
                    <!-- 考场管理 -->
                    <el-menu-item index="/examRoom">考场管理</el-menu-item>
                    <!-- 考试安排预览 -->
                    <el-menu-item index="/examArrange">考试安排预览</el-menu-item>
                </el-menu>

             </el-scrollbar>
        </el-aside>
        <el-container>
            <!-- <el-header>Header</el-header> -->
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-container {
    height: 100%;
}
.el-menu{
    height: 100vh;
}
</style>
