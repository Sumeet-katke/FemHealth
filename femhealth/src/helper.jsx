import React, {useState, useEffect, createContext} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';
import { header } from "framer-motion/client";

const UserContext = createContext();

export const StateProvider = ({children}) => {

    const fetch = async ({
        method = 'GET',
        url = '',
        data = null,
        params = {},
        headers = {},
        needAuth = false,
        responseType = 'json',
        timeout = 50000,
    }) => {
        const full_url = `${base_url}${url}`;
        
        try {
            let storedAccessToken = Cookies.get('accessToken');
    
            if (storedAccessToken && needAuth) {
                headers = { ...headers, 'Authorization': `Bearer ${storedAccessToken}` };
            } else if (needAuth && !storedAccessToken) {
              toast.dismiss();
                refreshAuthToken()
                toast.error("Authentication Failed. Please login again");
                console.error('Auth Error: No Token found');
                logout();
                return { error: "Authentication Failed", status: 401 };  // Ensure return value
            }
    
            const response = await axios({
                method,
                url: full_url,
                data,
                params,
                headers,
                responseType,
                timeout,
            });
    
            return { data: response.data, status: response.status }; // Always return an object
    
        } catch (error) {
            console.error('Error:', error);
            
            if(error.response.data){
              console.log(error.response.data)
            }
    
            if (error.response) {
              toast.dismiss();
              if (
                error.response &&
                typeof error.response.data === "object" &&
                !Array.isArray(error.response.data) &&
                error.response.data.message &&
                typeof error.response.data.message === "string"
            ) {
                // If response data is an object with a valid 'message' key, show the message
                toast.error(error.response.data.message);
            } else if (typeof error.response.data === "string") {
                // If response data is a plain string, format and show it
                const errorMessage = error.response.data.trim();
                
                // Ensure it's not an HTML response
                if (errorMessage.startsWith("<!DOCTYPE") || errorMessage.startsWith("<html")) {
                    toast.error("An unexpected error occurred. Please try again later.");
                } else {
                    toast.error(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
                }
            } else {
                // Hardcoded fallback message
                toast.error("An error occurred. Please try again later.");
            }
    
                if (error.response.status === 400) {
                    return { error: error.response.data, status: 400 };
                }
    
                if (error.response.status === 401) {
                    try {
                        const newToken = await refreshAuthToken();
                        if (newToken) {
                            Cookies.set('accessToken', newToken);
                            headers = { ...headers, 'Authorization': `Bearer ${newToken}` };
    
                            // Retry the request with the new token
                            const retryResponse = await axios({ method, url: full_url, data, params, headers, responseType, timeout });
                            return { data: retryResponse.data, status: retryResponse.status };
                        } else {
                            logout();
                            return { error: "Unauthorized", status: 401 };
                        }
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        logout();
                        return { error: "Unauthorized", status: 401 };
                    }
                }
    
                return { error: error.response.data, status: error.response.status };
            } else if (error.request) {
                // addError('No response from server.');
                return { error: 'No response from server.', status: 500 };
            } else {
                return { error: error.message, status: 500 };
            }
        }
    };
    return (
        <UserContext.Provider
        value = {{


        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserState = () => React.useContext(UserContext);