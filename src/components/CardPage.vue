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
                        <el-select v-model="search.star" clearable placeholder="选择星级" @change="setSearch">
                            <el-option v-for="star in [1, 2, 3, 4, 5, 6]" :key="star" :label="star" :value="star">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="search.group" clearable placeholder="选择种族" @change="setSearch">
                            <el-option v-for="name in cards.groups" :key="name" :label="name" :value="name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="search.pack" clearable placeholder="选择拓展包" @change="setSearch">
                            <el-option v-for="item in packs.packs" :key="item.name" :label="item.name"
                                :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示评价">
                        <el-switch :value="show.comment" @change="setShowComment"></el-switch>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-table :data="searchRs">
                    <el-table-column prop="name" label="名称" width="100"></el-table-column>
                    <el-table-column prop="star" label="星级" width="60"></el-table-column>
                    <el-table-column prop="unit" label="单位" :min-width="pc ? 0 : 200"></el-table-column>
                    <el-table-column label="描述" :min-width="pc ? 0 : 200">
                        <template #default="scope">
                            <div v-html="scope.row.function"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="three" label="三连" :min-width="pc ? 0 : 200"></el-table-column>
                    <el-table-column prop="group" label="种族" width="100"></el-table-column>
                    <el-table-column prop="pack" label="拓展包" width="100"></el-table-column>
                    <el-table-column v-if="show.comment" label="评价" :min-width="pc ? 0 : 200">
                        <template #default="scope">
                            <div v-html="scope.row.comment"></div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['cards', 'packs', 'show', 'pc'],
    data() {
        return {
            search: {
                name: '',
                star: '',
                group: '',
                pack: '',
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
                let search = this.search
                let cards = this.cards.cards
                if (search.name) {
                    cards = cards.filter((e) => {
                        return e.name.indexOf(search.name) != -1
                    })
                }
                if (search.star) {
                    cards = cards.filter(e => e.star == search.star)
                }
                if (search.group) {
                    cards = cards.filter((e) => {
                        return e.group == search.group
                    })
                }
                if (search.pack) {
                    cards = cards.filter((e) => {
                        return e.pack == search.pack
                    })
                }
                return cards
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