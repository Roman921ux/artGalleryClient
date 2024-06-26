import styled from 'styled-components';
import BasiButton from '../shared/buttons/BasiButton';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { SlPicture } from "react-icons/sl"
import { RiUserSmileFill } from "react-icons/ri";

function NavigatePanel() {
  // const { _id } = useAppSelector(state => state.user?.userInfo)
  const [active, setActive] = useState(0);
  const styleBtn = (a: number) => {
    return {
      color: active === a ? "white" : "",
      background: active === a ? "black" : "",
      display: 'flex',
      gap: '10px'
    }
  }

  return (
    <Container>
      <NavLink to='/' style={{ "color": "inherit" }} onClick={() => setActive(0)}>
        <BasiButton style={styleBtn(0)}><SlPicture />Элюстрации</BasiButton>
      </NavLink>
      <NavLink to={`profile`} style={{ "color": "inherit" }} onClick={() => setActive(1)}>
        <BasiButton style={styleBtn(1)}><RiUserSmileFill />Профиль</BasiButton>
      </NavLink>
      {/* <NavLink to='art' style={{ "color": "inherit" }} onClick={() => setActive(2)}>
        <BasiButton style={styleBtn(2)}>Создать Art</BasiButton>
      </NavLink> */}
    </Container>
  );
}

export default NavigatePanel;

const Container = styled.div`
  height: 300px;
  width: 175px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 5px;
`;