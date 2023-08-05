const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce(((sum, currentVal) => sum + currentVal.likes), 0)
}

  module.exports = {
    dummy,
    totalLikes
  }