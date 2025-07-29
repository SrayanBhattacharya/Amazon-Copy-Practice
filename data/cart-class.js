class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 

        if (!this.cartItems)
        {
            this.cartItems = [];
        }
    }

    saveToStorage()
    {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

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
    }

    removeFromCart(productId)
    {
        const newCart = [];
        this.cartItems.forEach(item => {
            if (item.id !== productId)
                newCart.push(item);
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItemscart.forEach(item => {
            if (productId === item.id)
            matchingItem = item;
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');