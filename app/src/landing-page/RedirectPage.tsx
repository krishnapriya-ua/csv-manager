import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/csv-management');
  }, [navigate]);

  return null;
} 