import styled from 'styled-components';
import { IArt } from '../../types/arts';
import LikeBtn from '../shared/buttons/LikeBtn';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ViewBtn from '../shared/buttons/ViewBtn';
import CommentBtn from '../shared/buttons/CommentBtn';
import { domian } from '../../utils/axios';

interface Props {
  art: IArt;
}

function CardItem({ art }: Props) {
  // const id = useParams<{ id: string }>();
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

  // console.log('CardItem', location.pathname)
  return (
    <Container>
      {art.imageUrl && (
        <ImgBlock onClick={() => navigate(`/art/${art._id}`)}>
          <Img src={`${domian}${art.imageUrl}`} />
        </ImgBlock>
      )}
      <Block>
        <InfoBlock>
          <Title onClick={() => navigate(`/art/${art._id}`)} style={{ maxWidth: '380px', cursor: 'pointer' }}>{art?.title}</Title>
          <UserInfoBlock>
            {location.pathname === '/' && <NavLink style={{ color: 'inherit' }} to={`profile/${art.user._id}`}><Title>{art.user?.firstName}</Title></NavLink>}
            <Text>{formattedDate}</Text>
          </UserInfoBlock>
        </InfoBlock>
        <ReactionBlock>
          <LikeBtn art={art} />
          <CommentBtn art={art} />
          <ViewBtn art={art} />
        </ReactionBlock>
      </Block>
    </Container >
  );
}

export default CardItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  overflow: hidden;
`;

const ImgBlock = styled.div`
  height: 360px;
  width: 100%;
  background-color: #dedede;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease; /* Для плавного перехода */
  &:hover img {
    transform: scale(1.05); 
    cursor: pointer;
  }
`;
const Img = styled.img`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 360px;
  /* transform: translate(-50%, -50%); */
  transition: transform 0.4s ease-in-out;
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
const ReactionBlock = styled.div`
  display: flex;
  gap: 5px;
`;