import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:() => import ('../pages/Login')
    
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/register',
    component:() => import ('../pages/Register')
  },
  {
    path:'/home',
    component:() => import ('../pages/Home'),
    children:[
      {
        path:'student',
        component:() => import ('../pages/Student'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'||to.path=='/register'){
    return next()
  }
  const token = sessionStorage.getItem('token')
  if(!token) return next('/login')
  next()
})
export default router
