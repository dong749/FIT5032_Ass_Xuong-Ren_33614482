import LoginView from '@/components/authentication/LoginView.vue'
import PasswordResetView from '@/components/authentication/PasswordResetView.vue'
import RegisterView from '@/components/authentication/RegisterView.vue'
import HomePageView from '@/components/HomePageView.vue'
import AboutPage from '@/components/views/AboutPage.vue'
import HelpPostView from '@/components/views/HelpPostView.vue'
import JoinUsView from '@/components/views/JoinUsView.vue'
import LearningFormView from '@/components/views/LearningFormView.vue'
import SponsorsPage from '@/components/views/SponsorsPage.vue'
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
