<template>

        <el-row style="height: 100%;" v-if="main == 'home'">
            <el-col class="hidden-xs-only" :span="8"></el-col>
            <el-col :xl="8" style="height: 100%">
                <div class="hidden-xs-only" style="width: 100%;height: 20%;"></div>
                <el-card>
                    <p style="text-align: center;font-size: 2em;margin-top: 10px;margin-bottom: 10px;">星际酒馆资料站</p>
                    <el-divider></el-divider>
                    <p style="text-align: right;font-size: .8em">地图更新时间：{{ info.mapUpdatedAt }} 资料更新时间：{{ info.siteUpdatedAt }}</p>
                </el-card>
                <el-row :justify="pc ? 'space-between' : 'space-evenly'">
                    <el-col v-for="item in homeItems" :key="item.name" :xl="7" :xs="11">
                        <el-card class="home-item" @click="$router.push(item.name)">
                            <component :is="item.icon" style="width: 2em; height: 2em;" />
                            <p>{{ item.text }}</p>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        
</template>

<script>
export default {
    props: ['info', 'pc'],
    data() {
        return {
            main: 'home',
            homeItemArr: ['角色|character|User', '卡牌|card|Tickets', '升级|upgrade|Top', '单位|unit|Aim', '拓展包|pack|Suitcase', '更新|update|Bell'],
        }
    },
    computed: {
        homeItems: {
            get() {
                return this.homeItemArr.map((e) => {
                    let info = e.split('|')
                    return {
                        text: info[0],
                        name: info[1],
                        icon: info[2],
                    }
                })
            }
        },
    }
}
</script>

<style scoped>
.app {
    width: 100%;
    height: 100%;
}
.home-item {
    text-align: center;
    margin-top: 1em;
    padding: 1.5em;
    cursor: pointer;
    user-select: none;
    font-size: 1.2em;
}
.home-item:hover {
    background: rgb(219, 243, 250);
}

</style>