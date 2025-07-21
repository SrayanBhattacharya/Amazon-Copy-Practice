export const cart = [];

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
}