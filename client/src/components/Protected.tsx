import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { API } from '../api/Api';
import { Navigate } from 'react-router-dom';

type prop = {
  children: ReactNode;
};

const Protected = ({ children }: prop) => {
  const [user, setUser] = useState<string>('loading');

  useEffect(() => {
    const fetchValid = async () => {
      const response = await fetch(`${API}/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setUser(response.data);
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
