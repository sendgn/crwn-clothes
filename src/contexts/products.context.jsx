import { createContext, useEffect, useState } from 'react';

/* Step 1. Uncomment imports before doing Step 2. */
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data.js';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    /* Step 2. Uncomment to create categories collection in Firebase off of SHOP_DATA.
     * Step 3. Comment it again after the first render
     *         not to rewrite firebase collection over and over again on each page update,
     *         it should be done only once.
     */
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
        }

        getCategoriesMap();
    }, []);

    const value = { products };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}
