// Import necessary dependencies from React and Axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the API URL for fetching and manipulating user data
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
    // State hooks to manage user data
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  // useEffect to fetch users data when the component mounts
useEffect(() => {
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Function to handle adding a new user
  const handleAddUser = () => {
    axios.post(API_URL, newUser)
      .then(response => setUsers(prevUsers => [...prevUsers, response.data]))
      .catch(error => console.error('Error adding user:', error));
  };

 // Function to handle editing a user
  const handleEditUser = (id, updatedUser) => {
    axios.put(`${API_URL}/${id}`, updatedUser)
      .then(response => {
        setUsers(prevUsers => prevUsers.map(user => (user.id === id ? response.data : user)));
        setEditingUser(null);
        setEditedUserData({
          name: '',
          username: '',
          email: '',
          address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
              lat: '',
              lng: '',
            },
          },
          phone: '',
          website: '',
          company: {
            name: '',
            catchPhrase: '',
            bs: '',
          },
        });
      })
      .catch(error => console.error('Error editing user:', error));
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setUsers(prevUsers => prevUsers.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

 // Function to handle editing a user property
  const handleEditUserProperty = (property, value) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Add new user form */}
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        {/* Add similar input fields for other properties like address, geo, phone, website, company */}
        <input
          type="text"
          placeholder="Street"
          value={newUser.address.street}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, street: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Suite"
          value={newUser.address.suite}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, suite: e.target.value } })}
        />
        <input
          type="text"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, city: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Zipcode"
          value={newUser.address.zipcode}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, zipcode: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={newUser.address.geo.lat}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, geo: { ...newUser.address.geo, lat: e.target.value } } })}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={newUser.address.geo.lng}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, geo: { ...newUser.address.geo, lng: e.target.value } } })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Website"
          value={newUser.website}
          onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={newUser.company.name}
          onChange={(e) => setNewUser({ ...newUser, company: { ...newUser.company, name: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Company CatchPhrase"
          value={newUser.company.catchPhrase}
          onChange={(e) => setNewUser({ ...newUser, company: { ...newUser.company, catchPhrase: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Company BS"
          value={newUser.company.bs}
          onChange={(e) => setNewUser({ ...newUser, company: { ...newUser.company, bs: e.target.value } })}
        />
        <button onClick={handleAddUser}>Add User</button>
        </div>

{/* Display existing users */}
<div>
  <h2>Users</h2>
  <ul>
    {users.map(user => (
      <li key={user.id}>
        <div>
          <strong>Name:</strong> {user.name}{' '}
          {editingUser === user.id && (
            <input
              type="text"
              placeholder="New Name"
              value={editedUserData.name || user.name}
              onChange={(e) => handleEditUserProperty('name', e.target.value)}
            />
          )}
          <br />

          <strong>Username:</strong> {user.username}{' '}
          {editingUser === user.id && (
            <input
              type="text"
              placeholder="New Username"
              value={editedUserData.username || user.username}
              onChange={(e) => handleEditUserProperty('username', e.target.value)}
            />
          )}
          <br />

          <strong>Email:</strong> {user.email}{' '}
          {editingUser === user.id && (
            <input
              type="text"
              placeholder="New Email"
              value={editedUserData.email || user.email}
              onChange={(e) => handleEditUserProperty('email', e.target.value)}
            />
          )}
          <br />

          {/* Add similar input fields for other properties like address, geo, phone, website, company */}
          <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}{' '}
          {editingUser === user.id && (
            <>
              <input
                type="text"
                placeholder="New Street"
                value={editedUserData.address.street || user.address.street}
                onChange={(e) => handleEditUserProperty('address', { ...editedUserData.address, street: e.target.value })}
              />
              <input
                type="text"
                placeholder="New Suite"
                value={editedUserData.address.suite || user.address.suite}
                onChange={(e) => handleEditUserProperty('address', { ...editedUserData.address, suite: e.target.value })}
              />
              <input
                type="text"
                placeholder="New City"
                value={editedUserData.address.city || user.address.city}
                onChange={(e) => handleEditUserProperty('address', { ...editedUserData.address, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="New Zipcode"
                value={editedUserData.address.zipcode || user.address.zipcode}
                onChange={(e) => handleEditUserProperty('address', { ...editedUserData.address, zipcode: e.target.value })}
              />
            </>
          )}
          <br />

          {/* Add similar input fields for geo, phone, website, company */}
          <strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}{' '}
          {editingUser === user.id && (
            <>
              <input
                type="text"
                placeholder="New Latitude"
                value={editedUserData.address.geo.lat || user.address.geo.lat}
                onChange={(e) => handleEditUserProperty('address', { ...editedUserData.address, geo: { ...editedUserData.address.geo, lat: e.target.value } })}
              />
              <input
                type="text"
                placeholder="New Longitude"
                value={editedUserData.address.geo.lng || user.address.geo.lng}
                onChange={(e) => handleEditUserProperty('address', { ...editedUserData.address, geo: { ...editedUserData.address.geo, lng: e.target.value } })}
              />
            </>
          )}
          <br />

          <strong>Phone:</strong> {user.phone}{' '}
          {editingUser === user.id && (
            <input
              type="text"
              placeholder="New Phone"
              value={editedUserData.phone || user.phone}
              onChange={(e) => handleEditUserProperty('phone', e.target.value)}
            />
          )}
          <br />

          <strong>Website:</strong> {user.website}{' '}
          {editingUser === user.id && (
            <input
              type="text"
              placeholder="New Website"
              value={editedUserData.website || user.website}
              onChange={(e) => handleEditUserProperty('website', e.target.value)}
            />
          )}
          <br />

          {/* Add similar input fields for company */}
          <strong>Company:</strong> {user.company.name}, {user.company.catchPhrase}, {user.company.bs}{' '}
          {editingUser === user.id && (
            <>
              <input
                type="text"
                placeholder="New Company Name"
                value={editedUserData.company.name || user.company.name}
                onChange={(e) => handleEditUserProperty('company', { ...editedUserData.company, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="New Company CatchPhrase"
                value={editedUserData.company.catchPhrase || user.company.catchPhrase}
                onChange={(e) => handleEditUserProperty('company', { ...editedUserData.company, catchPhrase: e.target.value })}
              />
              <input
                type="text"
                placeholder="New Company BS"
                value={editedUserData.company.bs || user.company.bs}
                onChange={(e) => handleEditUserProperty('company', { ...editedUserData.company, bs: e.target.value })}
              />
            </>
          )}
        </div>

        <div>
          <button onClick={() => setEditingUser(user.id)}>Edit</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>

          {editingUser === user.id && (
            <button onClick={() => handleEditUser(user.id, editedUserData)}>Save</button>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>
</div>
);
};

export default App;

