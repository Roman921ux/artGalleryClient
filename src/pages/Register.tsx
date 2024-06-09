import styled from 'styled-components';
import regist from '../../public/img1.svg'
import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../feature/redux-hook';
import { registerThunk } from '../feature/user/user-slice';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  // const notify = () => toast("Wow so easy!");
  //
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [value, setValue] = useState({
    firstName: '',
    email: '',
    password: ''
  })
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(prev => {
      return { ...prev, [name]: value }
    })
  }
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Обработка отправки формы
    // console.log('registerComp', value);
    dispatch(registerThunk(value))
      .then((response) => {
        if (response.meta.requestStatus === 'rejected') {
          toast.error('Ошибка при регистрации!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          throw new Error('Ошибка при регистрации пользователя');
        } else {
          toast.success('Вы зарегистрированы!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        }
      })
      .catch((error) => {
        console.error('Ошибка при регистрации пользователя:', error.message);
      });

    setValue({
      firstName: '',
      email: '',
      password: ''
    })
  }


  return (
    <Container>
      <LeftBlock src={regist} />
      <RightBlock>
        <ToastContainer />
        <Title>SIGN UP</Title>
        <Form onSubmit={onSubmitForm}>
          <Input placeholder='Name:' name='firstName' type='text' value={value.firstName} onChange={onChangeValue} />
          <Input placeholder='Email:' name='email' type='email' value={value.email} onChange={onChangeValue} />
          <Input placeholder='Password:' name='password' type='password' value={value.password} onChange={onChangeValue} />
          <Button type='submit'>Регистрация</Button>
        </Form>
        <Block>
          <Text>Уже зарегестрированы?</Text>
          <NavLink to='/login' style={{ "color": "inherit" }}>Войти</NavLink>
        </Block>
      </RightBlock>
      <ToastContainer />
    </Container>
  );
}

export default Register;

const Container = styled.div`
  height: 523px;
  width: 762px;
  margin: 0 auto;
  margin-top: 25px;
  //
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
const LeftBlock = styled.img`
  width: 50%;
`;
const RightBlock = styled.div`
  width: 50%;
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  //
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: 900;
`;
const Text = styled.span`
  font-size: 12px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Input = styled.input`
  font-size: 12px;
  width: 290px;
`;
const Button = styled.button`
  font-size: 12px;
  margin-top: 25px;
  width: 290px;
  padding: 10px 0;
`;
