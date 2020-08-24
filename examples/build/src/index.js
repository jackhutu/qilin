import './index.css'
import styles from './index.less'

window.addEventListener('load', function() {
  const target = document.querySelector('#root')
  target.classList.add(styles.modules)
  target.innerHTML = `Success!`
})
