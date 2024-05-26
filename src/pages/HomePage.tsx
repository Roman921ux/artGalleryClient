import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { resetAuth } from '../feature/user/user-slice';

function HomePage() {
  const { isAuth } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch()
  return (
    <Container>
      Home
      {isAuth ? <h2>Зарегистрирован</h2> : <h2>Не зарегистрирован</h2>}
      <button onClick={() => dispatch(resetAuth())}>Выйти</button>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  
`;