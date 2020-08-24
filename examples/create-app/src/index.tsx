import React from 'react'
import { render } from 'react-dom'
import styles from './index.less'

const App = () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  )
}

render(<App />, document.getElementById('root'))
