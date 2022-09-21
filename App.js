import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Comments from "./pages/Comments";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/posts/add" element={<Post />}></Route>
        <Route path="/posts/:id" element={<Post />}>
          <Route path="/posts/:id/comments" element={<Comments />}></Route>
        </Route>
        <Route path="/posts/:id/edit" element={<Post />}></Route>
        <Route path="*" element={<h2>Not found!</h2>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
