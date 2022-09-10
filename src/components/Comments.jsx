import React from 'react'
import styled from "styled-components";
import Comment from './Comment';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;        
`
const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 5px;   
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`
const Input = styled.input`
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  color: ${({theme}) => theme.text};
  width: 100%;
`
function Comments() {
  return (
    <Container>
        <NewComment>
            <Avatar src="https://images.unsplash.com/photo-1520792532857-293bd046307a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdpbGR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
            <Input placeholder="Add a comment..."/>
        </NewComment>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </Container>
  )
}

export default Comments