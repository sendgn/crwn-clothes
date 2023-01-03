import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
    const headerBlocks = [
        'Product',
        'Description',
        'Quantity',
        'Price',
        'Remove',
    ]

    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                {headerBlocks.map((block) => {
                    return (
                        <div className='header-block' key={block}>
                            <span>{block}</span>
                        </div>
                    );
                })}
            </div>
            {cartItems.map((cartItem) => 
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    );
}

export default Checkout;
