import { useEffect, useState } from "react";

type endpoint = string;
type method = "GET" | "POST" | "PUT" | "DELETE";
type body = any;

const useFetch = (endpoint: endpoint, method: method = "GET", body?: body) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/${endpoint}`,
                    {
                        method,
                        headers: {
                            "Content-Type": "application/json",
                            // Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(body),
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setData(data);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
                else setError("An error occurred");
            }
            setLoading(false);
        };

        getData();
    }, [body, endpoint, method]);

    return {
        data,
        loading,
        error,
    };
};
export default useFetch;
