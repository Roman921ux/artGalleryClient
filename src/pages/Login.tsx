import styled from 'styled-components';
import regist from '../../public/img2.svg'
import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Login() {
  const [value, setValue] = useState({
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
    console.log(value);
    setValue({
      email: '',
      password: ''
    })
  }
  return (
    <Container>
      <LeftBlock src={regist} />
      <RightBlock>
        <Title>LOG IN</Title>
        <Form onSubmit={onSubmitForm}>
          <Input placeholder='Email:' name='email' type='email' value={value.email} onChange={onChangeValue} />
          <Input placeholder='Password:' name='password' type='password' value={value.password} onChange={onChangeValue} />
          <Button type='submit'>Log in</Button>
        </Form>
        <Block>
          <Text>Еще не зарегистрированы?</Text>
          <NavLink to='/login' style={{ "color": "inherit" }}>SIGN UP</NavLink>
        </Block>
      </RightBlock>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  height: 523px;
  width: 762px;
  margin: 0 auto;
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
