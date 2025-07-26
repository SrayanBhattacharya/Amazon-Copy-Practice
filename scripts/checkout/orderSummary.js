import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {getProduct, products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';

export function renderOrderSummary(){
  let cartHTML = '';

  cart.forEach(item => {
      const productId = item.id;
      const product = getProduct(productId);

      const deliveryOptionId = item.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDay, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');

      cartHTML += `
          <div class="cart-item-container js-cart-item-container-${product.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${product.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-item" data-product-id="${product.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(product, item)}
                </div>
              </div>
            </div>
      `;
  });

  function deliveryOptionHTML(product, item) {

    let html = '';

    deliveryOptions.forEach(option => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDay, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;

      const isChecked = option.id === item.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${product.id}" data-delivery-option-id="${option.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${product.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  };

  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-item').forEach(deleteLink => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);

      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach(element => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}