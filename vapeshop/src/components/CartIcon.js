import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../components/AppContext';

const CartIcon = () => {
  const { cartItemCount } = useAuth(); // Fix: Call useAuth() without parentheses

  return (
    <span style={{ position: 'relative' }}>
      <NavLink to="/cart">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="text-[#623288] text-2xl cursor-pointer"
        />
      </NavLink>
      {cartItemCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: 'red',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
            color: 'white',
          }}
          className="animate-pulse"
        >
          {cartItemCount}
        </span>
      )}
    </span>
  );
};

export default CartIcon;
