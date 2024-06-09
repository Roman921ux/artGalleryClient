import styled from 'styled-components';
import { useAppSelector } from '../../feature/redux-hook';
import React, { useState } from 'react';

interface Props {
  value: {
    inputAuthor?: string,
    inputTitle: string,
    inputDescript: string
  };
  setValue: {
    setinputAuthor?: React.Dispatch<React.SetStateAction<string>>;
    setinputTitle: React.Dispatch<React.SetStateAction<string>>;
    setInputDescript: React.Dispatch<React.SetStateAction<string>>;
  }

}

function SortPanel({ value, setValue }: Props) {
  // const { activeRoom } = useAppSelector(state => state.arts)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'author') {
      if (setValue.setinputAuthor) {
        setValue.setinputAuthor(event.target.value);
      }
    } else if (event.target.name === 'title') {
      setValue.setinputTitle(event.target.value);
    } else if (event.target.name === 'descript') {
      setValue.setInputDescript(event.target.value);
    }

  };

  return (
    <Container>
      {/* <span>{activeRoom}</span> */}
      {value.inputAuthor !== undefined && <Input placeholder='Найти по автору' name='author' value={value.inputAuthor} onChange={handleChange} />}
      <Input placeholder='Найти по названию' name='title' value={value.inputTitle} onChange={handleChange} />
      <Input placeholder='Найти по описанию' name='descript' value={value.inputDescript} onChange={handleChange} />
    </Container>
  );
}

export default SortPanel;

const Container = styled.div`
  grid-area: sortP;
  display: flex;
  gap: 5px;
  align-items: center;
  height: 53px;
  padding: 0 15px;
  border: 1px solid red;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
`;

const Input = styled.input`
  background-color: #fff;
  color: #000;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 5px 15px;
  width: max-content;
  box-sizing: border-box;
`