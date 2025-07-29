function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)); 

            if (!this.cartItems)
            {
                this.cartItems = [];
            }
        },

        saveToStorage()
        {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId, quantity)
        {
            let matchingItem;

            this.cartItems.forEach(item => {
                if (productId === item.id)
                matchingItem = item;
            });

            if (matchingItem)
                matchingItem.quantity += quantity;
            else
            {
                this.cartItems.push({
                id: productId,
                quantity: quantity,
                deliveryOptionId: '1' 
                });
            }

            this.saveToStorage();
        },

        removeFromCart(productId)
        {
            const newCart = [];
            this.cartItems.forEach(item => {
                if (item.id !== productId)
                    newCart.push(item);
            });

            this.cartItems = newCart;

            this.saveToStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;

            this.cartItemscart.forEach(item => {
                if (productId === item.id)
                matchingItem = item;
            });

            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage();
        }
    };    

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);