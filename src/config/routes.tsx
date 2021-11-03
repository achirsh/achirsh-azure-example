import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

const Home = loadable(() => pMinDelay(import('../pages/home'), 200))
const IFRAME = loadable(() => pMinDelay(import('../pages/iframe'), 200))

export const routes = [
    { path: "/", component: Home },

    // 集成其他项目
    { path: "/control/:key/:path", component: IFRAME }
]
