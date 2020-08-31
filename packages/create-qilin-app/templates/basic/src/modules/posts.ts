import { fetchPost } from '../api/post'
import { QilinModule } from 'qilin'

interface PostsState {
  list: any[]
}

export interface PostsModuleType extends QilinModule {
  state: PostsState
}

const postsModule: PostsModuleType = {
  name: 'tests',
  state: {
    list: []
  },
  mutations: {
    update: (state, { payload: { list } }) => (state.list = list)
  },
  sagas: {
    *fetch({ call, put, actions: { update } }, { payload: { page } }) {
      try {
        const { data } = yield call(fetchPost, { page })
        yield put(
          update({
            list: data
          })
        )
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default postsModule
