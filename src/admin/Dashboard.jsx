// components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../feauture/auth/authSlice';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/api/v1/admin/users');
      setUsers(data.data.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemLogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/api/v1/admin/logs');
      setLogs(data.logs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/admin/users/${userId}`);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleCancelSubscription = async (userId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        await axios.post(`http://localhost:3000/api/v1/admin/subscriptions/cancel/${userId}`);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to cancel subscription');
      }
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'logs') {
      fetchSystemLogs();
    }
  }, [activeTab]);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={activeTab === 'logs' ? 'active' : ''}
          onClick={() => setActiveTab('logs')}
        >
          System Logs
        </button>
      </nav>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {activeTab === 'users' && (
        <div className="users-section">
          <h2>User Management</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Subscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.isSubscribed ? 
                      `${user.subscriptionPlan || 'Active'}` : 
                      'None'}
                  </td>
                  <td>
                    <button onClick={() => setSelectedUser(user)}>Details</button>
                    {user.isSubscribed && (
                      <button onClick={() => handleCancelSubscription(user._id)}>
                        Cancel Sub
                      </button>
                    )}
                    <button 
                      className="danger" 
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedUser && (
            <div className="user-details-modal">
              <h3>User Details: {selectedUser.name}</h3>
              <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="logs-section">
          <h2>System Logs</h2>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Endpoint</th>
                <th>Method</th>
                <th>Status</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id}>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                  <td>{log.endpoint}</td>
                  <td>{log.method}</td>
                  <td>{log.statusCode}</td>
                  <td>{log.user?.email || 'Anonymous'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;