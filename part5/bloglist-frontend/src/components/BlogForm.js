const BlogForm = ({ onSubmit, titleChange, authorChange, urlChange }) => (
  <>
    <h1>Create New</h1>
    <form onSubmit={onSubmit}>
      <> Title: <input className="Title" onChange={({ target }) => titleChange(target.value)} /><br/></>
      <> Author: <input className="Author" onChange={({ target }) => authorChange(target.value)} /><br/></>
      <> url: <input className="Url" onChange={({ target }) => urlChange(target.value)} /><br/></>
      <button type="submit" id="createBlog">create</button>
    </form>
  </>
)

export default BlogForm