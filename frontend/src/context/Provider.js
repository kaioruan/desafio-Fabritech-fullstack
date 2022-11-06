import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function AdminProvider({ children }) {
  const [users, setUsers] = useState([]);
  const contextType = useMemo(() => ({
    users, setUsers,
  }), []);

  return (
    <Context.Provider value={ contextType }>
      {children}
    </Context.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProvider;
