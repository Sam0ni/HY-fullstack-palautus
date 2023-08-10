const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {username: 1, name: 1})
  response.json(allBlogs)
})
  
blogsRouter.post('/', async (request, response) => {
  token = jwt.verify(request.token, process.env.SECRET)
  if (!token.id) {
    return response.status(401).json({ error: "invalid token" })
  }

  const user = await User.findById(token.id)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })
  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch(exception) {
    response.status(400).json({ error: exception.message })
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  try {
    token = jwt.verify(request.token, process.env.SECRET)
    if (!token.id) {
      return response.status(401).json({ error: "invalid token" })
    }
    const userId = await User.findById(token.id)
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === userId._id.toString()) {
      blog.deleteOne()
      response.status(204).end()
    } else {
      response.status(401).json({ error: "A blog can be removed only by the creator" })
    }
  } catch(exception) {
    if (exception.name === "CastError") {
    response.status(400).json({ error: exception.message })
  }
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updated)
  } catch(exception) {
    if (exception.name === "CastError") {
    response.status(400).json({ error: exception.message })
  }
  }
})

module.exports = blogsRouter