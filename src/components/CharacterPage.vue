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
                        <el-input clearable v-model="search"></el-input>
                    </el-form-item>
                    <el-form-item label="显示评价">
                        <el-switch :value="show.comment" @change="setShowComment"></el-switch>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-table :data="searchRs">
                    <el-table-column prop="name" label="名称" width="80"></el-table-column>
                    <el-table-column prop="skill" label="技能"></el-table-column>
                    <el-table-column v-if="show.comment" prop="comment" label="评价"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['characters', 'show', 'pc'],
    data() {
        return {
            search: '',
        }
    },
    methods: {
        setShowComment(on) {
            this.$emit('setShow', 'comment', on)
        }
    },
    watch: {
        search() {
            this.$router.replace({query: this.search ? {
                name: this.search
            } : ''})
        }
    },
    computed: {
        searchRs: {
            get() {
                if (! this.search) {
                    return this.characters.characters
                }
                return this.characters.characters.filter((e) => {
                    return e.name.indexOf(this.search) != -1
                })
            }
        }
    },
    created() {
        let name = this.$router.currentRoute.value.query.name
        this.search = name ? name : ''
    }
}
</script>