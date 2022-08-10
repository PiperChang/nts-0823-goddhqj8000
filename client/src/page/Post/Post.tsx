import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../../component/Post/CommentSection";

export default function Post() {
  const param = useParams();
  const post_Id = (param.post_id !== undefined)? parseInt(param.post_id) : 0

  const [postData, setPostData] = useState({
    title: "",
    writer: "",
    reg_date: "",
    content: "",
    comment_cnt: 0,
    view_cnt: 0,
    like_cnt: 0,
  });

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
        params: {
          post_id: param.post_id,
        },
      })
      .then((res) => {
        setPostData({
          ...res.data,
        });
      });
  }, []);
  console.log(postData);


  return (
    <div>
      <h1>{postData.title}</h1>
      <div>
        <div> {postData.content}</div>
        {postData.reg_date}
        <div>
          {/* 댓글 작성 부 */}
          댓글 쓰기
          <CommentSection postId={post_Id} />
          </div>
          <ul>
            {/* 이것도 버튼이랑 */}
            각 댓글 보이기 + 각 댓글에 댓글 달기 버튼
          </ul>

        </div>
      </div>
  );
}
