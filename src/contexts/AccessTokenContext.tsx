import { useContext, useState, createContext, useEffect } from "react";

const AccessTokenContext = createContext<string>("");

export const useAccessToken = () => {
    return useContext(AccessTokenContext);
};

export const AccessTokenProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getAccessToken = async () => {
            setLoading(true);
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/authenticate`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-private-key": process.env.REACT_APP_PRIVATE_KEY,
                    } as HeadersInit,
                }
            );

            const data = await response.json();

            setAccessToken(data.accessToken);
            setLoading(false);
        };

        getAccessToken();
    }, []);

    return (
        <AccessTokenContext.Provider value={accessToken}>
            {!loading && children}
        </AccessTokenContext.Provider>
    );
};
