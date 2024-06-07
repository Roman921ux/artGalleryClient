import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { createArt } from '../feature/arts/arts-slice';
//
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';

function CreateArt() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.user)
  const [valueTitle, setValueTitle] = useState('');
  const [image, setImage] = useState('');
  const [valueMDE, setValueMDE] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // MDE
  const options = useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: 'Введите текст...',
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
      uniqueId: 'myUniqueID',
    },
  }), [])
  const onChange = useCallback((value: string) => {
    setValueMDE(value);
  }, []);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      title: valueTitle,
      text: valueMDE,
      room: 'default',
      image: image
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/arts',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    console.log('submitHandler', data)
    // dispatch(createArt(data))
  }
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) {
        // Если нет файлов, выходим из функции
        return;
      };

      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const { data } = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      setImage(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла')
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(e.target.value);
  }

  return (
    <Container>
      Create Arts
      <form onSubmit={submitHandler}>
        <label>
          <button onClick={() => inputRef.current?.click()} type='button'>Загрузить файл</button>
          <input ref={inputRef} type='file' onChange={handleChangeFile} hidden />
        </label>
        <div>
          {image && (
            <>
              <img src={`http://localhost:5000${image}`} />
            </>
          )}
        </div>
        <label>
          Заголовок Art
          <input type="text" placeholder='Название Art' name="title" value={valueTitle} onChange={handleInput} />
        </label>
        <label>
          Описание Art
          <MDE>
            <SimpleMDE id="editor" style={{ "color": "red" }} value={valueMDE} onChange={onChange} options={options} />
          </MDE>
        </label>
        <div className="">
          <button type='submit'>Добавить art</button>
          <button>Отмена</button>
        </div>
      </form>
    </Container>
  );
}

export default CreateArt;

const Container = styled.div`
  
`;
const MDE = styled.div`
  width: 957px;
`;