import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LargeCardItem from '../components/shared/ImgCards/LargeCardItem';
import BasiBtnGrey from '../components/shared/buttons/BasiBtnGrey';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { getOneArt } from '../feature/arts/arts-slice';
import InputComment from '../components/DetailArt/InputComment';
import UserComment from '../components/DetailArt/UserComment';

function DetailArt() {
  const dispatch = useAppDispatch();
  const { detailArt } = useAppSelector(state => state.arts);
  // const { token } = useAppSelector(state => state.user)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (id) {
      dispatch(getOneArt(id));
    }
  }, []);


  return (
    <Container>
      <BasiBtnGrey onClick={() => navigate(-1)}>Назад</BasiBtnGrey>
      {detailArt && <LargeCardItem art={detailArt} />}
      <InputComment />
      {detailArt && detailArt.comments.commentList.map(comment => <UserComment comment={comment} />)}
    </Container>
  );
}

export default DetailArt;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;