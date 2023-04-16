import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button,Typography,ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbDownAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost,likePost } from '../../../actions/posts';
const Post = ({post,setCurrentId}) => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      else{
        return (<><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>)
      }
    }
    const openPost = (e) => {
      // dispatch(getPost(post._id, history));
  
      history.push(`/posts/${post._id}`);
    };
  return (
    <Card className={classes.card} raised elevation={6}>
            <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography varient="h6">{post.name}</Typography>
        <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId===post?.creator||user?.result?._id==post?.creator) && (
        
      <div className={classes.overlay2}>
        <Button style={{color:"White"}} size="small" onClick={()=>setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='default'/>
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography varient="body2" color="textSecondary">{post.tags.map((tag)=>{return(`#${tag} `)})}</Typography>
      </div>
      <CardContent>
      <Typography className={classes.title} varient="body1" gutterBottom>{post.title}</Typography>
      <Typography className={classes.title} varient="body2" color='textSecondary' component="p">{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}> 
          <Likes/>
        </Button>
        {(user?.result?.googleId===post?.creator||user?.result?._id==post?.creator) && (
        <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
          <DeleteIcon size="small"/>
          Delete
        </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post