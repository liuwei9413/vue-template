let Hello = resolve => {
  require.ensure([], () => {
    resolve(require('./Hello.vue'))
  })
}
let notFoundPage = resolve => {
  require.ensure([], () => {
    resolve(require('./page_404.vue'))
  })
}
let errorPage = resolve => {
  require.ensure([], () => {
    resolve(require('./page_500.vue'))
  })
}

const DemoRoutes = [
  {
    name: 'hello',
    path: 'hello',
    component: Hello
  }, {
    name: 'notFound',
    path: 'notFound',
    component: notFoundPage
  }, {
    name: 'errorPage',
    path: 'errorPage',
    component: errorPage
  }
]

export default DemoRoutes
