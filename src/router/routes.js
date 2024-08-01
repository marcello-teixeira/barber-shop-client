const routes = [
  {
    // path: '/',
    //component: () => import('src/layouts/InitialLayout.vue'),
    // children: [
    //   {path: 'home', component: () => import('src/pages/HomePage.vue')},
    //   { path: 'login', component: () => import('src/pages/LoginPage.vue') }
    // ]
    path: '/',
    component: () => import('src/layouts/ClientView.vue'),
      children: [
        {path: 'customer' ,component: () => import('src/pages/CustomerPage.vue')},
        {path: '', component: ()=> import('src/pages/CompanyPage.vue')}
      ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
