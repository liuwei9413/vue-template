const TransactionRecords = r => require.ensure([], () => r(require('./TransactionRecords.vue')))

const RecordsRoutes = [
  {
    name: 'TransactionRecords',
    path: '/records',
    component: TransactionRecords
  }
]

export default RecordsRoutes
