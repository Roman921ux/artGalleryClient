import { useAppDispatch } from './feature/redux-hook';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserAuth } from './feature/user/user-slice';
interface Props {
  children: React.ReactNode
}

function RequireAuth({ children }: Props) {
  const dispatch = useAppDispatch()
  // const { isAuthenticated, token } = useAppSelector(state => state.user);
  const navigate = useNavigate()



  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserAuth(token))
    }
    else if (!token) {
      console.log('token in Require', token);
      navigate('/login')
    }
  }, [])

  // if (!token) {
  //   return null
  //   // или можно предзашрузочный компонент
  // }
  return children;
}

export default RequireAuth;
