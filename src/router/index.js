import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    component: () => import('../pages/Form.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: "Login",
    component: () => import("../pages/Login.vue")
  },
  {
    path: '/signup',
    name: "Signup",
    component: () => import("../pages/Signup.vue")
  },
  {
    path: '/T&C',
    name: "T&C",
    component: () => import("../pages/T&C.vue")
  },
  {
    path: '/projects',
    name: "Projects",
    component: () => import("../pages/ProjectList.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ProposalForm',
    name: "Proposal Form",
    component: () => import("../pages/ProposalForm.vue")
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isAuthed = sessionStorage.getItem("auth") === "true"
  if (requiresAuth && !isAuthed) {
    next('/login')
  } else {
    next()
  }
})

export default router
