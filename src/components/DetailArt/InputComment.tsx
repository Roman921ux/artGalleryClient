import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../feature/redux-hook';
// import axios from 'axios';
import axios from '../../utils/axios'
import { IUserProfile } from '../../types/user';
import { changeArtstoCommentDetailArt } from '../../feature/arts/arts-slice';

function InputComment() {
  const { token, isAuthenticated } = useAppSelector(state => state.user);
  const { detailArt } = useAppSelector(state => state.arts);
  const dispatch = useAppDispatch();
  const [infoMe, setInfoMe] = useState<IUserProfile>();
  const [value, setValue] = useState('')

  useEffect(() => {
    if (token) {
      const fetchInfoUser = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log('InputComment infoMe', data)
          setInfoMe(data)
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchInfoUser()
    }
  }, [token])
  console.log('infoMe', infoMe)

  const submitCooment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (token) {
        try {
          const { data } = await axios.patch(`http://localhost:5000/api/arts/${detailArt?._id}/comment`,
            { comment: value },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log('submitCooment', data);
          dispatch(changeArtstoCommentDetailArt(data))
          setValue('')
          // return data
        } catch (error) {
          console.log('Error', error)
        }
      } else {
        alert('Вы не авторизованы!')
      }
    }

  }


  if (!isAuthenticated) {
    return (
      <></>
      // <Container>
      //   <Title>Вы не авторизованы</Title>
      // </Container>
    )
  }
  return (
    <Container>
      <UserInfoBlock>
        <Title>{infoMe?.firstName}</Title>
      </UserInfoBlock>

      <Input placeholder='Оставь свой комментарий' value={value} onChange={e => setValue(e.target.value)} onKeyPress={submitCooment} />
    </Container>
  );
}

export default InputComment;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 15px;
`;
const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  /* border: 1px solid red; */
  width: 180px;
  gap: 5px;
  margin-left: 30px;
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

const Title = styled.div`
  font-size: var(--fs-medium);
`;