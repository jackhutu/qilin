import { fetchPost } from '../api/post'

export default {
  name: 'tests',
  state: {
    list: []
  },
  actions: {},
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
