import React from 'react'
import { TextField, Grid, InputAdornment,IconButton  } from '@material-ui/core'
import  Visibility from '@material-ui/icons/Visibility'
import Visibilityoff from '@material-ui/icons/VisibilityOff'

const Input = ({half,name,handleChange,handleShowPassword,label,autoFocus,type}) => {
  return (
    <Grid item xs={6} sm={half?6:12}>
        <TextField 
            name={name}
            onChange={handleChange}
            varient="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name==='password'?{
                endAdornment:(
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type==="password"?<Visibility/>:<Visibilityoff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
        />
    </Grid>
  )
}

export default Input