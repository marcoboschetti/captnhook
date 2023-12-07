import React from "react";
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const BucketContext = createContext();

export const useBucket = () => {
    return useContext(BucketContext);
};

export const BucketProvider = ({ children }) => {
    const [bucketState, setSingletonState] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let searchParams = new URLSearchParams(window.location.search);
        let bucketIdQueryParam = searchParams.get('bucket_id');
        var bucketID = bucketIdQueryParam;

        if (!bucketIdQueryParam) {
            bucketID = uuidv4()
            navigate({
                pathname: '/',
                search: '?bucket_id=' + bucketID,
            });
        }
        setSingletonState({
            id: bucketID
        });
    }, []);

    return (
        <BucketContext.Provider value={bucketState}>
            {children}
        </BucketContext.Provider>
    );
};