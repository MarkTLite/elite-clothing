import { createContext, useEffect, useState } from "react";

import {SHOP_DATA} from '../assets/shop-data'
import { getCollectionAndDocs } from "../utils/firebase/firebase-utils";

export const CategoriesContext = createContext({
    categories: {},
    setCategories: () => null,
});

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    const value = { categories, setCategories };

    useEffect(()=>{
        const fetchCategories = async () => {
        const categoriesMap = await getCollectionAndDocs('products')
        setCategories(categoriesMap);
        }
        fetchCategories();
    },[]);

    // Send in Batch
    // useEffect(()=>{
    //     const sendShopDataBatch = async () => {
    //         await sendCollectionAndDocs('products', SHOP_DATA);
    //     }
    //     sendShopDataBatch();
    // },[])

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}