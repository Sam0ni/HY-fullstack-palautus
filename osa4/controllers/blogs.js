const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")


blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {username: 1, name: 1})
  response.json(allBlogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const user = await User.find({})
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user[0]._id
  })
  try {
    const result = await blog.save()
    user[0].blogs = user[0].blogs.concat(result._id)
    await user[0].save()
    response.status(201).json(result)
  } catch(exception) {
    response.status(400).json({ error: exception.message })
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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