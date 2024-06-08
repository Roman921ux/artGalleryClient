import styled from 'styled-components';
import { IRoom } from '../../../types/arts';

interface Props {
  room: IRoom;
  changeRoom: (room: string) => void;
}

function RoomItem({ room, changeRoom }: Props) {
  return (
    <Container onClick={() => changeRoom(room.nameRoom)}>
      <span>{room.nameRoom}</span>
      <span>{room.countArts}</span>
    </Container>
  );
}

export default RoomItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
 
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  color: var(--text-darkDim-color);
  padding: 5px 15px;
`;