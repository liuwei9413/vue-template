let Hello = resolve => {
  require.ensure([], () => {
    resolve(require('./Hello.vue'))
  })
}

const DemoRoutes = {
  name: 'hello',
  path: 'hello',
  component: Hello
}

export default DemoRoutes
