import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import './LoginForm.css';

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        role: USER_ROLES.STUDENT,
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData);
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-container">
            <div className="login-background"></div>

            <div className="login-card glass-card">
                <div className="login-header">
                    <div className="login-icon">🚌</div>
                    <h2>College Bus Tracker</h2>
                    <p className="text-muted">Sign in to track your bus in real-time</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="role">Select Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="select"
                            required
                        >
                            <option value={USER_ROLES.STUDENT}>Student</option>
                            <option value={USER_ROLES.DRIVER}>Driver</option>
                            <option value={USER_ROLES.ADMIN}>Admin</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="text-sm text-muted text-center">
                        Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
                    </p>
                    <p className="text-sm text-muted text-center" style={{ marginTop: '0.5rem' }}>
                        Demo accounts available for testing
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
