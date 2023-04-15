import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { API } from '../api/Api';
import { Navigate } from 'react-router-dom';
import { dataFetching } from '../utils/dataFetching';

type prop = {
  children: ReactNode;
};

const Protected = ({ children }: prop) => {
  const [user, setUser] = useState<string>('loading');

  useEffect(() => {
    const fetchValid = async () => {
      const response = new dataFetching(`/users`);
      const fetchedData = await response.getData();
      setUser(fetchedData.data);
    };
    fetchValid();
  }, []);

  if (user) {
    sessionStorage.setItem('Page', 'Home');
  } else {
    sessionStorage.setItem('Page', 'signIn');
  }

  return <>{user === 'loading' ? null : user ? children : <Navigate to={'/signIn'} />}</>;
};

export default Protected;
