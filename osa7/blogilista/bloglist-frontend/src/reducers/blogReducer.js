import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        pushBlog(state, action) {
            return state.concat(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            return state.map((blog) =>
                blog.id === action.payload.id
                    ? { ...blog, likes: action.payload.blog.likes }
                    : blog
            )
        },
        deleteBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
    },
})

export const { pushBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions

export const createNewBlog = (token, content, name, username) => {
    return async (dispatch) => {
        const nBlog = await blogs.createBlog(token, content)
        nBlog.user = { name, username }
        dispatch(pushBlog(nBlog))
    }
}

export const getAllBlogs = () => {
    return async (dispatch) => {
        const allBlogs = await blogs.getAll()
        dispatch(setBlogs(allBlogs))
    }
}

export const voteBlog = (token, id, blog) => {
    return async (dispatch) => {
        const res = await blogs.updateBlog(token, id, blog)
        dispatch(updateBlog({ id, blog: res }))
    }
}

export const removeBlog = (token, id) => {
    return async (dispatch) => {
        await blogs.deleteBlog(token, id)
        dispatch(deleteBlog(id))
    }
}

export default blogSlice.reducer
