import styled from 'styled-components';


interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function BasiButton({ onClick, children, style = {} }: Props) {
  return (
    <Container onClick={onClick} style={{ ...style }}>
      {children}
    </Container>
  );
}

export default BasiButton;

const Container = styled.div`
  width: 145px;
  height: 35px;
  border: 1px solid var(--border-color);
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;