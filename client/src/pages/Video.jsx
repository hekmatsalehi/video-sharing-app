import React from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import {
  PlaylistAdd,
  ReplyOutlined,
  ThumbDown,
  ThumbDownAltOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import VideoCard from "../components/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { fetchFailure, fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js";
import { like, dislike } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

const Butttons = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  gap: 20px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommedation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const ChannelDesc = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: whitesmoke;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 5px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  background-color: #999;
`

function Video() {
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await axios.get(`/videos/find/${path}`);
        const channelResponse = await axios.get(
          `/users/find/${videoResponse.data.userId}`
        );
        setChannel(channelResponse.data);
        dispatch(fetchSuccess(videoResponse.data));
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDisike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    // make api call based on the channel subscription
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src="https://www.youtube.com/embed/nImK2qsYoFM"/>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views &#8226; {format(currentVideo.createdAt)}
          </Info>
          <Butttons>
            <Button onClick={handleLike}>
              {currentVideo.likes.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpAltOutlined />
              )}{" "}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDisike}>
              {currentVideo.dislikes.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownAltOutlined />
              )}{" "}
              DISLIKE
            </Button>
            <Button>
              <ReplyOutlined /> SHARE
            </Button>
            <Button>
              <PlaylistAdd /> SAVE
            </Button>
          </Butttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.image} />
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <ChannelDesc>{currentVideo.description}</ChannelDesc>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe>
            <Button onClick={handleSubscribe}>
              {currentUser.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Button>
          </Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommedation>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
        <VideoCard type="small"/>
      </Recommedation> */}
    </Container>
  );
}

export default Video;
