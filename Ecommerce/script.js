document.addEventListener('DOMContentLoaded', () => {
    // Wishlist functionality
    let wishListCount = document.querySelector('#wishlist-link span');
    let heartButtons = document.querySelectorAll('.heart-button');

    heartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            wishListCount.innerHTML = document.querySelectorAll('.heart-button.active').length;
        });
    });

    // Cart functionality
    let cartCount = document.querySelector('#cart-link span');
    let cartButtons = document.querySelectorAll('.product-card .blue-button');

    // Get cart and cart items container
    const cartTab = document.querySelector('.cartTab');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartLink = document.getElementById('cart-link');

    
    let cartItems = [];

    
    const products = [
    { name: 'Navy Headphones', price: 87.99 },
    { name: 'Wireless Speakers', price: 120.00 },
    { name: 'Bluetooth Earbuds', price: 75.00 },
    { name: 'Portable Charger', price: 35.99 },
    { name: 'Smart Watch', price: 199.99 },
    { name: 'USB-C Hub', price: 49.99 },
    { name: 'Gaming Mouse', price: 59.99 },
    { name: 'Mechanical Keyboard', price: 89.99 }
    ];


    function updateCartLink() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerHTML=totalItems;
        
    }

    // Function to add items to the cart
    function addToCart(product) {
        
        const existingItem = cartItems.find(item => item.name === product.name);
        if (existingItem) {
           
            existingItem.quantity += 1;
        } else {
            
            cartItems.push({ ...product, quantity: 1 });
        }

      
        renderCartItems();
       
        updateCartLink();
    }

    // Function to render the cart items
    function renderCartItems() {
        
        cartItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="name">${item.name}</div>
                <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span class="qty">${item.quantity}</span>
                    <span class="plus">></span>
                </div>
                <button class="remove">Remove</button>
            `;

            itemDiv.querySelector('.plus').addEventListener('click', () => {
                item.quantity += 1; 
                renderCartItems(); 
                updateCartLink(); 
            });

            itemDiv.querySelector('.minus').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1; 
                } else {
                    cartItems = cartItems.filter(i => i.name !== item.name); 
                }
                renderCartItems(); 
                updateCartLink(); 
            });

            itemDiv.querySelector('.remove').addEventListener('click', () => {
                cartItems = cartItems.filter(i => i.name !== item.name); 

                
                const productButton = document.querySelector(`.blue-button[data-product="${item.name}"]`);
                if (productButton) {
                    productButton.classList.remove('active');
                    productButton.innerHTML = 'Add To Cart'; 
                }

                renderCartItems();
                updateCartLink(); 
            });

            // Append the new item to the cart items container
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // Function to handle cart button clicks
    cartButtons.forEach((button, index) => {
        button.setAttribute('data-product', products[index].name); 
        button.addEventListener('click', () => {
            if (!button.classList.contains('active')) {
                
                addToCart(products[index]); 
                button.classList.add('active');
                button.innerHTML = "View Cart"; 
            } else {
               
                cartTab.style.display = 'grid'; 
            }
            
            cartCount.innerHTML = document.querySelectorAll('.product-card .blue-button.active').length;
        });
    });

   
    cartLink.addEventListener('click', function(event) {
        event.preventDefault();
        cartTab.style.display = cartTab.style.display === 'none' || cartTab.style.display === '' ? 'grid' : 'none';
    });

    // Close button to hide the cart
    document.querySelector('.close').addEventListener('click', () => {
        cartTab.style.display = 'none';
    });

    // Initial display update
    updateCartLink(); 
});
