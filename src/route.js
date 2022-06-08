import Home from './components/HomePage'
import Update from './components/UpdatePage'
import Character from './components/CharacterPage'
import Card from './components/CardPage'
import Upgrade from './components/UpgradePage'
import Unit from './components/UnitPage'
import Pack from './components/PackPage'

const routes = [
    {
        path: '/',
        component: Home,
    }, {
        path: '/update',
        component: Update,
    }, {
        path: '/character',
        component: Character,
    }, {
        path: '/card',
        component: Card,
    }, {
        path: '/upgrade',
        component: Upgrade,
    }, {
        path: '/unit',
        component: Unit,
    }, {
        path: '/pack',
        component: Pack,
    }
]

export {
    routes
}