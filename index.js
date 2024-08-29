import LoginView from '@/components/authentication/LoginView.vue'
import PasswordResetView from '@/components/authentication/PasswordResetView.vue'
import RegisterView from '@/components/authentication/RegisterView.vue'
import HomePageView from '@/components/HomePageView.vue'
import AboutPage from '@/components/views/AboutPage.vue'
import HelpPostView from '@/components/views/HelpPostView.vue'
import JoinUsView from '@/components/views/JoinUsView.vue'
import LearningFormView from '@/components/views/LearningFormView.vue'
import RatingFeedBackView from '@/components/views/RatingFeedBackView.vue'
import SponsorsPage from '@/components/views/SponsorsPage.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePageView
  },
  {
    path: '/views/about-us',
    name: 'AboutUs',
    component: AboutPage
  },
  {
    path: '/views/sponsors',
    name: 'Sponsors',
    component: SponsorsPage
  },
  {
    path: '/views/Learning',
    name: 'Learning',
    component: LearningFormView
  },
  {
    path: '/views/Help',
    name: 'Help',
    component: HelpPostView
  },
  {
    path: '/views/join',
    name: 'join',
    component: JoinUsView
  },
  {
    path: '/authentication/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/authentication/registor',
    name: 'Registor',
    component: RegisterView
  },
  {
    path: '/authentication/reset',
    name: 'Reset',
    component: PasswordResetView
  },
  {
    path: '/views/RatingFeedBackView',
    name: 'Rating',
    component: RatingFeedBackView,
    meta: {
      isAuth: true
    }
  }
]

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    const user = await getCurrentUser()
    if (user) {
      next()
    } else {
      alert('This action needs login first')
      next('/authentication/login')
    }
  } else {
    next()
  }
})

export default router
