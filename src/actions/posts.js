import * as api from '../api'

import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constants/actionTypes';

export const getPost=(page)=>async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPost(page);
        dispatch({type:FETCH_ALL,payload:data});
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
} 
export const getPostD=(id)=>async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPostD(id);
        dispatch({type:FETCH_POST,payload:data});
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
} 
export const getPostBySearch=(searchQuery)=>async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data:{data}} = await api.fetchPostBySearch(searchQuery);
        dispatch({type:SEARCH,payload:data});
        dispatch({type:END_LOADING})
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
} 
export const createPost=(post)=>async(dispatch)=>{
    try {
        const data=await api.createPost(post);
        console.log(post);
        dispatch({type:CREATE,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const updatePost=(currentId,post)=>async(dispatch)=>{
    try {
        
        const data=await api.updatePost(currentId,post);
        dispatch({type:UPDATE,payload:data})
    } catch (error) {
        console.log(error)
    }
}
export const deletePost=(currentId)=>async(dispatch)=>{
    try {
        await api.deletePost(currentId);
        dispatch({type:DELETE,payload:currentId});
    } catch (error) {
        console.log(error)
    }
}

export const likePost=(currentId)=>async(dispatch)=>{
    try {
        const data=await api.likePost(currentId);

        dispatch({type:LIKE,payload:data})
    } catch (error) {
            console.log(error)
    }
}