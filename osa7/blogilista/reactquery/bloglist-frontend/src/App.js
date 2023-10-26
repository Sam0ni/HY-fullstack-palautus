import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/BlogForm";
import blogService from "./services/blogs";
import login from "./services/login";
import { useNotif, useNotifVal } from "./notificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Login = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            onChange={handleUsernameChange}
            value={username}
            name="Username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

const Blogs = ({
  blogs,
  username,
  handleLogout,
  handleUpdate,
  handleDeletion,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        Logged in as {username}
        <button onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleUpdate}
          username={username}
          handleDeletion={handleDeletion}
        />
      ))}
    </div>
  );
};

const Notifications = () => {
  const notification = useNotifVal();
  return <div className="notif">{notification}</div>;
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const blogFormRef = useRef();

  const notify = useNotif();

  useEffect(() => {
    const localUser = window.localStorage.getItem("loggedUser");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) {
    return <div>Still Loading...</div>;
  }

  const blogs = result.data;

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await login.login({
        username: username,
        password: password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(token));
      setUsername("");
      setPassword("");
      setUser(token);
      notify("You Have Logged In!");
    } catch (exception) {
      notify(exception.response.data.error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    notify("You Have Logged Out!");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCreation = async (newBlog) => {
    try {
      newBlogMutation.mutate(newBlog);
      console.log("AAAAAAAAAAAAAAAAAAAh");
      notify(`${response.title} Was Added!`);
      blogFormRef.current.toggleVisibility();
      return true;
    } catch (exception) {
      notify(exception.response.data.error);
      return false;
    }
  };

  const handleUpdate = async (blog, id) => {
    await blogService.updateBlog(user.token, id, blog);
    const updatedBlogs = [...blogs];
    const indx = updatedBlogs.findIndex((blog) => blog.id === id);
    updatedBlogs[indx].likes += 1;
  };

  const handleDeletion = async (id, title) => {
    if (window.confirm(`Do you wish to delete ${title} ?`)) {
      await blogService.deleteBlog(user.token, id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    }
  };

  const sortBlogs = (blogs) => {
    const sorted = [...blogs];
    sorted.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      } else if (a.likes < b.likes) {
        return 1;
      } else {
        return 0;
      }
    });
    return sorted;
  };

  const sortedBlogs = sortBlogs(blogs);

  const loginForm = () => {
    return (
      <Login
        handleLogin={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    );
  };

  const blogsRender = () => {
    return (
      <div>
        <Blogs
          blogs={sortedBlogs}
          username={user.username}
          handleLogout={handleLogout}
          handleUpdate={handleUpdate}
          handleDeletion={handleDeletion}
        />
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <CreateBlog handleCreation={handleCreation} />
        </Togglable>
      </div>
    );
  };

  return (
    <div>
      <Notifications />
      {!user && loginForm()}
      {user && blogsRender()}
    </div>
  );
};

export default App;
