import React from 'react'
import Post from './Post/Post'
import useStyles from '../../styles'
import { useSelector } from 'react-redux';


function Posts() {
  const posts=useSelector((state)=>state.posts)
  console.log(posts)
  const classes=useStyles();
  return (
    <>
    <div>Posts</div>
    <Post/>
    <Post/>
    </>
  )
}

export default Posts