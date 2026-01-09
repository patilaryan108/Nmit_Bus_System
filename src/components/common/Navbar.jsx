import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    const getRoleDisplay = (role) => {
        const roleMap = {
            [USER_ROLES.STUDENT]: 'Student',
            [USER_ROLES.DRIVER]: 'Driver',
            [USER_ROLES.ADMIN]: 'Admin'
        };
        return roleMap[role] || role;
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="brand-icon">🚌</div>
                    <h1 className="brand-title">College Bus Tracker</h1>
                </div>

                <div className="navbar-actions">
                    <ThemeToggle />
                    {user && (
                        <>
                            <div className="user-info">
                                <div className="user-avatar">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className="user-details">
                                    <p className="user-name">{user.name}</p>
                                    <span className="badge badge-primary">{getRoleDisplay(user.role)}</span>
                                </div>
                            </div>
                            <button onClick={logout} className="btn btn-secondary btn-sm">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
