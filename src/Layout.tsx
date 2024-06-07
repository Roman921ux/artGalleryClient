import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import NavigatePanel from './components/HomePage/NavigatePanel';

function Layout() {
  return (
    <>
      <Header />

      <MainBlock>
        <Container>
          <NavigatePanel />
          <div style={{ "width": "946px" }}>
            <Outlet />
          </div>
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
  width: 1152px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 64px;
`;

