import styled from 'styled-components';
import GreyBtn from '../shared/buttons/GreyBtn';
import { useAppDispatch, useAppSelector } from '../../feature/redux-hook';
import { IUserProfile } from '../../types/user';
import { updateFollowerUser, updateUnsubUser } from '../../feature/user/user-slice';
import { NavLink } from 'react-router-dom';
import LoaderProfileHeader from '../shared/preLoader/LoaderProfileHeader';

interface Props {
  resetToken: () => void,
  userInfo: IUserProfile
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomGradient() {
  const angle = Math.floor(Math.random() * 360);
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
function ProfileHeader({ resetToken, userInfo }: Props) {
  const dispatch = useAppDispatch()
  const { myId, isLoading, isAuthenticated } = useAppSelector(state => state.user)
  const gradient = getRandomGradient();
  const isYourProfile = userInfo._id === myId
  console.log('userInfo перед отправкой', userInfo)

  const unsubOfUser = () => {
    if (isAuthenticated) {
      dispatch(updateUnsubUser(userInfo._id))
    } else {
      alert('Авторизуйся, дурашка!')
    }
  }
  const subOfUser = () => {
    if (isAuthenticated) {
      dispatch(updateFollowerUser(userInfo._id))
    } else {
      alert('Авторизуйся, дурашка!')
    }
  }

  // console.log('userInfo', userInfo)
  // console.log('myId', myId)
  const isYouInFollowUser = Boolean(userInfo?.followers?.users.find(user => user._id === myId));
  // console.log('isYouInFollowUser', isYouInFollowUser)
  // console.log('isAuthenticated', isAuthenticated)

  /* The commented out code `// if (isLoading === 'loading') {` and `// return <LoaderProfileHeader />`
  is a conditional check to display a loading spinner component `LoaderProfileHeader` when the
  `isLoading` state is set to `'loading'`. This is a common pattern used in React components to show a
  loading indicator while data is being fetched or processed asynchronously. */
  if (isLoading === 'loading') {
    return <h1>Loading</h1>
  }

  return (
    <Container>
      <Block>
        <Block style={{ gap: "15px" }}>
          <ImgBlock style={{ background: gradient }} />
          <TextBlock>
            <Title>{userInfo?.firstName}</Title>
            <Text style={{ margin: '0px 0 0 10px' }}>{userInfo?.email}</Text>
            <Text style={{ margin: '0px 0 0 10px' }}>Кол-во работ: {userInfo?.arts?.count}</Text>
          </TextBlock>
        </Block>
        {isYourProfile && <GreyBtn onClick={resetToken}>Выйти</GreyBtn>}
      </Block>
      <Block>
        {isYourProfile ? (
          <Block style={{ gap: '10px' }}>
            <GreyBtn>Редактировать профиль</GreyBtn>
            <NavLink to='/art' style={{ color: 'inherit' }}><GreyBtn>Создать Art</GreyBtn></NavLink>
          </Block>
        ) : (
          <Block style={{ gap: '10px' }}>
            {isYouInFollowUser ? (
              <GreyBtn onClick={unsubOfUser}>Отписаться</GreyBtn>
            ) : (
              <GreyBtn onClick={subOfUser}>Подписаться</GreyBtn>
            )}

            <GreyBtn>Написать</GreyBtn>
          </Block>
        )}


        <Block style={{ gap: '15px', margin: '5px 15px' }}>
          <Text>Подписчики: {userInfo?.followers?.count}</Text>
          <Text>Подписки: {userInfo?.subscriptions?.count}</Text>
        </Block>
      </Block>
    </Container>
  );
}

export default ProfileHeader;

const Container = styled.div`
  grid-area: profH;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  /* height: 190px; */
  padding: 15px;
`;
const Block = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.div`
  font-size: var(--fs-large);
`;
const Text = styled.div`
  max-width: 330px;
  font-size: var(--fs-medium);
  color: var(--text-dim-color);
  line-height: 20px;
`;
const ImgBlock = styled.div`
  width: 125px;
  height: 125px;
  background-color: #d0d0d0;
  border-radius: 5px;
`;
const Img = styled.img`
  
`;