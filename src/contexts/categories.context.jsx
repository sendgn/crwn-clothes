import { createContext, useEffect, useState } from 'react';

/* Step 1. Uncomment imports before doing Step 2. */
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../data/shop-data';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

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
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}
