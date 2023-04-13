import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { TextField,Button,Paper,Typography } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { createPost,updatePost } from '../../actions/posts'; 

function Form({currentId,setCurrentId}) {
    const [postData,setPostData]=useState({
      creator:"",
      title:"",
      message:"",
      tags:"",
      selectedFile:""
    })
    console.log(currentId)
    const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null)
    const dispatch=useDispatch();
    const classes=useStyles();
    useEffect(()=>{
      if(post) setPostData(post);
    },[post])
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(currentId){
        dispatch(updatePost(currentId,postData));
      }
      dispatch(createPost(postData));
    }
    const clear=()=>{}
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography varient="h6">Creating a Memory</Typography>
        <TextField name="creator" varient="outlined" label="Creator"  fullWidth value={postData.creator} onChange={(e)=>{setPostData({...postData,creator:e.target.value})}}/>
        <TextField name="title" varient="outlined" label="Title"  fullWidth value={postData.title} onChange={(e)=>{setPostData({...postData,title:e.target.value})}}/>
        <TextField name="message" varient="outlined" label="Message"  fullWidth value={postData.message} onChange={(e)=>{setPostData({...postData,message:e.target.value})}}/>
        <TextField name="tags" varient="outlined" label="Tags"  fullWidth value={postData.tags} onChange={(e)=>{setPostData({...postData,tags:e.target.value})}}/>
        <div className={classes.fileInput}>
            <FileBase 
              type="file"
              multiple={false}
              onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
            />
        </div>
        <Button className={classes.Button} varient="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button varient="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form