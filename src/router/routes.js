const routes = [
  {
    path: '/view',
    component: () => import('src/layouts/ClientView.vue'),
      children: [
        {path: 'customer' ,component: () => import('src/pages/CustomerPage.vue'), meta: {title: '| Customer'}},
        {path: 'company', component: ()=> import('src/pages/CompanyPage.vue'), meta: {title: '| Company'}},
        {path: 'support', component: () => import('src/pages/SupportPage.vue'), meta: {title: '| Support'}},
        {path: 'settings', component: () => import('src/pages/SettingsPage.vue'), meta: {title: '| Settings'}}
      ]
  },
  {
    path: '/',
    component: () => import('src/layouts/InitialLayout.vue'),
    children: [
      {path: '', component: () => import('src/pages/HomePage.vue'), meta: {title: '| Home'}},
      { path: 'login', component: () => import('src/pages/LoginPage.vue'), meta: {title: '| Login'} },
      { path: 'register', component: () => import('src/pages/RegisterPage.vue'), meta: {title: '| Register'} },
      {path: 'support', component: () => import('src/pages/SupportPage.vue'), meta: {title: '| Support'}}
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/:ErrorFailLogin',
    component: () => import('pages/ErrorFailLogin.vue')
  }
]

export default routes
