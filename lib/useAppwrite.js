import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        fetchData();
    }
  
    // use effect array empty to only run at start
    return { data, isLoading, refetch }
}

export default useAppWrite;