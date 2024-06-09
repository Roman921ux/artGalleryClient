import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../feature/redux-hook';
import { createRoom } from '../../../feature/arts/arts-slice';

function CreateRoom() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.user);
  const [value, setValue] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (token) {
        const body = {
          token,
          nameRoom: value
        }
        // console.log('body', body)
        dispatch(createRoom(body))
        setValue('')
      } else {
        alert('Вы не авторизованы!')
      }
    }
  };
  return (
    <Container>
      <Input placeholder='Создай свою комнату' value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={handleKeyPress} />
    </Container>
  );
}

export default CreateRoom;

const Container = styled.div`
  margin-top: 15px;
`;
const Input = styled.input`
  background-color: #fff;
  color: #000;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
`;