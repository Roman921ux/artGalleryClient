import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import SortPanel from '../components/HomePage/SortPanel';
import RoomChoose from '../components/HomePage/RoomChoose';
import CardItem from '../components/HomePage/CardItem';
import { useEffect, useState } from 'react';
import { artSelect, getAllArts } from '../feature/arts/arts-slice';

function HomePage() {
  const dispatch = useAppDispatch();
  const [inputAuthor, setinputAuthor] = useState('');
  const [inputTitle, setinputTitle] = useState('');
  const [inputDescript, setInputDescript] = useState('');
  const arts = useAppSelector(state => artSelect(state.arts.arts, state.arts.activeRoom, inputAuthor, inputTitle, inputDescript));


  useEffect(() => {
    dispatch(getAllArts())
  }, [])

  return (
    <Container>
      <SortPanel value={{ inputAuthor, inputTitle, inputDescript }} setValue={{ setinputAuthor, setinputTitle, setInputDescript }} />
      <CardBlock>
        {arts && arts.slice().reverse().map(art => <CardItem key={art._id} art={art} />)}
      </CardBlock>
      <RoomChoose />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 664px 273px;
  grid-template-rows: auto;
  grid-template-areas:
    "sortP roomC"
    "cardB roomC"
    ".     roomC";
`;
const CardBlock = styled.div`
  grid-area: cardB;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* border: 1px solid red; */
`;