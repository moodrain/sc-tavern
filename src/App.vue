<template>
    <el-container class="app">
        <router-view :info="info" :updates="updates" :characters="characters" :cards="cards" :packs="packs"
            :units="units" :upgrades="upgrades" :pc="pc" :show="show" @setShow="setShow">
        </router-view>
    </el-container>
</template>

<script>
import info from './data/info.json'
import updates from './data/updates.json'
import characters from './data/characters.json'
import cards from './data/cards.json'
import packs from './data/packs.json'
import units from './data/units.json'
import upgrades from './data/upgrades.json'

export default {
    data() {
        updates.updates = updates.updates.reverse()
        units.units = units.units.map((e) => {
            let infos = e.attr.split('|')
            let hp = infos[0].split(',')
            e.hp = hp[0]
            e.sp = hp.length > 1 ? hp[1] : 0
            e.atk = infos[1]
            let def = infos[2].split(',')
            e.def = def[0]
            e.armor = this.toArmour(def[1])
            e.range = infos[3].split(',')
            let group = e.group.split('')
            let groupArr = []
            e.animal = group[0] == 1
            e.machine = group[1] == 1
            e.building = group[2] == 1
            e.fly == group[3] == 1
            e.huge = group[4] == 1
            e.hero = group[5] == 1
            for (group of units.groups) {
                if (e[group[0]]) {
                    groupArr.push(group[1])
                }
            }
            e.groupStr = groupArr.join(',')
            e.interval = infos[4]
            return e
        })
        return {
            info, updates, characters, cards, packs, units, upgrades,
            show: {
                comment: false
            },
            pc: true
        }
    },
    methods: {
        toArmour(val) {
            switch (val) {
                case '0': return '无甲'
                case '1': return '重甲'
                case '2': return '轻甲'
            }
        },
        setShow(toShow, on) {
            localStorage.setItem('show.' + toShow, on)
            this.show.comment = on
        }
    },
    created() {
        this.pc = document.body.clientHeight < document.body.clientWidth
        let localShowComment = localStorage.getItem('show.comment')
        if (localShowComment === 'true') {
            this.show.comment = true
        }
        if (localShowComment === 'true') {
            this.show.comment = false
        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none;
}

.el-row {
    width: 100%;
}

html,
body,
.app,
#app {
    width: 100%;
    height: 100%;
}
</style>
