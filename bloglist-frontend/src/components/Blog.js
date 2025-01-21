import { useState } from 'react'
const Blog = ({ blog, handleLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setLabel] = useState('view')
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    visible? setLabel('view') : setLabel('cancel')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button id="blogView" onClick={toggleVisibility}>{buttonLabel}</button>

      <div style={showWhenVisible} className='blogDetails'>
        {blog.url}<br/>
        {blog.likes} <button id="blogLike" onClick={() => handleLikes(blog)}>like</button><br/>
        {blog.userId.username}<br/>
        <button id="blogDelete" onClick={() => deleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  )
}

export default Blog