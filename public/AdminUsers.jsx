import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '', middleName: '', lastName: '', email: '', phone: '', password: '',
    address: '', city: '', state: '', postcode: '', dateOfBirth: '', nationalId: '', gender: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Input validation function
  const validateForm = (data) => {
    const errors = {};
    const nameRegex = /^(?!.*(\w)\1\1)[A-Za-z]{3,20}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail|yahoo|outlook)\.(com|in|org\.np)$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,20}$/;
    const phoneRegex = /^(97|98)\d{8}$/;

    if (!data.firstName || !nameRegex.test(data.firstName)) {
      errors.firstName = 'First Name must be 3-20 letters, no triple repeats';
    }
    if (!data.lastName || !nameRegex.test(data.lastName)) {
      errors.lastName = 'Last Name must be 3-20 letters, no triple repeats';
    }
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'Invalid email (use gmail, yahoo, or outlook with .com, .in, or .org.np)';
    }
    if (!data.phone || !phoneRegex.test(data.phone)) {
      errors.phone = 'Phone must be 10 digits starting with 97 or 98';
    }
    if (data.password && (!passwordRegex.test(data.password))) {
      errors.password = 'Password must be 6-20 chars with uppercase, lowercase, number, and symbol (no spaces)';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost/react-auth-backend/admin/admin_panel.php');
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      setError('Failed to fetch users: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle admin authentication
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if ((adminUsername === 'admin' && adminPassword === 'admin123') ||
        (adminUsername === 'a' && adminPassword === 'a')) {
      setShowAuthModal(false);
      fetchUsers();
    } else {
      setError('Invalid admin credentials!');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Insert new user
  const handleInsert = async (e) => {
    e.preventDefault();
    if (!validateForm(newUser)) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost/react-auth-backend/admin/insert_user.php', newUser);
      if (response.data.success) {
        setUsers([...users, response.data.data]);
        setNewUser({
          firstName: '', middleName: '', lastName: '', email: '', phone: '', password: '',
          address: '', city: '', state: '', postcode: '', dateOfBirth: '', nationalId: '', gender: ''
        });
        setShowAddModal(false);
        setFieldErrors({});
        alert('User added successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Insert error:', err.response?.data || err.message);
      setError('Failed to add user: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm(editingUser)) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost/react-auth-backend/admin/update_user.php', editingUser);
      if (response.data.success) {
        setUsers(users.map(user => user.id === editingUser.id ? response.data.data : user));
        setShowEditModal(false);
        setEditingUser(null);
        setFieldErrors({});
        alert('User updated successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError('Failed to update user: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost/react-auth-backend/admin/delete_user.php', { id });
      if (response.data.success) {
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setError('Failed to delete user: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Open add modal
  const openAddModal = () => {
    setNewUser({
      firstName: '', middleName: '', lastName: '', email: '', phone: '', password: '',
      address: '', city: '', state: '', postcode: '', dateOfBirth: '', nationalId: '', gender: ''
    });
    setFieldErrors({});
    setError('');
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (user) => {
    setEditingUser({ ...user, password: '' }); // Don't prefill password
    setFieldErrors({});
    setError('');
    setShowEditModal(true);
  };

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Render auth modal
  if (showAuthModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#6f4e37] mb-6 text-center">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6f4e37] outline-none"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6f4e37] outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-600"
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#6f4e37] text-white p-2 rounded-full hover:bg-[#5a3c2e] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render loading or error state
  if (loading) return <div className="text-center p-8 text-[#6f4e37] text-lg">Loading...</div>;
  if (error && !users.length) return <div className="text-red-500 text-center p-4">{error}</div>;

  // Render main content
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FDEDD9] to-[#f8cfa0] p-6">
      <div className="container mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#6f4e37]">Admin - User Management</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add New User
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-700">ID</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Name</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Email</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Phone</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Address</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Date of Birth</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">National ID</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Gender</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Photo</th>
                <th className="py-3 px-4 border-b text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.firstName} {user.middleName || ''} {user.lastName}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">{user.address}, {user.city}, {user.state} {user.postcode}</td>
                  <td className="py-2 px-4 border-b">{user.dateOfBirth || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{user.nationalId || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{user.gender || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                    ) : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openEditModal(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-1000">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-[#6f4e37] mb-6">Add New User</h3>
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              <form onSubmit={handleInsert} className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={newUser.middleName}
                    onChange={(e) => setNewUser({ ...newUser, middleName: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Phone *"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password *"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City"
                    value={newUser.city}
                    onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="State/Province"
                    value={newUser.state}
                    onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={newUser.postcode}
                    onChange={(e) => setNewUser({ ...newUser, postcode: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={newUser.dateOfBirth}
                    onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="National ID"
                    value={newUser.nationalId}
                    onChange={(e) => setNewUser({ ...newUser, nationalId: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <select
                    value={newUser.gender}
                    onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-span-2 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-1000">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-[#6f4e37] mb-6">Edit User</h3>
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={editingUser.firstName}
                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={editingUser.middleName || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, middleName: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={editingUser.lastName}
                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Phone *"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                    required
                  />
                  {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="New Password (leave blank to keep current)"
                    value={editingUser.password || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                  {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    value={editingUser.address || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City"
                    value={editingUser.city || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="State/Province"
                    value={editingUser.state || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, state: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={editingUser.postcode || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, postcode: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={editingUser.dateOfBirth || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, dateOfBirth: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="National ID"
                    value={editingUser.nationalId || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, nationalId: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  />
                </div>
                <div className="relative">
                  <select
                    value={editingUser.gender || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })}
                    className="w-full p-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-span-2 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;