import styled from 'styled-components';
import { IArt, IComment } from '../../types/arts';
import { NavLink } from 'react-router-dom';

interface Props {
  comment: IComment;
}

function UserComment({ comment }: Props) {
  function formatDate(isoDate: string) {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
  const dateComment = formatDate(comment.createdAt)
  return (
    <Container>
      <UserInfoBlock>
        <NavLink style={{ color: 'inherit' }} to={`/profile/${comment.userId._id}`}> <Title>{comment.userId?.firstName}</Title></NavLink>
        <SmallText>{dateComment}</SmallText>
      </UserInfoBlock>

      <Block>
        <Text>{comment.comment}</Text>
      </Block>
    </Container>
  );
}

export default UserComment;

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 40px;
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

const Block = styled.div`
  /* border: 1px solid var(--border-color); */
  padding: 5px 15px;
  border-radius: 5px;
  width: 100%;
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