import React, { useState, memo, useEffect } from 'react';

import './style.css';

/**
App should never render
only those component will render which is upating
 */

const fetchEmployees = async (param) => {
  const url = 'https://run.mocky.io/v3/ed4683d2-f300-494d-9ee1-72d4fe30aa29';
  const response = await fetch(url);

  return await response.json();
};

const Input = ({ type = 'text', ...rest }) => <input type={type} {...rest} />;

/**
 * Table
 */
const Table = memo(({ lists = [] }) => (
  <table border="1" cellSpacing="0" rowSpacing="0">
    <thead>
      <tr>
        <th>id</th>
        <th>Employee Name</th>
      </tr>
    </thead>
    <tbody>
      {lists.map(({ id, employee_name }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{employee_name}</td>
        </tr>
      ))}
    </tbody>
  </table>
));

/**
 * App
 * it would render once
 */
const App = () => {
  const [value, setValue] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const searchUser = ({ target: { value } }) => {
    setValue(value);
  };

  const filterDetails = value
    ? employees.filter(
        ({ id, employee_name }) =>
          employee_name.toLowerCase().includes(value) || id === +value
      )
    : employees;

  const clearedValue = () => {
    setValue('');
  };

  return (
    <>
      <label>
        search:
        <Input
          onChange={searchUser}
          placeholder="enter employee name or id"
          value={value}
        />
        <button onClick={clearedValue}>X</button>
        <button onClick={searchUser}>Search</button>
      </label>

      <Table lists={filterDetails} />
    </>
  );
};

export default App;
