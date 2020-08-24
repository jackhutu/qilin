import Qilin from '../src/index'

describe('qilin', () => {
  it('测试qilin入口', () => {
    const qilin = new Qilin('world')
    expect(qilin.say()).toBe('Qilin, World')
  })
})
