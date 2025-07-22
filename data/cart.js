export let cart = JSON.parse(localStorage.getItem('cart')); 
if (!cart)
{
  cart = [];
}

function saveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity)
{
  let matchingItem;

  cart.forEach(item => {
    if (productId === item.id)
      matchingItem = item;
  });

  if (matchingItem)
    matchingItem.quantity += quantity;
  else
  {
    cart.push({
      id: productId,
      quantity: quantity
    });
  }

  saveToStorage();
}

export function removeFromCart(productId)
{
  const newCart = [];
  cart.forEach(item => {
    if (item.id !== productId)
      newCart.push(item);
  });

  cart = newCart;

  saveToStorage();
}