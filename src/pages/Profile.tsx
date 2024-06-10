import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { getMeReducer, getUserReducer, resetAuth } from '../feature/user/user-slice';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
// import SortPanel from '../components/HomePage/SortPanel';
import FrendAndFollow from '../components/Profile/FrendAndFollow';
import { useEffect } from 'react';
// import axios from 'axios';
import axios from '../utils/axios'
import CardItem from '../components/HomePage/CardItem';
import { IArt } from '../types/arts';
// import { artSelectProfile } from '../feature/arts/arts-slice';
import BasiBtnGrey from '../components/shared/buttons/BasiBtnGrey';
//


function Profile() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.user)
  const navigate = useNavigate();

  const { userInfo } = useAppSelector(state => state.user)
  const { arts } = useAppSelector(state => state.arts)
  const { id } = useParams<{ id: string }>();

  // const [inputTitle, setinputTitle] = useState('');
  // const [inputDescript, setInputDescript] = useState('');
  // const arts = useAppSelector(state => artSelectProfile(state.user.userInfo?.arts?.items, inputTitle, inputDescript));


  const resetToken = () => {
    dispatch(resetAuth())
    navigate('/login')
  }

  useEffect(() => {
    if (id) {
      console.log('id есть', id)
      const fetchInfoUser = async () => {
        try {
          const { data } = await axios.get(`/user/${id}`);
          console.log('UserInfo если не мой профиль', data)
          // setUserInfo(data)
          dispatch(getUserReducer(data))
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchInfoUser()
    } else {
      console.log('id нет', id)
      const fetchInfoUser = async () => {
        try {
          const { data } = await axios.get(`/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          // console.log('Our User', data)
          // setUserInfo(data)
          dispatch(getMeReducer(data))
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchInfoUser()
    }
  }, [navigate]);
  // объедени их
  // useEffect(() => {
  //   console.log('navigate Отработал');

  //   const fetchInfoUser = async () => {
  //     try {
  //       const { data } = await axios.get(`http://localhost:5000/api/user/${id}`);
  //       // console.log('UserInfo если не мой профиль', data)
  //       // setUserInfo(data)
  //       dispatch(getUserReducer(data))
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   }
  //   fetchInfoUser()
  // }, [navigate])

  return (
    <Container>
      <BasiBtnGrey onClick={() => navigate(-1)}>Назад</BasiBtnGrey>
      {userInfo && <ProfileHeader resetToken={resetToken} userInfo={userInfo} />}
      {/* <SortPanel value={{ inputTitle, inputDescript }} setValue={{ setinputTitle, setInputDescript }} /> */}
      <FrendAndFollow />
      <CardBlock>
        {/* {userInfo && userInfo.arts && userInfo?.arts.items.map((art: IArt) => <CardItem key={art._id} art={art} />)} */}
        {arts && arts.slice().reverse().map((art: IArt) => <CardItem key={art._id} art={art} />)}
        {/* slice().reverse(). */}
      </CardBlock>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 664px 273px;
  grid-template-rows: auto auto 55px;
  grid-template-areas:
    "btnB btnB"
    "profH profH"
    "cardB faf"
    "cardB faf";
`;

const CardBlock = styled.div`
  grid-area: cardB;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* border: 1px solid red; */
`;