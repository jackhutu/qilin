import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import PostsHooks from './pages/PostsHooks'
import Posts from './pages/Posts'
import store from './modules'

const App = () => {
  return (
    <Provider store={store}>
      <PostsHooks />
      <Posts />
    </Provider>
  )
}

render(<App />, document.querySelector('#root'))
