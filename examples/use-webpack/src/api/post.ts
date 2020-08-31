import axios from 'axios'
const PAGE_SIZE = 10
const baseUrl = 'https://jsonplaceholder.typicode.com'

export function fetchPost({ page = 1 }) {
  return new Promise(function(resolve, reject) {
    axios
      .get(baseUrl + `/posts?_page=${page}&_limit=${PAGE_SIZE}`)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
