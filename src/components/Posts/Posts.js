import React, { useEffect } from 'react'
import Post from './Post/Post'
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles'
import { useSelector } from 'react-redux';


function Posts({setCurrentId}) {
  const {posts,isLoading}=useSelector((state)=>state.posts)
  console.log(posts);
  useEffect(()=>{
    console.log(posts);
  },[posts])
  const classes=useStyles();
  if(!posts.length && !isLoading) return 'No Posts'
  return (
    isLoading? <CircularProgress/>:(
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post)=>{return(
            <Grid key={post._id} item xs={12} sm={12} med={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          )})}
      </Grid>
    )
  )
}

export default Posts