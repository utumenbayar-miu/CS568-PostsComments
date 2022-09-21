import MyHeaderTag from "../components/MyHeaderTag";
import withPost from "../hoc/withPosts";
import PostItem from "../components/PostItem";
import { Link } from "react-router-dom";
import { PrefContext } from "../context";

function Posts({ posts, deletePost }) {
  return (
    <div style={{ paddingLeft: "50px" }}>
      <MyHeaderTag headerText="Posts page"></MyHeaderTag>
      <Link to="/posts/add">Add a post</Link>
      <PrefContext.Consumer>
        {(value) => (
          <PostItem>
            {posts.map((p) => {
              const content = (
                <>
                  id: {p.id}, title: {p.title}{" "}
                  <button onClick={() => deletePost(p.id)}>delete</button>{" "}
                  <Link to={`/posts/${p.id}`}>detail</Link>{" "}
                  <Link to={`/posts/${p.id}/edit`}>edit</Link>
                </>
              );
              return value.pOrLi ? (
                <p key={p.id}>{content}</p>
              ) : (
                <li key={p.id}>{content}</li>
              );
            })}
          </PostItem>
        )}
      </PrefContext.Consumer>
    </div>
  );
}
export default withPost(Posts);
