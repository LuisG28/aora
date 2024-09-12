import { useEffect, useState } from "react";

const useAppWrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn();
            setData(response);
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const refetch = () => fetchData();

    return { data, refetch, isLoading }
}

export default useAppWrite;