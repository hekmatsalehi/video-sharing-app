import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideoCard from '../components/VideoCard';
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
`;

function Home({type}) {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/${type}`);
      setVideos(response.data)
    }
    fetchVideos()
  }, [type])
  return (
    <Container>
        {videos?.map((video) => (
         <VideoCard key={video._id} video={video}/> 
        ))}
    </Container>
  )
}

export default Home