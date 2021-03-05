import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "userLogin",
    component: () => import("../pages/userLogin.vue")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/form',
    name: "Form",
    component: () => import('../pages/Form.vue')
  },
  {
    path: '/signup',
    name: "Signup",
    component: () => import("../pages/Signup.vue")
  },
  {
    path: '/T&C',
    name: "terms&cond",
    component: () => import("../pages/terms&cond.vue")
  },
  {
    path: '/projects',
    name: "Projects",
    component: () => import("../pages/ProjectList.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
