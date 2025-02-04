import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Higher order function/component
function Protected({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        // Check if the user is authenticated
        if (authStatus === false) {
            // If not authenticated, navigate to the login page
            navigate("/login");
        } else {
            // If authenticated, stop loading
            setLoading(false);
        }
    }, [authStatus, navigate]);

    // Show loading spinner while checking authentication status
    return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
