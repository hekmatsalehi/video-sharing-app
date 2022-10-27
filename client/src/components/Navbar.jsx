import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined, VideoCallOutlined } from "@mui/icons-material";
import { logout } from "../redux/userSlice";
import { useState, useEffect, useRef } from "react";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  width: 90%;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  align-self: center;

  &:hover {
    border: 1px solid #0086fc;
    color: #0086fc;
    transition: ease-out 0.2s;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const SubMenu = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  box-sizing: border-box;
  position: absolute;
  top: 56px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-top: none;
  padding: 20px;
  min-width: 200px;
`;

const SubMenuWrapper = styled.div`
  padding-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Hr = styled.hr`
  margin: 5px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const subMenuRef = useRef();
  const avatarRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleSubMenu = () => {
    setSubMenu(!subMenu);
  };

  const outSideClickHandler = (event) => {
    if (
      !subMenuRef.current?.contains(event.target) &&
      !avatarRef.current?.contains(event.target)
    ) {
      setSubMenu(false);
    }
  };
  // Sub menu closes when clicked outside the subMenu or avatar icon
  useEffect(() => {
    document.addEventListener("mousedown", outSideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outSideClickHandler)
    }
  }, []);

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlined style={{cursor: "pointer"}}  onClick={() => setOpenModal(true)}/>
            <Avatar
              src={currentUser.image}
              onClick={toggleSubMenu}
              ref={avatarRef}
            />
          </User>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        )}
        {subMenu && currentUser && (
          <SubMenu ref={subMenuRef}>
            <SubMenuWrapper>
              <Item>
                <Avatar src={currentUser.image} />
                {currentUser.name}
              </Item>
              <Hr />
              <Button onClick={handleSignOut}>
                <LogoutOutlined />
                SIGN OUT
              </Button>
            </SubMenuWrapper>
          </SubMenu>
        )}
      </Wrapper>
    </Container>
    {openModal && <Upload setOpenModal={setOpenModal}/>}
    </>
  );
}

export default Navbar;
