import styled from 'styled-components';
import { useAppSelector } from '../../feature/redux-hook';
import { IUserProfile } from '../../types/user';

function FrendAndFollow() {
  const { userInfo } = useAppSelector(state => state.user);
  console.log('FrendAndFollow userInfo', userInfo)
  return (
    <Container>
      FrendAndFollow
      {userInfo && userInfo.followers?.users.map((user: IUserProfile) => <li>{user.firstName}</li>)}
    </Container>
  );
}

export default FrendAndFollow;

const Container = styled.div`
  grid-area: faf;
  width: 273px;
  height: 220px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
`;