import styled from 'styled-components';
import { IArt, IComment } from '../../types/arts';

interface Props {
  comment: IComment;
}

function UserComment({ comment }: Props) {
  return (
    <Container>
      <UserInfoBlock>
        <Title>{comment.userId?.firstName}</Title>
        <SmallText>Подписчики: {comment.userId.followers?.count}</SmallText>
      </UserInfoBlock>
      <Text>{comment.comment}</Text>
    </Container>
  );
}

export default UserComment;

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
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

const Title = styled.div`
  font-size: var(--fs-medium);
`;
const Text = styled.div`
  font-size: var(--fs-medium);
  color: var(--text-color);
`;
const SmallText = styled.div`
  font-size: var(--fs-small);
  color: var(--text-dim-color);
`;