import styled from 'styled-components';
import heart from '../../../../public/heart.svg'
import heartFull from '../../../../public/heartBlack.svg'
import { IArt } from '../../../types/arts';
import { useAppDispatch, useAppSelector } from '../../../feature/redux-hook';
import { changeArtstoLike, updateLikeArt } from '../../../feature/arts/arts-slice';
interface Props {
  art: IArt;
}

function LikeBtn({ art }: Props) {
  const { userInfo } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();

  const ChangeLike = () => {
    dispatch(updateLikeArt(art._id))
      .then(data => {
        dispatch(changeArtstoLike(data.payload))
      })
  };
  const isClickToLike = art.likes.users.find(user => user === userInfo._id)
  return (
    <Container onClick={ChangeLike}>
      <Img src={isClickToLike ? heartFull : heart} />
      <Count>{art.likes.count}</Count>
    </Container>
  );
}

export default LikeBtn;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  /* height: 40px; */
  width: min-content;
  padding: 8px 15px;
  background-color: var(--backg-btn-color);
  border-radius: 5px;
`;
const Count = styled.div`
  color: var(--text-btn-color);
  font-size: var(--fs-medium);
`;

const Img = styled.img`
  margin-top: 3px;
  width: 20px;
  height: 20px;
`;