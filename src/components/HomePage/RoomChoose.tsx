import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../feature/redux-hook';
import { getAllRooms, changeRoom } from '../../feature/arts/arts-slice';
import RoomItem from './RoomChoose/RoomItem';
import CreateRoom from './RoomChoose/CreateRoom';

function RoomChoose() {
  const dispatch = useAppDispatch();
  const { rooms, arts } = useAppSelector(state => state.arts);
  const [value, setValue] = useState('')

  const changeRoomFunc = (room: string) => {
    dispatch(changeRoom(room))
  }

  useEffect(() => {
    dispatch(getAllRooms())
  }, [])

  const selectRoom = rooms.filter(room => room.nameRoom.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

  return (
    <Container>
      <Input placeholder='Найди свою комнату' value={value} onChange={e => setValue(e.target.value)} />

      <RoomsBlock>
        <RoomBasiItem onClick={() => dispatch(changeRoom('Common'))} >
          <span>Все работы</span>
          <span>{arts.length}</span>
        </RoomBasiItem>
        {selectRoom && selectRoom.map(room => <RoomItem room={room} key={room._id} changeRoom={changeRoomFunc} />)}
      </RoomsBlock>
      <CreateRoom />
    </Container>
  );
}

export default RoomChoose;

const Container = styled.div`
  grid-area: roomC;
  height: min-content;
  width: 273px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
`;


const RoomBasiItem = styled.div`
  display: flex;
  justify-content: space-between;
 
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  color: var(--text-darkDim-color);
  padding: 5px 15px;
`;
const Input = styled.input`
  background-color: var(--backg-btnDim-color);
  color: var(--text-btnDim-color);
  border-radius: 5px;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
`;

const RoomsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* border: 1px solid red; */
  padding: 0 10px;
  margin-top: 25px;
`;