<script setup lang="ts">
import { DataLine, Operation } from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
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
                    
                    <!-- 功能子菜单 -->
                    <el-sub-menu index="/tools">
                        <template #title>
                            <el-icon><Operation /></el-icon>
                            <span>功能</span>
                        </template>
                        <el-menu-item index="/tools/examArrange">考试安排预览</el-menu-item>
                    </el-sub-menu>
                    
                    <!-- 数据管理子菜单 -->
                    <el-sub-menu index="/dataManage">
                        <template #title>
                            <el-icon><DataLine /></el-icon>
                            <span>数据管理</span>
                        </template>
                        <el-menu-item index="/dataManage/exam">考试管理</el-menu-item>
                        <el-menu-item index="/dataManage/class">班级管理</el-menu-item>
                        <el-menu-item index="/dataManage/examRoom">考场管理</el-menu-item>
                        <el-menu-item index="/dataManage/student">学生管理</el-menu-item>
                        <el-menu-item index="/dataManage/examRoomSeat">考场座位管理</el-menu-item>
                    </el-sub-menu>
                    
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
