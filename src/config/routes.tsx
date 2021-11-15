import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

const Home = loadable(() => pMinDelay(import('../pages/home'), 200))

export const routes = [
    { path: "/", component: Home }
]
