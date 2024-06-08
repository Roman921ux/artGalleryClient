import styled from 'styled-components';


interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function BasiBtnGrey({ onClick, children, style = {} }: Props) {
  return (
    <Container onClick={onClick} style={{ ...style }}>
      {children}
    </Container>
  );
}

export default BasiBtnGrey;

const Container = styled.button`
  border: 1px solid var(--border-color);
  width: max-content;
  color: var(--text-btnDim-color);
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 5px 15px;
`;