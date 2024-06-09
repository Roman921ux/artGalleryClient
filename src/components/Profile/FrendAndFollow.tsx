import styled from 'styled-components';
import { useAppSelector } from '../../feature/redux-hook';
import { IUserProfile } from '../../types/user';
import FrendInfoItem from './FrendInfoItem';
import GreyBtn from '../shared/buttons/GreyBtn';
import { useEffect, useRef, useState } from 'react';

interface StyledBlockProps {
  isOverflowing: boolean;
}

function FrendAndFollow() {
  const { userInfo } = useAppSelector(state => state.user);
  const [isClick, setIsClick] = useState(false);

  const blockRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (blockRef.current) {
      if (blockRef.current.scrollHeight > 250) {
        setIsOverflowing(true);
      }
    }
  }, [userInfo]);

  // console.log('userInfo в Списке друзей', userInfo)
  return (
    <Container>
      {isClick ? <Text>Подписки</Text> : <Text>Подписчики</Text>}

      <Block ref={blockRef} isOverflowing={isOverflowing}>
        {userInfo && !isClick ?
          userInfo.followers?.users.map((user: IUserProfile) => <FrendInfoItem key={user._id} user={user} />)
          : userInfo.subscriptions?.users.map((user: IUserProfile) => <FrendInfoItem key={user._id} user={user} />)}
      </Block>

      {!isClick ? <GreyBtn onClick={() => setIsClick(true)}>Подписки</GreyBtn> : <GreyBtn onClick={() => setIsClick(false)}>Подписчики</GreyBtn>}
    </Container>
  );
}

export default FrendAndFollow;

const Container = styled.div`
  grid-area: faf;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  width: 273px;
  height: min-content;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  padding: 10px 15px 15px 15px;
  box-sizing: border-box;
`;

const Block = styled.div<StyledBlockProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 15px;
  max-height: 250px;
  overflow-y: ${props => (props.isOverflowing ? 'scroll' : 'visible')};
  /* overflow-y: scroll; */
  /* border: 1px solid red; */
`;



const Text = styled.span`
  color: var(--text-color);
  /* font-size: var(); */

`;
