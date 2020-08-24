import qilin from 'qilin'
import posts from './posts'
export const Qilin = new qilin()

Qilin.addModule(posts)

const store = Qilin.createStore()

export default store
