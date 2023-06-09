import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { TextField,Button,Paper,Typography } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { createPost,updatePost } from '../../actions/posts'; 

function Form({currentId,setCurrentId}) {
    const [postData,setPostData]=useState({
      title:"",
      message:"",
      tags:"",
      selectedFile:""
    })
    console.log(currentId)
    const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null)
    const dispatch=useDispatch();
    const classes=useStyles();
    const user=JSON.parse(localStorage.getItem('profile'));
    useEffect(()=>{
      if(post) setPostData(post);
    },[post])
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(currentId!==null){
        dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
      }
      else{
      dispatch(createPost({...postData,name:user?.result?.name}));
      }
    }
    const clear=()=>{
      setCurrentId(0);
      setPostData({      
      title:"",
      message:"",
      tags:"",
      selectedFile:""})
    }

    if(!user?.result?.name){
      return (
        <Paper className={classes.paper}>
          <Typography varient="h6" align="center">
            Please Sign In to create your own memories and like other's memories
          </Typography>
        </Paper>
      )
    }
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography varient="h6">Creating a Memory</Typography>
        <TextField name="title" varient="outlined" label="Title"  fullWidth value={postData.title} onChange={(e)=>{setPostData({...postData,title:e.target.value})}}/>
        <TextField name="message" varient="outlined" label="Message"  fullWidth value={postData.message} onChange={(e)=>{setPostData({...postData,message:e.target.value})}}/>
        <TextField name="tags" varient="outlined" label="Tags"  fullWidth value={postData.tags} onChange={(e)=>{setPostData({...postData,tags:e.target.value.split(",")})}}/>
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