import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from './checkout.styles';

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
        <CheckoutContainer>
            <CheckoutHeader>
                {headerBlocks.map((block) => {
                    return (
                        <HeaderBlock key={block}>
                            <span>{block}</span>
                        </HeaderBlock>
                    );
                })}
            </CheckoutHeader>
            {cartItems.map((cartItem) => 
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    );
}

export default Checkout;
