'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '../utils/api';
import { getToken } from '../utils/token';


const useAuthCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const token = getToken();
            console.log(token);
            if (!token) {
                router.push('/login');  // If no token, redirect to login
                return;
            }

            try {
                const response = await api.get('/auth/verifyToken', {
                   
                });
                if (response.data.valid) {
                    setIsAuthenticated(true);  // User is authenticated
                    console.log("Authenticated user sucesfully using /api/verifyToken")
                } else {
                    localStorage.removeItem('token');  // Clear invalid token
                    router.push('/login');  // Redirect to login
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                router.push('/login');  // Redirect to login on failure
            }
        };

        checkToken();
    }, [router]);

    return isAuthenticated;
};

export default useAuthCheck;
