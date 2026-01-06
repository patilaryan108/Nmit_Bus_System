import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { USER_ROLES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import './SignupForm.css';

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: USER_ROLES.STUDENT,
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: '',
        studentId: '',
        licenseNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Role-specific validation
        if (formData.role === USER_ROLES.STUDENT && !formData.studentId) {
            setError('Student ID is required for students');
            return;
        }

        if (formData.role === USER_ROLES.DRIVER && !formData.licenseNumber) {
            setError('License number is required for drivers');
            return;
        }

        setLoading(true);

        try {
            // Prepare data for API
            const userData = {
                username: formData.username,
                password: formData.password,
                role: formData.role,
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            };

            if (formData.role === USER_ROLES.STUDENT) {
                userData.studentId = formData.studentId;
            } else if (formData.role === USER_ROLES.DRIVER) {
                userData.licenseNumber = formData.licenseNumber;
            }

            await authAPI.register(userData);
            
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
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
        <div className="signup-container">
            <div className="signup-background"></div>

            <div className="signup-card glass-card">
                <div className="signup-header">
                    <div className="signup-icon">🚌</div>
                    <h2>Create Account</h2>
                    <p className="text-muted">Join the College Bus Tracking System</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="role">I am a</label>
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
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username *</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input"
                                placeholder="johndoe"
                                required
                                minLength={3}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input"
                                placeholder="john@college.edu"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input"
                                placeholder="1234567890"
                            />
                        </div>
                    </div>

                    {formData.role === USER_ROLES.STUDENT && (
                        <div className="form-group">
                            <label htmlFor="studentId">Student ID *</label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                className="input"
                                placeholder="STU001"
                                required
                            />
                        </div>
                    )}

                    {formData.role === USER_ROLES.DRIVER && (
                        <div className="form-group">
                            <label htmlFor="licenseNumber">License Number *</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                className="input"
                                placeholder="DL12345678"
                                required
                            />
                        </div>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input"
                                placeholder="Min 6 characters"
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input"
                                placeholder="Re-enter password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-lg" 
                        disabled={loading} 
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="signup-footer">
                        <p className="text-sm text-muted text-center">
                            Already have an account? <Link to="/" className="link">Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
