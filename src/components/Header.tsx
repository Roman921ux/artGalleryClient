import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderBlock>
      <Container>
        <NavLink to="/" style={{ "color": "inherit" }}><Logo>ArtGallery</Logo></NavLink>
        <Block>
          <NavLink to="/login" style={{ "color": "inherit" }} className={({ isActive }) => isActive ? 'active-link' : 'link'}>
            <Link>Log in</Link>
          </NavLink>
          <NavLink to="/register" style={{ "color": "inherit" }} className={({ isActive }) => isActive ? 'active-link' : 'link'}>
            <Link>Sign up</Link>
          </NavLink>
        </Block>
      </Container>
    </HeaderBlock>
  );
}

export default Header;
const HeaderBlock = styled.header`
  background-color: #fff;
  border: 1px solid #EBEBEB;
  /* width: 100%; */
`;
const Container = styled.div`
  width: 1280px;
  height: 60px;
  margin: 0 auto;
  padding: 0 64px;
  /* border: 1px solid red; */
  //
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: 900;
`;
const Block = styled.span`
  display: flex;
  gap: 30px;
`;
const Link = styled.span`
  letter-spacing: 3px;
`