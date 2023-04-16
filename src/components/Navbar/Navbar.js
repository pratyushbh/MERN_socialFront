import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import useStyle from './styles'
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import decode from 'jwt-decode';

function Navbar() {
    const classes=useStyle();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch()
    const history=useHistory()
    const location=useLocation();
    console.log(user);

    useEffect(()=>{
        const token=user?.token;
        if(token) {
            const decodedToken=decode(token)

            if(decodedToken.exp * 1000< new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    const logout=()=>{
        dispatch({type:LOGOUT});
        history.push('/');
        setUser(null);
    }
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to="/" className={classes.brandContainer}>
            <img className={classes.image} src={memoriesText} alt="icon" height="45px"/>
            <img className={classes.image} src={memoriesLogo} alt="icon" height="40px"/>
        </Link>
        <Toolbar className={classes.toolbar}>
            {(user)?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
                        <Button varient="contained" className={classes.logout} color="secondary" onClick={logout}>LogOut</Button>
                    </div>
            ):(
                    <div className={classes.profile}>
                        <Button component={Link} to="/auth" varient="contained"  color="primary">Login</Button>
                    </div>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar