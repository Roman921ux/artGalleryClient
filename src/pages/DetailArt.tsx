import styled from 'styled-components';
import CardItem from '../components/HomePage/CardItem';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IArt } from '../types/arts';
import LargeCardItem from '../components/shared/ImgCards/LargeCardItem';
import BasiBtnGrey from '../components/shared/buttons/BasiBtnGrey';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { getOneArt } from '../feature/arts/arts-slice';
import { getMeReducer } from '../feature/user/user-slice';
import InputComment from '../components/DetailArt/InputComment';
import UserComment from '../components/DetailArt/UserComment';

function DetailArt() {
  const dispatch = useAppDispatch();
  const { detailArt } = useAppSelector(state => state.arts);
  const { token } = useAppSelector(state => state.user)
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