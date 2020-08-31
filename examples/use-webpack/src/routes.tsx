/* eslint-disable react/display-name */
import React from 'react'
import { Redirect } from 'react-router'
import PostsHooks from './pages/PostsHooks'
import Posts from './pages/Posts'

const routes: any[] = [
  {
    path: '/posts',
    component: Posts
  },
  {
    path: '/posthooks',
    component: PostsHooks
  },
  {
    path: '*',
    component: () => <Redirect push to="/posts" />
  }
]

export default routes
