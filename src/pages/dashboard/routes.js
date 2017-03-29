let Dashboard = resolve => {
  require.ensure([], () => {
    resolve(require('./Dashboard.vue'))
  })
}

const DashboardRoutes = {
  name: 'dashboard',
  path: 'dashboard',
  component: Dashboard
}

export default DashboardRoutes
