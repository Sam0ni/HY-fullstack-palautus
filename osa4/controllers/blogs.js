const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.json(allBlogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  })
  try {
    const result = await blog.save()
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

module.exports = blogsRouter