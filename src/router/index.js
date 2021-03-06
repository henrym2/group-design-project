import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "Login",
    component: () => import("../pages/userLogin.vue"),
    meta: { hideNavigation: true }
  },
  {
    path: '/form',
    name: "Form",
    component: () => import('../pages/Project_Proposal.vue'),
    meta: {
      requiresAuth: true
    }
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
    path: '/clinician_profile',
    name: "Clinician Profile",
    component: () => import("../pages/clinicianProfile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/engineer_profile',
    name: "Engineer Profile",
    component: () => import("../pages/engineerProfile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/findEngineer',
    name: "Find an engineer",
    component: () => import("../pages/findEngineer.vue"),
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/view-mess',
    name: "viewMess",
    component: () => import("../pages/ViewMess.vue")
  },
  {
    path: '/add-mess',
    name: "addMess",
    component: () => import("../pages/AddMess.vue")
  },
  {
    path: '/dashboard',
    name: "dashboard",
    component: () => import("../pages/dashboard.vue")
  },
  {
    path: '/recommendations',
    name: "Recommendation Forum",
    component: () => import("../pages/recommendationForum.vue"),
    meta: {
      requiresAuth: true
    }
  }


]

const router = new VueRouter({
  mode: "history",
  routes
})


/**
 * Simple auth router middleware, checks to ensure that the current session is authenticated
 */
router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isAuthed = sessionStorage.getItem("auth") === "true"
  if (requiresAuth && !isAuthed) {
    next('/')
  } else {
    next()
  }
})

/**
 * Router middleware for deciding routing based on if a user is a clinician or engineer
 */
router.beforeEach((to, _, next) => {
  if (to.path == "/profile") {
    const userData = JSON.parse(sessionStorage.getItem("user"))
    if (userData.role == "engineer") {
      next("/engineer_profile")
    } else if (userData.role == "clinician") {
      next('/clinician_profile')
    }
  } else {
    next()
  }
})


export default router
