import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "small" && "360px"};
  margin-bottom: ${(props) => props.type === "small" ? "16px" : "32px"};
  cursor: pointer;
  display: ${(props) => props.type === "small" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
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
  display: ${(props) => props.type === "small" && "none"};
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

function VideoCard({type}) {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      {/* use props for small size of videoCard */}
      <Container type={type}>
        <Image type={type} src="https://media.istockphoto.com/photos/sedona-at-sunset-view-from-the-chapel-of-the-holy-cross-picture-id1189914900?b=1&k=20&m=1189914900&s=170667a&w=0&h=_s7aDdI6D051ms57xJdlXkYliDlWJoTl8znCtEZYbvU=" />
        <Details type={type}>
          <ChannelLogo type={type} src="https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsJTIwcGxhbmV0JTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Animal Planet</ChannelName>
            <Info>799,222 views &#8226; 2 days ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default VideoCard;
