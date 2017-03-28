let Hello = resolve => {
  require.ensure([], () => {
    resolve(require('./Hello.vue'))
  })
}

const DemoRoutes = {
  path: 'hello',
  name: 'Hello',
  component: Hello
}

export default DemoRoutes
