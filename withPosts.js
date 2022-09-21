import { useEffect, useState } from "react";
import axios from "axios";

export default function withPost(Comp) {
  function NewComp() {
    const [posts, setposts] = useState([]);

    function deletePost(id) {
      setposts(posts.filter((p) => p.id !== id));
      axios.delete(`/posts/${id}`).then((res) => console.log(res));
    }

    useEffect(() => {
      async function fetchPosts() {
        const res = await axios.get("/posts/");
        setposts(res.data);
      }
      fetchPosts();
    }, []);

    return <Comp posts={posts} deletePost={deletePost} />;
  }

  return NewComp;
}
