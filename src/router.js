import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Movie from './views/Movie.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/movie/:id', name: 'movie', component: Movie, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router