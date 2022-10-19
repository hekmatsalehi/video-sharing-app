import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const CommentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

function Comment({ comment }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`/users/find/${comment.userId}`);
        setUserInfo(response.data);
      } catch (error) {}
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={userInfo.image} />
      <CommentDetails>
        <Name>
          {userInfo.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.description}</Text>
      </CommentDetails>
    </Container>
  );
}

export default Comment;
