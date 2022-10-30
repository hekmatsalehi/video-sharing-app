import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
`;

function Search() {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  console.log(videos);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/search${query}`);
      setVideos(response.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Search;
