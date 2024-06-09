import styled from 'styled-components';
import comment from '../../../../public/comment.svg'
import { IArt } from '../../../types/arts';

interface Props {
  art: IArt;
}
function CommentBtn({ art }: Props) {
  return (
    <Container>
      <Img src={comment} />
      <Count>{art?.comments?.count}</Count>
    </Container>
  );
}

export default CommentBtn;


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  /* height: 40px; */
  width: min-content;
  padding: 8px 15px;
  background-color: var(--backg-btn-color);
  border-radius: 5px;
`;
const Count = styled.div`
  color: var(--text-btn-color);
  font-size: var(--fs-medium);
`;

const Img = styled.img`
  margin-top: 2px;
  width: 20px;
  height: 20px;
`;