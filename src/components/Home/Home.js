import React,{useState, useEffect} from 'react'; 
import {Container,Grow,Grid, Paper,AppBar,TextField,Button} from '@material-ui/core'
import Posts from '../Posts/Posts';
import Paginate from '../Pagination';
import useStyles from './styles'
import ChipInput from 'material-ui-chip-input'
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getPost,getPostBySearch } from '../../actions/posts';
import Form from '../Forms/Form';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const query=useQuery();
    const history=useHistory();
    const dispatch=useDispatch();
    const page=query.get('page') || 1;
    const [search,setSearch]=useState("");
    const [tags,setTags]=useState([]);
    const searchQuery=query.get('searchQuery')
    

    const handleKeyPress=(e)=>{
      if(e.keycode===13){
        searchPost()
      }
    }
    const searchPost=()=>{
      if(search.trim()||tags){
          dispatch(getPostBySearch({search,tags: tags.join(',')}))
          history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`)
        }
      else{
        history.push("/")
      }
    }
    const handleAdd=(tag)=>{
      setTags([...tags,tag]);
    }
    const handleDelete=(tagToDelete)=>{
      setTags(tags.filter((tag)=>tag!==tagToDelete))
    }
  return (
    <Grow in>
          <Container maxWidth="xl">
            <Grid container className={classes.gridContainer} justify='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inheririt">
                    <TextField 
                    name="search"
                    varient="outlined" 
                    onKeyPress={handleKeyPress}
                    label="Search memories" 
                    fullWidth 
                    value={search} 
                    onChange={(e)=>{setSearch(e.target.value)}}/>
                  <ChipInput
                    style={{margin:'10px 0'}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined"
                  />
                  <Button onClick={searchPost} varient="contained" className={classes.searchButton} color="primary">Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                <Paper elevation={6}>
                    <Paginate page={page}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Grow>
  )
}

export default Home