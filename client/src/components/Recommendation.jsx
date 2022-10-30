import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import VideoCard from './VideoCard';

const Container = styled.div`
  flex: 2;
`;

function Recommendation({tags}) {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(response.data)
        }
        fetchVideos();
    }, [tags])
  return (
    <Container>
        {videos.map((video) => (
          <VideoCard type="small" key={video._id} video={video}/>  
        ))}
    </Container>
  )
}

export default Recommendation