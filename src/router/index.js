import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "Login",
    component: () => import("../pages/userLogin.vue")
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
    path: '/clinicianSignup',
    name: "clinicianSignup",
    component: () => import("../pages/ClinicianSignup.vue")
  },
  {
    path: '/engineerSignup',
    name: "engineerSignup",
    component: () => import("../pages/EngineerSignup.vue")
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
    component: () => import("../pages/clinicianProfile.vue")
  },
  {
    path: '/proposal_form',
    name: "Proposal Form",
    component: () => import("../pages/ProposalForm.vue")
  }
]

const router = new VueRouter({
  mode: "history",
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
