import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
  font-size: 20px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  padding-right: 40px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  box-sizing: content-box;
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      return;
    }
    dispatch(loginStart());

    try {
      const response = await axios.post("/auth/login", { name, password });
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const signinWithGoogle = () => {
    dispatch(loginStart());

    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
          })
          .then((response) => {
            dispatch(loginSuccess(response.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    try {
      const newUser = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      dispatch(loginStart());
      dispatch(loginSuccess(newUser.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to SkyTube</SubTitle>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleLogin}>
            Sign in
          </Button>
        </Form>
        <Button onClick={signinWithGoogle}>Sign in with Google</Button>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleSignup}>
            Sign up
          </Button>
        </Form>
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
