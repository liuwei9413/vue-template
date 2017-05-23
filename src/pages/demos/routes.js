const Hello = r => require.ensure([], () => r(require('./Hello.vue')), 'demos')
const notFoundPage = r => require.ensure([], () => r(require('./page_404.vue')), 'demos')
const errorPage = r => require.ensure([], () => r(require('./page_500.vue')), 'demos')
const Dashboard = r => require.ensure([], () => r(require('./Dashboard.vue')), 'demos')

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
    name: 'dashboard',
    path: 'dashboard',
    component: Dashboard
  }
]

export default DemoRoutes
