import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../data/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<User | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
