import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Movie from './views/Movie.vue'
import NotFound from './views/NotFound.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/movie/:id', name: 'movie', component: Movie, props: true },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router