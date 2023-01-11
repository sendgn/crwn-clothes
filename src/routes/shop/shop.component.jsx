import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCategoriesAsync } from '../../store/categories/categories.action';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

/* Step 1. Uncomment the imports before doing Step 2. */
// import { addCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
// import SHOP_DATA from '../../shop-data';

const Shop = () => {
    /* Step 2. Uncomment to create categories collection in Firebase off of SHOP_DATA.
     * Step 3. Comment it again after the first render
     *         not to rewrite firebase collection over and over again on each page update,
     *         it should be done only once.
     */
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes> 
    );
}

export default Shop;
