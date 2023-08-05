const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    const listWithThreeBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: "896asa88g7b7sd9987asd76weeqw67",
            title: "Guitar, the sky and the stars",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        },
        {
            _id: "82d89as7db87cv89asd656897s9d8a",
            title: "On the edge of the milkyway",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 200000,
            __v: 0
        }
    ]

    test('when list has three blogs likes equal the sum of the likes', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(500005)
      })

  })