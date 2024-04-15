import {useState} from "react";

const useLocalStorage = (key: string, initialValue: string) => {
    // Retrieve initial value from localStorage if available, otherwise use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error fetching from localStorage:', error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            // Allow value to be a function to mimic useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to localStorage
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    const removeValue = () => {
        try {
            // Remove from state
            setStoredValue(undefined);
            // Remove from localStorage
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    };

    return [storedValue, setValue, removeValue];
};

export default useLocalStorage;