<template>
        <el-row style="height: 100%;">
            <el-col class="hidden-xs-only" :span="6"></el-col>
            <el-col :xl="12" style="height: 100%">
            <br class="hidden-xs-only" />
            <el-card>
                <el-form inline>
                    <el-form-item>
                        <el-button type="primary" @click="$router.back()">返回</el-button>
                        <el-button type="success" @click="$router.push('/')">主页</el-button>
                    </el-form-item>
                    <el-form-item label="搜索">
                        <el-input clearable v-model="search.name" @change="setSearch"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="search.group" clearable placeholder="选择类型" @change="setSearch">
                            <el-option v-for="name in upgrades.groups" :key="name" :label="name" :value="name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示评价">
                        <el-switch :value="show.comment" @change="setShowComment"></el-switch>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-table :data="searchRs">
                    <el-table-column prop="name" label="名称" width="100"></el-table-column>
                    <el-table-column prop="effect" label="效果" :min-width="pc ? 0 : 200"></el-table-column>
                    <el-table-column prop="group" label="类型" width="100"></el-table-column>
                    <el-table-column v-if="show.comment" prop="comment" label="评价" :min-width="pc ? 0 : 200"></el-table-column>
                </el-table>
            </el-card>
            </el-col>
        </el-row>
</template>

<script>
export default {
    props: ['upgrades', 'show', 'pc'],
    data() {
        return {
            search: {
                name: '',
                group: '',
            },
        }
    },
    methods: {
        setShowComment(on) {
            this.$emit('setShow', 'comment', on)
        },
        setSearch() {
                let search = {}
                for (let key in this.search) {
                    if (this.search[key]) {
                        search[key] = this.search[key]
                    }
                }
                this.$router.replace({ query: search })
        }
    },
    computed: {
        searchRs: {
            get() {
                let upgrades = this.upgrades.upgrades
                if (this.search.name) {
                    upgrades = upgrades.filter((e) => {
                        return e.name.indexOf(this.search.name) != -1
                    })
                }
                if (this.search.group) {
                    upgrades = upgrades.filter((e) => {
                        return e.group == this.search.group
                    })
                }
                return upgrades
            }
        }
    },
    created() {
        let search = this.$router.currentRoute.value.query
        for (let key in search) {
            if (search[key]) {
                this.search[key] = search[key]
            }
        }
    }
}
</script>