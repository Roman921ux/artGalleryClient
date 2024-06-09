import styled from 'styled-components';
import { Skeleton } from '@mui/material'


function LoaderProfileHeader() {
  return (
    <Container>
      <Skeleton variant="rounded" sx={{ bgcolor: 'while.900' }} width={953} height={205} />
    </Container>
  );
}

export default LoaderProfileHeader;

const Container = styled.div`
  
`;