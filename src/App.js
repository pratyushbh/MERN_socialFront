import React,{useState, useEffect} from 'react';  
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core'
import memories from './images/memories.png';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts';
import Form from './components/Forms/Form';
import useStyles from './styles'
import { getPost } from './actions/posts';

function App() {
  const [currentId,setCurrentId]=useState(null);
  const classes=useStyles();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPost());
  },[dispatch])
  return (
    <Container maxWidth="lg">
      <AppBar position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60"/>
      </AppBar>
        <Grow in>
          <Container>
            <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
    </Container>
  );
}

export default App;
