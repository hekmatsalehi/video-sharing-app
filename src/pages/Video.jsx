import React from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import {PlaylistAdd, ReplyOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import VideoCard from "../components/VideoCard";

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
  color: ${({theme}) => theme.text};
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
`
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  color: ${({theme}) => theme.text};
`
const ChannelName = styled.span`
  font-weight: 500;

`
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({theme}) => theme.textSoft};
`
const ChannelDesc = styled.p`
  font-size: 14px;
`
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
`
function Video() {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/nImK2qsYoFM"
            title="Untouched Wilderness in America's Northernmost National Park - Gates of the Arctic"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>Test Video</Title>
        <Details>
          <Info>799,222 views &#8226; Apr 01 2021</Info>
          <Butttons>
            <Button><ThumbUpAltOutlined/> 234</Button>
            <Button><ThumbDownAltOutlined/> DISLIKE</Button>
            <Button><ReplyOutlined/> SHARE</Button>
            <Button><PlaylistAdd/> SAVE</Button>
          </Butttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
              <Image src="https://media.istockphoto.com/photos/galloping-wild-horses-picture-id1290560472?b=1&k=20&m=1290560472&s=170667a&w=0&h=UpuskPmK57aYwNgFBWbQqEygAITrY5lFqvfkLxcuwBc="/>
            <ChannelDetails>
              <ChannelName>Animal Planet</ChannelName>
              <ChannelCounter>2.1M subscribers</ChannelCounter>
              <ChannelDesc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nesciunt voluptatum unde nisi iusto dolorum nulla nihil fugit. Soluta ullam praesentium repudiandae accusamus, quidem aut impedit similique obcaecati quod. Quam.</ChannelDesc>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe>
            <Button>SUBSCRIBE</Button>
          </Subscribe>
        </Channel>
        <Hr/>
        <Comments/>
      </Content>
      <Recommedation>
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
      </Recommedation>
    </Container>
  );
}

export default Video;
