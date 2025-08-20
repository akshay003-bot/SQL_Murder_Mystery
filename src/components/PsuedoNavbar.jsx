import React, { useEffect, useState } from 'react';
import myImage from '../assets/Screenshot_2025-04-17_100946-removebg-preview (1).png';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';

function getStoredToken() {
  const t = localStorage.getItem('token');
  // treat empty / stringified nulls as no token
  if (!t || t === 'undefined' || t === 'null' || t.trim().length === 0) return null;
  return t;
}

function isJwtValid(token) {
  try {
    const [, payload] = token.split('.');
    if (!payload) return false;
    const data = JSON.parse(atob(payload));
    // if no exp, assume valid; else check expiry (exp is seconds)
    return !data.exp || data.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const recomputeAuth = () => {
    const t = getStoredToken();
    const ok = !!t && isJwtValid(t);
    if (t && !ok) {
      // clear expired/invalid token
      localStorage.removeItem('token');
    }
    setIsLoggedIn(ok);
  };

  useEffect(() => {
    // run once on mount
    recomputeAuth();

    // update when token changes (custom event) or in other tabs (storage)
    const handler = () => recomputeAuth();
    window.addEventListener('auth-changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('auth-changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return (
    <div className='fixed z-5 w-full flex justify-between items-center 
    py-3 px-4 sm:px-20 xl:px-32'>
      <img
        src={assets.logo}
        alt='logo'
        className='w-32 sm:w-44 cursor-pointer'
        onClick={() => navigate('/')}
      />
    </div>
  );
};

export default Navbar;