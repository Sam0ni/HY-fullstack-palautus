import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/login";
import { useApolloClient, useQuery } from "@apollo/client";
import Recommend from "./components/recommend";
import { FAVORITE_GENRE } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-token"))
  const client = useApolloClient()

  let favouriteGenre = null
  let genres = null
  if (token) {
    const result = useQuery(FAVORITE_GENRE)
    if (result.loading) {
        return <div>Still loading...</div>
        }
    favouriteGenre = result.data.me.favoriteGenre
    genres = result.data.allBooks
    let allGenres = []
    genres.forEach(b => {
      allGenres = allGenres.concat(b.genres)
    });
    genres = [...new Set(allGenres)]
  }

  const hideOrShow = {display: token ? "" : "none"}
  const ShowOrHide = {display: token ? "none" : ""}

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")} style={hideOrShow}>add book</button>
        <button onClick={() => setPage("recommend")} style={hideOrShow}>recommendations</button>
        <button onClick={() => setPage("login")} style={ShowOrHide}>login</button>
        <button onClick={logout} style={hideOrShow}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} genres={genres}/>

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recommend show={page === "recommend"} genre={favouriteGenre}/>
    </div>
  );
};

export default App;
