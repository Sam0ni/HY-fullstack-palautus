import { useState } from "react"

const CreateBlog = (props) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = async (event) => {
        event.preventDefault()
        const blog = {
            title,
            author,
            url
        }
        const resp = await props.handleCreation(blog)
        if (resp) {
            setAuthor("")
            setTitle("")
            setUrl("")
        }
    }


    return(
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={addBlog}>
                <div>
          title:
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Write title here"
                    />
                </div>
                <div>
          author:
                    <input
                        type='text'
                        value={author}
                        name="Author"
                        onChange={(event) => setAuthor(event.target.value)}
                        placeholder="Write author here"
                    />
                </div>
                <div>
          url:
                    <input
                        type='text'
                        value={url}
                        name='URL'
                        onChange={(event) => setUrl(event.target.value)}
                        placeholder="Write url here"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlog