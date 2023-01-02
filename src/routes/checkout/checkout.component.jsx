import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

const Checkout = () => {
    const headerItems = [
        'Product',
        'Description',
        'Quantity',
        'Price',
        'Remove',
    ]

    const {
        cartItems,
        removeItemFromCart,
        incrementCount,
        decrementCount,
    } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-row'>
                {headerItems.map((item) => {
                    return <span key={item}>{item}</span>
                })}
            </div>
            {cartItems.map((item) => {
                const { id, imageUrl, name, quantity, price } = item;
                return (
                    <div className='checkout-row' key={id}>
                        <img className='checkout-img' src={imageUrl} alt={name} />
                        <div>{name}</div>
                        <div className='quantity'>
                            <span className='checkout-control-btn' onClick={() => decrementCount(item)}>❮</span>
                            <span>{quantity}</span>
                            <span className='checkout-control-btn' onClick={() => incrementCount(item)}>❯</span>
                        </div>
                        <div>{price}</div>
                        <div className='checkout-control-btn' onClick={() => removeItemFromCart(item)}>🗙</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Checkout;
