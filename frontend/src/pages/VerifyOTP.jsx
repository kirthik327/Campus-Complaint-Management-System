import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/forgot-password', { replace: true });
  }, [navigate]);

  return null;
};

export default VerifyOTP;
