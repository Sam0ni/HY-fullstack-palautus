const lodash = require("lodash")

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce(((sum, currentVal) => sum + currentVal.likes), 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  });
  retFavorite = {...favorite}
  delete retFavorite._id
  delete retFavorite.__v
  delete retFavorite.url
  return retFavorite
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const counted = Object.entries(lodash.countBy(authors))
  let author = counted[0]
  counted.forEach(count => {
    if (count[1] > author[1]) {
      author = count
    }
  })
  return {
    author:author[0],
    blogs:author[1]
  }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }