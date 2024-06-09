import styled from 'styled-components';
import { IUserProfile } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../../feature/redux-hook';
import { getUserReducer } from '../../feature/user/user-slice';

interface Props {
  user: IUserProfile
}

function FrendInfoItem({ user }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchUserInfo = () => {
    navigate(`/profile/${user._id}`)
    const fetchInfoUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/user/${user._id}`);
        // console.log('UserInfo если не мой профиль', data)
        // setUserInfo(data)
        dispatch(getUserReducer(data))
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchInfoUser()
  }
  return (
    <Container onClick={fetchUserInfo}>
      <Title>{user.firstName}</Title>
    </Container>
  );
}

export default FrendInfoItem;

const Container = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  padding: 5px 15px;
  box-sizing: border-box;
  cursor: pointer;
`;

const Title = styled.span`
  color: var(--text-darkDim-color);
  /* font-size: var(); */
`;