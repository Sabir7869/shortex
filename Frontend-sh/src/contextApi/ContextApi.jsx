import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const getToken = () => {
        try {
            const storedToken = localStorage.getItem("JWT_TOKEN");
            if (!storedToken) return null;
            
            // Try to parse as JSON first (new format)
            try {
                return JSON.parse(storedToken);
            } catch {
                // If JSON parse fails, it might be stored as plain string (old format)
                return storedToken;
            }
        } catch {
            // If any error occurs, clear the corrupted token and return null
            localStorage.removeItem("JWT_TOKEN");
            return null;
        }
    };

    const [token, setToken] = useState(getToken());

    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}