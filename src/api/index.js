import axios from 'axios'

const API= axios.create({baseURL:'http://localhost:8000/'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPost=(page)=>API.get(`/posts?page=${page}`)

export const fetchPostD=(id)=>API.get(`/posts/${id}`)

export const createPost=(newPost)=>API.post('/posts',newPost);

export const updatePost=(id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost)

export const deletePost=(id)=>API.patch(`/posts/${id}`);

export const likePost=(id)=> API.patch(`/posts/${id}/likepost`)

export const signIn=(formData)=>API.post('/user/signin',formData)

export const signUp=(formData)=>API.post('/user/signup',formData)

export const fetchPostBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)