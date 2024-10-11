import LoginView from '@/components/authentication/LoginView.vue'
import PasswordResetView from '@/components/authentication/PasswordResetView.vue'
import RegisterView from '@/components/authentication/RegisterView.vue'
import HomePageView from '@/components/HomePageView.vue'
import AboutPage from '@/components/views/AboutPage.vue'
import AdminDashboardView from '@/components/views/AdminDashboardView.vue'
import HelpPostView from '@/components/views/HelpPostView.vue'
import InteractiveChartsForRatingView from '@/components/views/InteractiveChartsForRatingView.vue'
import JoinUsView from '@/components/views/JoinUsView.vue'
import LearningFormView from '@/components/views/LearningFormView.vue'
import RatingFeedBackView from '@/components/views/RatingFeedBackView.vue'
import SponsorsPage from '@/components/views/SponsorsPage.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/FirbaseConfig.js'

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
  },
  {
    path: '/views/InteractiveChartsForRating',
    name: 'InteractiveChartsForRating',
    component: InteractiveChartsForRatingView
  },
  {
    path: '/views/AdminDashboardView',
    name: 'AdminDashboardView',
    component: AdminDashboardView,
    meta: {
      isAuth: true,
      isAdmin: true
    }
  }
]

// https://firebase.google.com/docs/auth/web/manage-users?hl=zh-cn
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
const getCurrentUser = () => {
  const auth = getAuth()
  return new Promise((resolve, reject) => {
    const stopObservation = onAuthStateChanged(
      auth,
      (user) => {
        stopObservation() // stop listen the changing of status
        if (user) {
          resolve(user)
        } else {
          resolve(null)
        }
      },
      (error) => {
        stopObservation()
        reject(error)
      }
    )
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getUserRole = async (uid) => {
  if (uid === '2JUvF7Y0TUgWSAHjr4upxtxIgR13') {
    return 'admin'
  }
}

// https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()
  console.log(user)
  if (to.meta.isAuth) {
    if (user) {
      const userRole = await getUserRole(user.uid)
      console.log(userRole)
      if (to.meta.isAdmin && userRole !== 'admin') {
        alert('Access denied')
        next('/')
      } else {
        next()
      }
    } else {
      alert('The action needs login first')
      next('/authentication/login')
    }
  } else {
    next()
  }
})

export default router
