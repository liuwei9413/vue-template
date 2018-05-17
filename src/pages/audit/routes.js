const AuditAndBroadcast = r => require.ensure([], () => r(require('./AuditAndBroadcast.vue')))

const AuditAndBroadcastRoutes = [
  {
    name: 'AuditAndBroadcast',
    path: '/audit',
    component: AuditAndBroadcast
  }
]

export default AuditAndBroadcastRoutes
