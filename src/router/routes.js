const routes = [
  {
    path: '/view',
    component: () => import('src/layouts/CustomerView.vue'),
      children: [
        {path: 'customer' ,component: () => import('src/pages/CustomerPage.vue')},
        {path: 'company', component: ()=> import('src/pages/CompanyPage.vue')},
        {path: 'support', component: () => import('src/pages/SupportPage.vue')}
      ]
  },
  {
    path: '/',
    component: () => import('src/layouts/InitialLayout.vue'),
    children: [
      {path: '', component: () => import('src/pages/HomePage.vue')},
      { path: 'login', component: () => import('src/pages/LoginPage.vue') },
      { path: 'register', component: () => import('src/pages/RegisterPage.vue') },
      {path: 'support', component: () => import('src/pages/SupportPage.vue')}
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
