import React from 'react';  
import {Container} from '@material-ui/core'
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="933794865053-10vej2vm4lhh9lqst3c9m06l3k8etlsr.apps.googleusercontent.com">
    <BrowserRouter>
    <Container maxWidth="xl">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={()=>{return(<Redirect to="/posts"/>)}}/>
          <Route path="/posts" exact component={Home}/>
          <Route path="/posts/search" exact component={Home}/>
          <Route path="/posts/:id"  component={PostDetails}/>
          <Route path="/auth" exact component={()=>(!user ? <Auth/> : <Redirect to="/posts/"/>)}/>
        </Switch>
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
