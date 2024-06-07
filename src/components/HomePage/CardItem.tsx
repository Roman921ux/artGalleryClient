import styled from 'styled-components';
import { IArt } from '../../types/arts';
import LikeBtn from '../shared/buttons/LikeBtn';

interface Props {
  art: IArt;
}

function CardItem({ art }: Props) {

  return (
    <Container>
      <ImgBlock>
        <Img src={`http://localhost:5000${art.imageUrl}`} />
      </ImgBlock>
      <Block>
        <InfoBlock>
          <Title>{art.title}</Title>
          <span>{art.user.firstName}</span>
        </InfoBlock>
        <ReactionBlock>
          <LikeBtn art={art} />
        </ReactionBlock>
      </Block>
    </Container>
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
`;
const Img = styled.img`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 360px;
  /* transform: translate(-50%, -50%); */
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
  padding: 0 15px;
`;
const Title = styled.div`
  width: 380px;
`;
const ReactionBlock = styled.div`
`;