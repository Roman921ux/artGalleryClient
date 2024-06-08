import styled from 'styled-components';


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function GreyBtn({ onClick, children, style = {}, ...rest }: Props) {
  return (
    <Container onClick={onClick} style={{ ...style }} {...rest}>
      {children}
    </Container>
  );
}

export default GreyBtn;

const Container = styled.button`
  /* width: 145px; */
  max-height: 35px;
  background-color:  var(--backg-btnDim-color);
  color: var(--text-btnDim-color);
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  cursor: pointer;
`;