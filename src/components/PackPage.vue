<template>
        <el-row style="height: 100%;">
            <el-col class="hidden-xs-only" :span="6"></el-col>
            <el-col :xl="12" style="height: 100%">
                <el-card style="margin: 1em">
                <el-button type="primary" @click="$router.back()" size="large">返回</el-button>
                <el-button type="success" @click="$router.push('/')" size="large">主页</el-button>
                </el-card>
                <el-card class="pack-item" v-for="pack in packs.packs" :key="pack.name" @click="toCardWithPack(pack.name)">
                    <div style="font-size: 1.1em;display: inline-block;">{{ pack.name }}</div>
                    <el-divider direction="vertical"></el-divider>
                    <div style="display: inline-block;margin: 0 .5em;" v-for="card in pack.cards" :key="card">{{ card }}</div>
                </el-card>
            </el-col>
        </el-row>
</template>

<script>
export default {
    props: ['packs'],
    methods: {
        toCardWithPack(pack) {
            this.$router.push({
                path: '/card',
                query: {
                    pack
                }
            })
        }
    }
}
</script>

<style scoped>
.pack-item {
    margin: 1em;
    cursor: pointer;
    user-select: none;
}
.pack-item:hover {
    background: rgb(219, 243, 250);
}
</style>