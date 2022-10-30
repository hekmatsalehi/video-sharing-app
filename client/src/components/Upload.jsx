import React, { useState } from "react";
import styled from "styled-components";
import { CloseOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #0000006c;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    transition: ease-out 0.2s;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
  margin: 5px 0px;
  width: 100%;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.textSoft};
    transition: ease-out 0.2s;
  }
`;

const Label = styled.label`
  font-size: 14px;
`;
function Upload ({ setOpenModal }){
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage();

    // Create new file name to prevent adding duplicate name
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        urlType === "imageUrl"
          ? setImagePercentage(progress)
          : setVideoPercentage(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},

      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    // If video exist call the function
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    image && uploadFile(image, "imageUrl");
  }, [image]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpload = async (e) => {

    const response = await axios.post("/videos", {...inputs, tags})
    setOpenModal(false)
    response.status === 200 && navigate(`/video/${response.data._id}`)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenModal(false)}>
          <CloseOutlined />
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video</Label>
        {videoPercentage > 0 ? ("Uploading " + parseInt(videoPercentage) + "%") : ( 
         <Input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />)}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <TextArea
          placeholder="Description"
          rows={8}
          name="description"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image</Label>
        {imagePercentage > 0 ? ("Uploading " + parseInt(imagePercentage) + "%") : ( 
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />)}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
