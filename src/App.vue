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
                >
                    <router-link to="/">
                        <el-menu-item index="0">首页</el-menu-item>
                    </router-link>
                    <router-link to="/exam">
                        <el-menu-item index="1">考试管理</el-menu-item>
                    </router-link>
                    <router-link to="/class">
                        <el-menu-item index="2">班级管理</el-menu-item>
                    </router-link>
                    <!-- 考场管理 -->
                    <router-link to="/examRoom">
                        <el-menu-item index="3">考场管理</el-menu-item>
                    </router-link>
                    <!-- 考试安排预览 -->
                    <router-link to="/examArrange">
                        <el-menu-item index="4">考试安排预览</el-menu-item>
                    </router-link>
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
