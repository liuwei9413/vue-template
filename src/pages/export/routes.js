const Export = r => require.ensure([], () => r(require('./Export.vue')))

const exportRoutes = [
  {
    name: 'Export',
    path: '/export',
    component: Export
  }
]

export default exportRoutes
