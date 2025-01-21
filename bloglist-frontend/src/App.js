import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/logins'
import styles from './components/Styles'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()
  const [likedBlog, setLikes] = useState(null)
  const [removeBlog, setDeleteId] = useState(null)
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [userToken, setToken] = useState(null)
  const [notification, setMessage] = useState(null)
  const [msgStyle, setMessageColor] = useState(false)
  const blogFormRef = useRef()

  const addBlog = async(e) => {
    e.preventDefault()
    let newBlog = { title: title, author: author, url: url }
    try {
      await blogService.create(newBlog)
      setMessage(`a new blog ${title} by ${author} added`)
      setMessageColor(true)
      blogService.getAll().then(blogs => {
        let registeredBlogs = blogs.filter(blog => blog.userId !== undefined)
        registeredBlogs.sort((a,b) => b.likes - a.likes)
        setBlogs( registeredBlogs )
      })
      blogFormRef.current.toggleVisibility()
    }
    catch(exception){
      if(exception.message === 'Request failed with status code 401'){
        setMessage('session expired, please log in again')
        setMessageColor(false)
        logout()
      }
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const authorization = await loginService.login( { username, password } )
      setToken(authorization)
      setUser('')
      setPassword('')
      setMessage(null)
      blogService.setToken(authorization.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(authorization))
    } catch(exception) {
      setMessage('Wrong username or password')
      setMessageColor(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setToken(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user)
      blogService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs => {
      let registeredBlogs = blogs.filter(blog => blog.userId !== undefined)
      registeredBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs( registeredBlogs )
    }
    )
  }, [])
  useEffect(() => {
    async function updateLike (){
      likedBlog.likes++
      try{
        await blogService.update(likedBlog.id, likedBlog)
        setLikes(null)
        blogService.getAll().then(blogs => {
          let registeredBlogs = blogs.filter(blog => blog.userId !== undefined)
          registeredBlogs.sort((a,b) => b.likes - a.likes)
          setBlogs( registeredBlogs )
        })
      } catch(exception) {
        if(exception.message === 'Request failed with status code 401'){
          setMessage('session expired, please log in again')
          setMessageColor(false)
          logout()
        }
      }
    }
    if(likedBlog!== null) updateLike()
  },[likedBlog])
  useEffect(() => {
    async function deleteBlog (){
      try{
        await blogService.remove(removeBlog)
        setDeleteId(null)
        blogService.getAll().then(blogs => {
          let registeredBlogs = blogs.filter(blog => blog.userId !== undefined)
          registeredBlogs.sort((a,b) => b.likes - a.likes)
          setBlogs( registeredBlogs )
        })
      } catch(exception) {
        if(exception.message === 'Request failed with status code 401'){
          setMessage('session expired, please log in again')
          setMessageColor(false)
          logout()
        }
      }
    }
    if(removeBlog!== null) {
      if (window.confirm('Do you really want to delete?')) {
        deleteBlog()
      }
      else{setDeleteId(null)}
    }
  },[removeBlog])

  return (
    <>
      {
        userToken === null ?
          <LoginForm msg={notification} onSubmit={handleLogin} userChange={setUser} passwordChange={setPassword} />
          :
          <>
            <h2>My Blogs</h2>
            {notification !== null? <h2 style={msgStyle? styles.success : styles.error}>{notification}</h2> : null}
            <>{userToken.name} logged-in <button onClick={logout}>logout</button> </>
            {blogs.map(blog => blog.userId.username === userToken.username? < Blog blog={blog} handleLikes={setLikes} deleteBlog={setDeleteId} key={blog.id}/> : null)}
            <Togglable buttonLabel='create' cancelLabel="cancel" ref={blogFormRef}>
              <BlogForm onSubmit={addBlog} titleChange={setTitle} authorChange={setAuthor} urlChange={setUrl} />
            </Togglable>
          </>
      }
    </>
  )

}

export default App
