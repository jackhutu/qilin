import qilin from 'qilin'
import posts from './posts'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'

export const history = createBrowserHistory()

export const Qilin = new qilin({
  middlewares: [routerMiddleware(history)],
  initialReducer: {
    router: connectRouter(history)
  }
})

Qilin.addModule(posts)

const store = Qilin.createStore()

export default store
