import styled from 'styled-components';
import { Skeleton } from '@mui/material'


function LoaderProfile() {
  return (
    <Container>
      <Skeleton variant="rectangular" width={210} height={118} />
    </Container>
  );
}

export default LoaderProfile;

const Container = styled.div`
  
`;