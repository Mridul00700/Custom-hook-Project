import { useState, useCallback } from 'react';

const useApi = (requestConfig, applyData) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url,
                {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                    headers: requestConfig.headers ? requestConfig.headers : {},
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);
        } catch (error) {
            setError(error)
        }
        setLoading(false);
    }, [applyData, requestConfig.body, requestConfig.headers, requestConfig.method, requestConfig.url]);


    return { sendRequest, loading, error };
}

export default useApi;