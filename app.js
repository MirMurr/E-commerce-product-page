if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //remove item from cart
    const removeCartItemButton = document.getElementsByClassName('remove-btn');
    for(let i = 0; i < removeCartItemButton.length; i++) { 
        let button = removeCartItemButton[i]
        button.addEventListener('click', removeCartItem)

        updateCartTotal()
    }

    //qty change
    let quantityInputs = document.getElementsByClassName('quantity-input') /*changes the cart quantity*/
    for(let i = 0; i < quantityInputs.length; i++) {
        let quantityInput = quantityInputs[i]
        quantityInput.addEventListener('change', quantityChanged) //it will listen to any change event in the input field
    } 

    //add item to cart
    let addToCartButtons = document.getElementsByClassName('add-item')
    for ( let i = 0; i < addToCartButtons.length; i++) {
        let addToCartButton = addToCartButtons[i]
        addToCartButton.addEventListener('click', addToCartClicked)
    }

    //close the cart
    let closeButton = document.getElementById('close-cart')
    closeButton.addEventListener('click', closeCart)

    //open the cart
    let cartIcon = document.querySelector('.cart-icon')
    cartIcon.addEventListener('click', displayCartContent)
}

//changing cart quantity value
let cartQuantityElement = document.querySelector('.cart-quantity')
let quantityInputElement = document.querySelector('.quantity-input')
let cartIconQuantityElement = document.querySelector('.icon-cart-qty')

cartIconQuantityElement.innerHTML = quantityInputElement.value; 
cartQuantityElement.innerHTML = cartIconQuantityElement.value


// hides or displays the quantity above the shopping cart depending on the number of items in cart
function displayCartQuantity() { 
    if (cartIconQuantityElement.innerHTML <= 0) {
        cartIconQuantityElement.style.display="none";
    } else {
        cartIconQuantityElement.style.display="block";
    }
}
displayCartQuantity()

//displays the message when the cart is empty
function cartMessageEmpty() {
    let cartMessage = document.getElementsByClassName('default-text-empty')[0]
    cartMessage.style.display ="block"
}

//changes the cart-icon quantity´s value 
function changeCartQuantity() { 
    cartIconQuantityElement.innerHTML = quantityInputElement.value
    cartQuantityElement.innerHTML = quantityInputElement.value

    displayCartQuantity()
}

//actions to perform when our quantity is changed 
function quantityChanged(event) { 
    //1. get the quantity element
    let quantityInput = event.target //this will be the target of our event
    //2. check whether the input´s value is a valid value
    if (isNaN(quantityInput.value) || quantityInput <= 0) { 
        quantityInput.value = 1
    }
}

function addToCartClicked() {
    let addToCartButton = document.querySelector('.add-item')
    let shopItem = addToCartButton.parentElement.parentElement 
    let title = shopItem.getElementsByClassName('title')[0].innerHTML
    let price = shopItem.getElementsByClassName('discounted-price')[0].innerHTML 
    let productImageSrc = document.getElementsByClassName('main-img')[0].src
    let cartQuantityElement = document.querySelector('.cart-quantity')

    addItemToCart(title, price, productImageSrc, cartQuantityElement)
    updateCartTotal()
    changeCartQuantity()
}

function addItemToCart(title, price, productImageSrc, cartQuantityElement){ 
    //create a new row 
    let cartRow = document.createElement('div')
    let cartItemsContainer = document.getElementsByClassName('cart-items-container')[0]
    let cartItemNames = document.getElementsByClassName('cart-item-name')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerHTML == title) {
            alert('This item is already added to the cart')
            return //important: calling return will stop the function from running
        }
    }

    let cartRowContents = `
    <div class="cart-items-container"> <!--this is when we have an item in the cart, must be empty in the end-->
        <div class="cart-item"> <!--or rhis must be empty and the bove container must be kept? NOPE-->
          <div class="cart-column">
            <img class="cart-item-image" src="${productImageSrc}" alt="sneaker image">
          </div>
          <div class="cart-column">
            <div class="cart-item-name">${title}</div>
            <span class="cart-price">${price}</span>
            <span>x</span>
            <span class="cart-quantity">${cartQuantityElement}</span>
            <span class="cart-total" style="color: black"></span>
          </div>
          <div class="cart-column">
            <button type="button" class="remove-btn">
              <img class="remove-icon" src="./images/icon-delete.svg" alt="delete icon">
            </button>
          </div>
        </div>
        <button class="checkout-btn" type="button">Checkout</button>
      </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItemsContainer.append(cartRow)

    cartRow.getElementsByClassName('cart-quantity')[0].innerHTML = quantityInputElement.value
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', updateCartTotal)

    let cartMessage = document.querySelector('.default-text-empty')
    cartMessage.style.display ="none"

}

function updateCartTotal() { 
    //get the cart-item (cart-row)
    let cartItems = document.getElementsByClassName('cart-item')
    let total = 0
    //we need to loop over the cart row:
    for (let i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i] //whicever row that we are currently on
        //get the price and quantity for the row of this cart
        let cartPriceElement = cartItem.getElementsByClassName('cart-price')[0]
        //get the cart quantity (this isn´t the input element)
        let cartQuantityElement = cartItem.getElementsByClassName('cart-quantity')[0]

        let cartPrice = parseFloat(cartPriceElement.innerHTML.replace('$', ''))
        let cartQuantity = parseFloat(cartQuantityElement).innerHTML

        //Make the input´s value equal to the quantity in the cart
        let quantityInput = document.getElementsByClassName('quantity-input')[0]
        let quantityInputValue = quantityInput.value 
        cartQuantity = quantityInputValue

        total = total + (cartQuantity * cartPrice)
    }
    //get the element with the carttotalprice and set it equal to total
    document.getElementsByClassName('cart-total')[0].innerHTML = '$' + total //undefined is not an object error because we delete this element with the delete button
}

//when we click on the delete icon, + event parameter added
function removeCartItem(event) { 
    let buttonClicked = event.target
    let cButton = document.querySelector('.checkout-btn')
    let cartIconQuantityElement = document.querySelector('.icon-cart-qty')

    cartIconQuantityElement.innerHTML = 0;

    buttonClicked.parentElement.parentElement.parentElement.remove()
    cButton.remove()
    displayCartQuantity() // displays the number of items above the cart icon
    cartMessageEmpty()
    updateCartTotal()   
}

// display the cart content 
function displayCartContent() {
    let shoppingCartContent = document.getElementsByClassName('shopping-cart-content')[0]
    shoppingCartContent.classList.add('active')
}
    

// close the cart 
function closeCart() {
    let closeButton = document.getElementById('close-cart')
    let shoppingCartContent = document.getElementsByClassName('shopping-cart-content')[0]

    shoppingCartContent.classList.remove('active')
    displayCartQuantity()

}





















