import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { resetAuth } from '../feature/user/user-slice';

function Profile() {
  const { isAuthenticated, token, userInfo } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  console.log('token', token)
  return (
    <Container>
      - Profile
      <span>Имя: {userInfo?.firstName && userInfo?.firstName}</span>
      <span>{isAuthenticated ? <h3>Авторизован</h3> : <h3>Не авторизован</h3>}</span>
      <span>{token}</span>
      <button onClick={() => dispatch(resetAuth())}>Выйти</button>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  
`;