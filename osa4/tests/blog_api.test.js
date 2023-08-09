const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require ("../app")
const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "Guitar, the sky and the stars",
        author: "Edward Normal",
        url: "www.eppunormaali.fi",
        likes: 300000
    },
    {
        title: "On the edge of the milkyway",
        author: "Edward Normal",
        url: "www.eppunormaali.fi",
        likes: 200000
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', url: "www.willremove.soon" })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}
describe("3 Blogs initially in db", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })
    describe("get method", () => {
        
        test("right amount of blogs are returned", async () => {
            const response = await api.get("/api/blogs")
            expect(response.body).toHaveLength(initialBlogs.length)
        })
        
        test("Object identification field is id not _id", async () => {
            const response = await api.get("/api/blogs")
            expect(response.body[0].id).toBeDefined()
        }) 
    })

    describe("post method", () => {


        test("Added blog is saved", async () => {
            const newBlog =
            {
                title: "All Of Me",
                author: "Masayoshi Takanaka",
                url: "takanaka.co.jp",
                likes: 1000000
            }
            await api
            .post("/api/blogs")
            .send(newBlog)
        
            const response = await api.get("/api/blogs")
            expect(response.body).toHaveLength(initialBlogs.length + 1)
        
            const blogTitles = response.body.map(r => r.title)
            expect(blogTitles).toContain("All Of Me")
        })
        
        test("if likes are undefined, they are given value 0", async () => {
            const newBlog =
            {
                title: "My first blog",
                url: "randomdomain.com",
                author: "Noname"
            }
        
            const response = await api
            .post("/api/blogs")
            .send(newBlog)
        
            expect(response.body.likes).toBe(0)
        })
        
        test("if blog does not contain field for title, response is status 400", async () => {
            const newBlog =
            {
                url: "ymo.co.jp",
                author: "Yellow Magic Orchestra"
            }
        
            await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
        })
        
        test("if blog does not contain field for url, response is status 400", async () => {
            const newBlog =
            {
                title: "BGM",
                author: "Yellow Magic Orchestra"
            }
        
            await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
        })

    })

    describe("delete method", () => {


        test("blog is removed correctly", async () => {
            const blogID = await api.get("/api/blogs")
            await api
            .delete(`/api/blogs/${blogID.body[0].id}`)
            .expect(204)
        
            const result = await api.get("/api/blogs")
            expect(result.body).toHaveLength(initialBlogs.length - 1)
        })
        
        test("get status 400 when trying to delete with invalid id", async () => {
            await api
            .delete("/api/blogs/ssdasa677856764598asd")
            .expect(400)
        })
        
        test("get status 204 when deleting with valid nonexistent id", async () => {
            const validID = await nonExistingId()
            await api
            .delete(`/api/blogs/${validID}`)
            .expect(204)
        })
    })

    describe("put method", () => {
        test("succesfully update blog", async () => {
            const newBlog =
            {
                title: "All Of Me",
                author: "Masayoshi Takanaka",
                url: "takanaka.co.jp",
                likes: 1000000
            }
            const blog = await api
            .post("/api/blogs")
            .send(newBlog)
            
            updatedBlog =
            {
                title: "All Of Me",
                author: "Masayoshi Takanaka",
                url: "takanaka.co.jp",
                likes: 1200000
            }
        
            await api
            .put(`/api/blogs/${blog.body.id}`)
            .send(updatedBlog)
            
            const result = await api.get("/api/blogs")
            expect(result.body[3].likes).toBe(1200000)
        })

        test("get status 400 when trying to update with invalid id", async () => {
            updatedBlog =
            {
                title: "All Of Me",
                author: "Masayoshi Takanaka",
                url: "takanaka.co.jp",
                likes: 1200000
            }
        
            await api
            .put(`/api/blogs/8321789jsadhas2831`)
            .send(updatedBlog)
            .expect(400)
        })
    })


    afterAll(async () => {
        await mongoose.connection.close()
    })
})