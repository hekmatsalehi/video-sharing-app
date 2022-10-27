import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 5px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-fit: cover;
`;
const Input = styled.input`
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // const fetchComments = async () => {
    //   try {
    //     const response = await axios.get(`/comments/${videoId}`)
    //     setComments(response.data)
    //   } catch (error) {
    //   }
    // }
    // fetchComments()
    axios
      .get(`/comments/${videoId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.image} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
