<template>
    <el-row style="height: 100%;">
        <el-col class="hidden-xs-only" :span="5"></el-col>
        <el-col :xl="14" style="height: 100%">
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
                        <el-select v-model="search.group" clearable placeholder="选择属性" @change="setSearch">
                            <el-option v-for="group in units.groups" :key="group[0]" :label="group[1]"
                                :value="group[0]"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="search.armor" clearable placeholder="选择护甲" @change="setSearch">
                            <el-option v-for="name in units.armors" :key="name" :label="name" :value="name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示评价">
                        <el-switch :value="show.comment" @change="setShowComment"></el-switch>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-table :data="searchRs">
                    <el-table-column prop="name" label="名称" width="100" fixed></el-table-column>
                    <el-table-column prop="nick" label="别名" width="100"></el-table-column>
                    <el-table-column prop="hp" label="生命" width="60"></el-table-column>
                    <el-table-column prop="sp" label="护盾" width="60"></el-table-column>
                    <el-table-column prop="atk" label="攻击" width="60"></el-table-column>
                    <el-table-column prop="interval" label="攻速" width="60"></el-table-column>
                    <el-table-column label="射程" width="60">
                        <template #default="scope">
                            <p
                                v-if="scope.row.range[0] != scope.row.range[1] && scope.row.range[0] > -1 && scope.row.range[1] > -1">
                                {{ scope.row.range[0] }} (地) <br /> {{ scope.row.range[1] }} (空)</p>
                            <p v-if="scope.row.range[0] == scope.row.range[1]">{{ scope.row.range[0] }}</p>
                            <p v-if="scope.row.range[0] > -1 && scope.row.range[1] == -1">{{ scope.row.range[0] }} (地)
                            </p>
                            <p v-if="scope.row.range[1] > -1 && scope.row.range[0] == -1">{{ scope.row.range[1] }} (空)
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="def" label="防御" width="60"></el-table-column>
                    <el-table-column prop="armor" label="护甲" width="60"></el-table-column>
                    <el-table-column prop="groupStr" label="属性" width="100"></el-table-column>
                    <el-table-column prop="skill" label="技能" :min-width="pc ? 0 : 200"></el-table-column>
                    <el-table-column v-if="show.comment" prop="comment" label="评价" :min-width="pc ? 0 : 200">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['units', 'show', 'pc'],
    data() {
        return {
            search: {
                name: '',
                group: '',
                armor: '',
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
                let units = this.units.units
                if (this.search.name) {
                    units = units.filter((e) => {
                        return e.name.indexOf(this.search.name) != -1 || e.nick.indexOf(this.search.name) != -1
                    })
                }
                if (this.search.group) {
                    units = units.filter(e => e[this.search.group])
                }
                if (this.search.armor) {
                    units = units.filter(e => e.armor == this.search.armor)
                }
                return units
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