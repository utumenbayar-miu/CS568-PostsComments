import { useState, useEffect } from "react";
import axios from "axios";
import MyHeaderTag from "../components/MyHeaderTag";
import { useParams, useLocation, Outlet, Link } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  const location = useLocation();
  const [isDetail, setisDetail] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [success, setsuccess] = useState(false);
  const [post, setpost] = useState({ title: "", body: "" });

  useEffect(() => {
    async function fetchPostDetails() {
      const res = await axios.get(`/posts/${id}`);
      setisEdit(location.pathname.includes("edit"));
      setisDetail(!location.pathname.includes("edit"));
      setpost(res.data);
    }

    if (id) fetchPostDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changed(e) {
    setpost({ ...post, [e.target.name]: e.target.value });
  }

  function editPost(e) {
    e.preventDefault();
    axios
      .put("/posts/" + id, post)
      .then((res) => {
        if (res.status === 200) setsuccess(true);
      })
      .catch((err) => {
        console.error(`Error while editing a post ${err}`);
      });
  }

  function savePost(e) {
    e.preventDefault();
    axios
      .post("/posts", post)
      .then((res) => {
        if (res.status === 201) setsuccess(true);
      })
      .catch((err) => {
        console.error(`Error while saving a post ${err}`);
      });
  }

  return (
    <div style={{ paddingLeft: "50px" }}>
      <MyHeaderTag
        headerText={
          isDetail ? "Detail page" : isEdit ? "Edit page" : "Add page"
        }
      />
      <form>
        <input
          name="title"
          placeholder="title"
          onChange={(e) => changed(e)}
          value={post.title}
        />
        <input
          type="textarea"
          name="body"
          placeholder="body"
          onChange={(e) => changed(e)}
          value={post.body}
        />
        {!isDetail && !isEdit && (
          <input type="submit" value="Save post" onClick={(e) => savePost(e)} />
        )}
        {isEdit && (
          <input type="submit" value="Edit post" onClick={(e) => editPost(e)} />
        )}
      </form>
      {isDetail && (
        <>
          <Link to={`/posts/${id}/comments`}>comments</Link>
          <br />
          <Outlet />
        </>
      )}
      {success && <p style={{ color: "green" }}>Success!</p>}
    </div>
  );
}
