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

let Dashboard = resolve => {
  require.ensure([], () => {
    resolve(require('./Dashboard.vue'))
  })
}

let eleDemo = resolve => {
  require.ensure([], () => {
    resolve(require('./element-theme-demo.vue'))
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
  }, {
    name: 'eledemo',
    path: 'eledemo',
    component: eleDemo
  }, {
    name: 'dashboard',
    path: 'dashboard',
    component: Dashboard
  }
]

export default DemoRoutes
