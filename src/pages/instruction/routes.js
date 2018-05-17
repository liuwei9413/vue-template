const Instruction = r => require.ensure([], () => r(require('./Instruction.vue')))

const InstructionRoutes = [
  {
    name: 'Instruction',
    path: '/instruction',
    component: Instruction
  }
]

export default InstructionRoutes
