<template>
    <el-row style="height: 100%;">
        <el-timeline style="margin: 2em auto">
            <div style="height: 4em;width: 100%;">
                <el-button type="primary" @click="$router.back()" size="large">返回</el-button>
                <el-button type="success" @click="$router.push('/')" size="large">主页</el-button>
            </div>
            <el-timeline-item v-for="(item, index) in updates.updates" :key="index" :timestamp="item.date">
                <p v-html="item.content" style="font-size: 1.1em"></p>
            </el-timeline-item>
        </el-timeline>
    </el-row>
</template>

<script>
export default {
    props: ['updates']
}
</script>