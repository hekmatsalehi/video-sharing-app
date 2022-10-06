import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Deducted navbar height and wrapper padding */
  height: calc(100vh - 106px);
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px 50px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.textSoft};
    transition: ease-out 0.2s;
  }
`;

const More = styled.div`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
`;

const Links = styled.div``;

const Link = styled.span`
  margin-left: 20px;
  cursor: pointer;
`;

function Login() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { name, password });
      console.log(response.data)
    } catch (error) {
      
    }
    
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to SkyTube</SubTitle>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>Or</Title>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)}/>
        <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default Login;
