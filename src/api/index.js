import axios from 'axios'

const url="http://localhost:8000/posts";

export const fetchPost=()=>axios.get(url)

export const createPost=(newPost)=>axios.post(url,newPost);

export const updatePost=(id,updatedPost)=>{console.log(id);axios.patch(`${url}/${id}`,updatedPost).then((res)=>console.log(res)).catch((err)=>console.log(err))}