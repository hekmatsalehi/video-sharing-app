import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from 'timeago.js';
import axios from "axios"

const Container = styled.div`
  width: ${(props) => props.type === "small" ? "280px" : "360px"};
  margin-bottom: ${(props) => props.type === "small" ? "16px" : "32px"};
  display: ${(props) => props.type === "small" && "flex"};
  gap: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: ${(props) => props.type === "small" ? "160px" : "100%"};
  height: ${(props) => props.type === "small" ? "110px" : "202px"};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "small" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "small" && "none"};
  object-fit: cover;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin: 4px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
`;

function VideoCard({type, video}) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get(`/users/find/${video.userId}`);
      setUserInfo(response.data)
    }
    fetchUserInfo()
  }, [video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      {/* use props for small size of videoCard */}
      <Container type={type}>
        <Image type={type} src={video.imageUrl} />
        <Details type={type}>
          <ChannelLogo type={type} src={userInfo.image} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{userInfo.name}</ChannelName>
            <Info>{video.views} views &#8226; {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default VideoCard;
