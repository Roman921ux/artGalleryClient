import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../feature/redux-hook';
import { getAllRooms } from '../feature/arts/arts-slice';
//
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
// import axios from 'axios';
import axios from '../utils/axios'
import { IRoom } from '../types/arts';
import BasiBtnGrey from '../components/shared/buttons/BasiBtnGrey';
import GreyBtn from '../components/shared/buttons/GreyBtn';
import { useNavigate } from 'react-router-dom';

function CreateArt() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { token } = useAppSelector(state => state.user)
  //
  const [valueTitle, setValueTitle] = useState('');
  const [image, setImage] = useState('');
  const [valueMDE, setValueMDE] = useState('');
  const [valueRoom, setValueRoom] = useState('');
  const [rooms, setRooms] = useState<IRoom[]>([])
  //
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
  const resetStateForm = () => {
    setValueTitle('');
    setImage('');
    setValueMDE('');
    setValueRoom('');
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      title: valueTitle,
      text: valueMDE,
      room: valueRoom ? valueRoom : 'Common',
      image: image
    };
    console.log('formData', formData)

    const { data } = await axios.post('arts',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    console.log('submitHandler', data)
    // dispatch(createArt(data))
    resetStateForm()
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
        '/upload',
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

  useEffect(() => {
    dispatch(getAllRooms())
      .then(data => setRooms([{
        "nameRoom": "Common",
        "countArts": 0,
        "_id": "6664240fd80027a5b2825b5d",
        "createdAt": "2024-06-08T09:27:43.575Z",
        "updatedAt": "2024-06-08T09:27:43.575Z",
        "__v": 0
      }, ...data.payload]))
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueRoom(e.target.value)
    // console.log(e.target.value); // Обработка выбора
  };


  return (
    <Container>
      <Block>
        <BasiBtnGrey onClick={() => navigate(-1)}>Назад</BasiBtnGrey>
        {image ? (<BasiBtnGrey onClick={() => setImage('')}>Удалить</BasiBtnGrey>)
          : (<label>
            <BasiBtnGrey onClick={() => inputRef.current?.click()}>Добавить Файл</BasiBtnGrey>
            <input ref={inputRef} type='file' onChange={handleChangeFile} hidden />
          </label>)}
      </Block>

      <Form onSubmit={submitHandler}>
        <ImgBlock>
          {image && <IMG src={`https://art-gallery-server-eight.vercel.app/${image}`} />}
        </ImgBlock>
        <BlockForm>
          <label>
            <Input type="text" placeholder='Название Art' name="title" value={valueTitle} onChange={handleInput} />
          </label>
          <div>
            <Select id="roomSelect" onChange={handleChange}>
              {rooms.map((room, index) => (
                <Option key={index} value={room.nameRoom.toLowerCase().replace(/\s+/g, '-')}>
                  {room.nameRoom}
                </Option>
              ))}
            </Select>
          </div>
          <label>
            <MDE>
              <SimpleMDE id="editor" style={{ "color": "red" }} value={valueMDE} onChange={onChange} options={options} />
            </MDE>
          </label>
          <Block>
            <GreyBtn>Создать ART</GreyBtn>
            <GreyBtn onClick={resetStateForm} type="button">Отмена</GreyBtn>
          </Block>
        </BlockForm>
      </Form>
    </Container>
  );
}

export default CreateArt;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const MDE = styled.div`
  width: 100%;
`;
const Form = styled.form`
overflow: hidden;

  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 5px 5px 5px 5px;
`;
const BlockForm = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
overflow: hidden;
  background-color: #fff;
  padding: 15px;
  border-radius: 0 0 5px 5px;
`;
const ImgBlock = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
  /* border: 1px solid red; */
`;
const IMG = styled.img`
  /* border: 1px solid red; */
  width: 100%;
`;
const Input = styled.input`
  width: 670px;
  height: 30px;

  color: var(--text-color);
  border: 1px solid #D3D9DE;
  border-radius: 5px;
  padding: 5px 15px;
  box-sizing: border-box;
`;
const Select = styled.select`
  width: 200px;
  color: var(--text-color);
  border: 1px solid #D3D9DE;
  border-radius: 5px;
  padding: 5px 15px;
  box-sizing: border-box;
`;
const Option = styled.option`
  color: var(--text-color);
  border: 1px solid #D3D9DE;
  border-radius: 5px;
  padding: 5px 15px;
  box-sizing: border-box;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  width: max-content;
  gap: 15px;
`;