import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Comments() {
  const [comments, setcomments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/posts/${id}/comments`);
      setcomments(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>
          <b>{c.email}</b> {c.body}
        </li>
      ))}
    </ul>
  );
}
