import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 20px;

`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const CommentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${({theme}) => theme.text};
`;

const Name = styled.span`
    font-size: 14px;
    font-weight: 500;
`;

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
    margin-left: 5px;
`;

const Text = styled.span`
    font-size: 14px;
`;

function Comment() {
  return (
      <Container>
        <Avatar src="https://images.unsplash.com/photo-1520792532857-293bd046307a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdpbGR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
        <CommentDetails>
          <Name>Ahmad Sha <Date>2 days ago</Date></Name>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit hic eveniet rerum vitae, officiis veniam accusamus! Ullam cupiditate eaque sapiente, ipsam consectetur a dolorum, nisi eos, commodi nobis cumque voluptate.</Text>  
        </CommentDetails>
      </Container>
  );
}

export default Comment;
