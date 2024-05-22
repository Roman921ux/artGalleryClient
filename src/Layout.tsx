import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';

function Layout() {
  return (
    <>
      <Header />

      <MainBlock>
        <Container>
          <Outlet />
        </Container>
      </MainBlock>
    </>
  );
}

export default Layout;

const MainBlock = styled.div`
  /* background-color: #e0bebe; */
  margin-top: 34px;
`;
const Container = styled.div`
/* border: 1px solid red; */
  width: 1280px;
  /* height: 60px; */
  margin: 0 auto;
  padding: 0 64px;
`;

