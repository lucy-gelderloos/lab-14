/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');

let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let cartTable = document.querySelector('#cart > tbody')
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.firstChild);
}
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let cartTable = document.querySelector('#cart > tbody')
  
  // TODO: Iterate over the items in the cart
  for(let i = 0; i < cart.items.length; i++){
  
  // TODO: Create a TR
  let cartRow = document.createElement('tr');
  cartRow.classList.add('cart-row');
  
  // TODO: Create a TD for the delete link, quantity,  and the item
  let deleteCell = document.createElement('td');
  deleteCell.id = cart.items[i].product;
  deleteCell.appendChild(document.createTextNode('X'));
  deleteCell.classList.add('center');
  deleteCell.classList.add('red')
  deleteCell.addEventListener('click', removeItemFromCart);

  let qtyCell = document.createElement('td');
  qtyCell.appendChild(document.createTextNode(cart.items[i].quantity));
  qtyCell.classList.add('center');

  let itemCell = document.createElement('td');
  itemCell.appendChild(document.createTextNode(cart.items[i].product));
  
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  cartTable.appendChild(cartRow);
  cartRow.appendChild(deleteCell);
  cartRow.appendChild(qtyCell);
  cartRow.appendChild(itemCell);

  }
}

function removeItemFromCart(event) {
  event.preventDefault();

  let name = event.target.id;
  cart.removeItem(name);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem()
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart()

}

// This will initialize the page and draw the cart on screen
renderCart();
