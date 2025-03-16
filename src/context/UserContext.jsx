import  { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const savedUser = localStorage.getItem('user');
    const [user, setUser] = useState(null);
    
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
    }

    useEffect(() => {
       if(!savedUser) return setUser(null);
         setUser(JSON.parse(savedUser));
    }, [ savedUser ]);

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};