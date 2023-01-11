import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

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

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

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
