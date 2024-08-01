const routes = [
  {
    path: '/login',
    component: () => import('src/layouts/InitialLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') }
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
