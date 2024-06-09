import styled from 'styled-components';
import { IArt } from '../../../types/arts';
import LikeBtn from '../buttons/LikeBtn';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../feature/redux-hook';
import axios from 'axios';
import { getMeReducer } from '../../../feature/user/user-slice';
// import { marked } from 'marked';
import ReactMarkdown from 'react-markdown'
import CommentBtn from '../buttons/CommentBtn';
import ViewBtn from '../buttons/ViewBtn';


interface Props {
  art: IArt;
}

function LargeCardItem({ art }: Props) {
  const { myId, token } = useAppSelector(state => state.user)
  // const id = useParams<{ id: string }>();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
  const formattedDate = formatDate(art.createdAt);


  useEffect(() => {
    const fetchInfoUser = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log('Our User', data)
      // setUserInfo(data)
      dispatch(getMeReducer(data))
    }
    fetchInfoUser()
  }, [])

  console.log('CardItem id', art.user, myId)
  const isYourArt = art.user._id === myId
  console.log('isYourArt', isYourArt)
  return (
    <Container>
      {art.imageUrl && (
        <ImgBlock onClick={() => navigate(`art/${art._id}`)}>
          <Img src={`http://localhost:5000${art.imageUrl}`} />
        </ImgBlock>
      )}
      <Block>
        <InfoBlock>
          <Block style={{ padding: '0', gap: '15px' }}>
            <Title style={{ width: '380px' }}>{art?.title}</Title>
            {art.text && <Description style={{ width: '700px' }}><ReactMarkdown children={art.text} /></Description>}
          </Block>
          <UserInfoBlock>
            {location.pathname === '/' || isYourArt === false && <NavLink style={{ color: 'inherit' }} to={`/profile/${art.user._id}`}><Title>{art.user?.firstName}</Title></NavLink>}
            <Text>{formattedDate}</Text>
          </UserInfoBlock>
        </InfoBlock>
        <ReactionBlock>
          <LikeBtn art={art} />
          <CommentBtn art={art} />
          <ViewBtn art={art} />
        </ReactionBlock>
      </Block>
    </Container>
  );
}

export default LargeCardItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  overflow: hidden;
`;

const ImgBlock = styled.div`
  /* height: auto; */
  width: 100%;
  background-color: #dedede;
  margin-bottom: -8px;
  /* position: relative;
  overflow: hidden;
  transition: transform 0.3s ease; 
  &:hover img {
    transform: scale(1.05); 
    cursor: pointer;
  } */
`;
const Img = styled.img`
  /* object-fit: cover;
  position: absolute; */
  width: 100%;
  height: auto;
  /* transform: translate(-50%, -50%); */
  /* transition: transform 0.4s ease-in-out; */
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px; 
  background-color: #fff;
  padding: 15px;
`;
const InfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px 10px 15px;
  /* border: 1px solid red; */
`;
const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;
const Title = styled.div`
  font-size: var(--fs-medium);
`;
const Text = styled.div`
  font-size: var(--fs-small);
  color: var(--text-dim-color);
`;
const Description = styled.div`
  font-size: var(--fs-medium);
  color: var(--text-color);
  padding-left: 15px;
`;
const ReactionBlock = styled.div`
  display: flex;
  gap: 5px;
`;

