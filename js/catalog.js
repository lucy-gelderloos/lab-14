/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
let cart = new Cart([]);

// If the user comes back to the catalog page to the home page, this brings their cart back with them
if(localStorage.getItem('cart') !== null){
  cart = new Cart(JSON.parse(localStorage.getItem('cart')));
  updateCartPreview();
  updateCounter();
}

// On screen load, we call this method to put all of the product options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionElement = document.createElement('option');
    optionElement.textContent = Product.allProducts[i].name;
    optionElement.value = Product.allProducts[i].name;
    selectElement.appendChild(optionElement);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let itemName = document.getElementById('items').value;
  // TODO: get the quantity
  let quantity = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  cart.addItem(itemName, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let itemCount = document.getElementById('itemCount');
  if(itemCount.firstChild){
    itemCount.firstChild.remove();
  }
  let totalItems = 0
  for(let i = 0; i < cart.items.length; i++){
    totalItems += parseInt(cart.items[i].quantity);
  }
  itemCount.appendChild(document.createTextNode(`Items in cart: ${totalItems}`));
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let previewDiv = document.getElementById('cartContents');
  
  // TODO: Get the item and quantity from the form
  // If there are items already in the cart when the page loads, this shows them in the cart 
  // preview
  for(let i = 0; i < cart.items.length; i++){
    let itemName = cart.items[i].product;    
    let quantity = parseInt(cart.items[i].quantity);
    // TODO: Add a new element to the cartContents div with that information
    let cartPreview = document.createElement('p')
    cartPreview.appendChild(document.createTextNode(`${itemName}: ${quantity}`));
    previewDiv.appendChild(cartPreview);
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
