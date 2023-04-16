import React,{useState} from 'react'
import { Avatar,Button,Grid,Paper,Typography,Container,TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Icon from './icon';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useStyles from './styles'
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import Input from './Input'
import jwt_decode from 'jwt-decode'
import {signin,signup} from '../../actions/auth'

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

function Auth() {
    const classes=useStyles();
    const dispatch=useDispatch();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState)
    const history=useHistory();
    const [isSignUp,setIsSignUp]=useState(false);

    const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    };

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    const switchMode=()=>{
        setIsSignUp(!isSignUp);
    }
    const googleSuccess=async (res)=>{
        console.log(res)
        const result=jwt_decode(res.credential);
        const token=res.credential
        try {
            dispatch({type:"AUTH", data:{result,token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=(error)=>{
        console.log(error)
        console.log("Google Sign in was unsuccessful.Try again later")
    }
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar classes={classes.avatar} color="primary">
                <LockOutlinedIcon/>
            </Avatar>
            <Typography varient="h5">{isSignUp?"Sign Up":"Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignUp && (
                        <>
                            <Input name="firstName" label="First Name" half handleChange={handleChange}/>
                            <Input name="lastName" label="Last Name" half  handleChange={handleChange}/>
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
                    {isSignUp && (
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                    )}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up":"Sign In"}
                    </Button>
                    <GoogleLogin 
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> 
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} >{isSignUp?"Already have an Account? Sign In":"New to this place? Sign Up"}</Button>
                        </Grid>
                    </Grid>

            </form>
        </Paper>
    </Container>
  )
}

export default Auth