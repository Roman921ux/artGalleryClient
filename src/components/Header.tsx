import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../feature/redux-hook';

function Header() {
  const { isAuthenticated } = useAppSelector(state => state.user)
  return (
    <HeaderBlock>
      <Container>
        <NavLink to="/" style={{ "color": "inherit" }}><Logo>ArtGallery</Logo></NavLink>
        {!isAuthenticated && (<Block>
          <NavLink to="/login" style={{ "color": "inherit" }} className={({ isActive }) => isActive ? 'active-link' : 'link'}>
            <Link>Войти</Link>
          </NavLink>
          <NavLink to="/register" style={{ "color": "inherit" }} className={({ isActive }) => isActive ? 'active-link' : 'link'}>
            <Link>Регистрация</Link>
          </NavLink>
        </Block>)}

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
  width: 1152px;
  height: 60px;
  margin: 0 auto;
  /* padding: 0 64px; */
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