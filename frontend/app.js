const BASE_URL = "https://swaadmahal-backend.onrender.com/";

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Menu Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const menuBtn = document.getElementById('view-menu-btn');
    const menuFromCartBtn = document.getElementById('view-menu-from-cart');

    // Menu Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Cart Elements
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    // Initialize empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Theme Toggle Functionality
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        // Save theme preference to localStorage
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
    }

    // Navigation Functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();

                // Remove active class from all links and sections
                navLinks.forEach(link => link.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // Add active class to clicked link and target section
                this.classList.add('active');
                document.querySelector(targetId).classList.add('active');
            }
        });
    });

    // Function to navigate to a specific section
    function navigateToSection(sectionId) {
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to target link and section
        document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    }

    // Function to navigate to menu section
    function navigateToMenu() {
        navigateToSection('menu');
    }

    // Function to navigate to booking section
    function navigateToBooking() {
        navigateToSection('booking');
    }

    // Function to navigate to about section
    function navigateToAbout() {
        navigateToSection('about');
    }

    // Menu button in hero section
    if (menuBtn) {
        menuBtn.addEventListener('click', navigateToMenu);
    }

    // Table booking button in hero section
    const bookTableBtn = document.getElementById('book-table-btn');
    if (bookTableBtn) {
        bookTableBtn.addEventListener('click', navigateToBooking);
    }

    //links in footer
    // About Us link in footer
    const aboutLinks = document.querySelectorAll('a[href="#about"]');
    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToAbout();
        });
    });

    // Menu link in footer
    const menuLinks = document.querySelectorAll('a[href="#menu"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToMenu();
        });
    });

    // book link in footer
    const bookLinks = document.querySelectorAll('a[href="#booking"]');
    bookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToBooking();
        });
    });

    
    

    // Browse menu button in empty cart
    if (menuFromCartBtn) {
        menuFromCartBtn.addEventListener('click', navigateToMenu);
    }

    // Menu Filtering Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Show/hide menu items based on filter
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Cart Functionality
    function updateCartCount() {
        // Update cart count display
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });
        cartCount.textContent = totalItems;

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show/hide empty cart message
        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            const cartItemsList = document.getElementById('cart-items-list');
            const cartSummary = document.getElementById('cart-summary');
            if (cartItemsList) cartItemsList.remove();
            if (cartSummary) cartSummary.remove();
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            renderCart();
        }
    }

    function renderCart() {
        // Remove existing cart items list if it exists
        const existingCartItemsList = document.getElementById('cart-items-list');
        if (existingCartItemsList) existingCartItemsList.remove();

        // Remove existing cart summary if it exists
        const existingCartSummary = document.getElementById('cart-summary');
        if (existingCartSummary) existingCartSummary.remove();

        // Create cart items list
        const cartItemsList = document.createElement('div');
        cartItemsList.id = 'cart-items-list';

        // Add each item to the cart display
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
        });

        // Create cart summary
        const cartSummary = document.createElement('div');
        cartSummary.id = 'cart-summary';
        cartSummary.className = 'cart-summary';

        if (cart.length === 0) {
    alert("Cart is empty!");
    return;
} 
        // Calculate subtotal
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        // Add tax and delivery fee
        const tax = subtotal * 0.05; // 5% tax
        const deliveryFee = 50; // Fixed delivery fee
        const total = subtotal + tax + deliveryFee;

        // Add summary to cart
        cartSummary.innerHTML = `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (5%):</span>
                <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee:</span>
                <span>₹${deliveryFee.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <button class="btn primary" id="proceed-to-payment-btn">Proceed to Payment</button>
        `;

        // Add cart items list and summary to cart container
        cartItemsContainer.appendChild(cartItemsList);
        cartItemsContainer.appendChild(cartSummary);

        // Add event listeners to quantity buttons
        const decreaseBtns = document.querySelectorAll('.quantity-btn.decrease');
        const increaseBtns = document.querySelectorAll('.quantity-btn.increase');
        const removeItemBtns = document.querySelectorAll('.remove-item-btn');

        decreaseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                decreaseQuantity(id);
            });
        });

        increaseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                increaseQuantity(id);
            });
        });

        removeItemBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeItem(id);
            });
        });
    }

document.addEventListener('click', async function(e) {
    const button = e.target.closest('#proceed-to-payment-btn');

    if (button) {

        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        try {
            await fetch(`${BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: cart,
                    total: subtotal
                })
            });

            alert("Order placed successfully!");
            cart = [];
            updateCartCount();

        } catch (error) {
            console.error(error);
            alert("Order failed");
        }
    }
});

    function addToCart(id, name, price, image) {
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            // Increase quantity if item already exists
            existingItem.quantity++;
        } else {
            // Add new item to cart
            cart.push({
                id,
                name,
                price: parseFloat(price),
                image,
                quantity: 1
            });
        }

        // Show notification
        showNotification(`${name} added to cart!`, 'success');

        // Update cart count and save to localStorage
        updateCartCount();
    }

    function decreaseQuantity(id) {
        // Find item in cart
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            // Decrease quantity
            cart[itemIndex].quantity--;

            // Remove item if quantity is 0
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }

            // Update cart count and save to localStorage
            updateCartCount();
        }
    }

    function increaseQuantity(id) {
        // Find item in cart
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            // Increase quantity
            cart[itemIndex].quantity++;

            // Update cart count and save to localStorage
            updateCartCount();
        }
    }

    function removeItem(id) {
        // Remove item from cart
        cart = cart.filter(item => item.id !== id);

        // Update cart count and save to localStorage
        updateCartCount();
    }

    // Add to cart button event listeners
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');

            addToCart(id, name, price, image);
        });
    });

    // Show notification function
    function showNotification(message, type = 'success') {
        // Check if notification already exists
        let notification = document.querySelector('.notification');

        // Create notification if it doesn't exist
        if (!notification) {
            notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-icon"></div>
                    <p id="notification-message">${message}</p>
                </div>
                <button id="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            document.body.appendChild(notification);

            // Add event listener to close button
            notification.querySelector('#notification-close').addEventListener('click', function() {
                notification.remove();
            });

            // Auto-remove notification after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        } else {
            // Update existing notification
            notification.className = `notification ${type}`;
            notification.querySelector('#notification-message').textContent = message;

            // Reset auto-remove timer
            clearTimeout(notification.timeout);
            notification.timeout = setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        }
    }

    // Current time display
    function updateTime() {
        const now = new Date();
        const timeDisplay = document.getElementById('current-time-display');
        const timeMessage = document.getElementById('time-based-message');

        if (timeDisplay) {
            timeDisplay.textContent = now.toLocaleTimeString();
        }

        if (timeMessage) {
            const hour = now.getHours();

            if (hour >= 6 && hour < 12) {
                timeMessage.textContent = 'Good morning! Perfect time for breakfast.';
            } else if (hour >= 12 && hour < 16) {
                timeMessage.textContent = 'Good afternoon! Time for a delicious lunch.';
            } else if (hour >= 16 && hour < 22) {
                timeMessage.textContent = 'Good evening! Enjoy a wonderful dinner.';
            } else {
                timeMessage.textContent = 'Late night cravings? We\'ve got you covered!';
            }
        }
    }

    // Update time every second
    updateTime();
    setInterval(updateTime, 1000);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Booking System
    const tableBookingForm = document.getElementById('table-booking-form');
const userBookingsContainer = document.getElementById('user-bookings-container');
const noBookingsMessage = document.getElementById('no-bookings-message');

async function loadBookings() {
    try {
        const response = await fetch(`${BASE_URL}/api/bookings`);
        const bookings = await response.json();

        userBookingsContainer.innerHTML = '';

        if (bookings.length === 0) {
            noBookingsMessage.style.display = 'block';
            return;
        }

        noBookingsMessage.style.display = 'none';

        bookings.forEach(booking => {
            const bookingCard = document.createElement('div');
            bookingCard.className = 'booking-card';

            bookingCard.innerHTML = `
                <h4>Reservation for ${booking.name}</h4>
                <p>Date: ${booking.booking_date}</p>
                <p>Time: ${booking.booking_time}</p>
                <p>Guests: ${booking.guests}</p>
                <button class="cancel-booking" data-id="${booking.id}">
                    Cancel Reservation
                </button>
            `;

            userBookingsContainer.appendChild(bookingCard);
        });

        // Delete booking
        document.querySelectorAll('.cancel-booking').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = this.getAttribute('data-id');

                await fetch(`${BASE_URL}/api/bookings/${id}`, {
                    method: 'DELETE'
                });

                loadBookings();
            });
        });

    } catch (error) {
        console.error(error);
    }
}

    if (tableBookingForm) {
    tableBookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const bookingData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            occasion: document.getElementById('occasion').value,
            specialRequests: document.getElementById('special-requests').value
        };

        try {
            await fetch(`${BASE_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            tableBookingForm.reset();
            loadBookings();
            alert("Booking confirmed!");

        } catch (error) {
            console.error(error);
            alert("Error saving booking");
        }
    });
}
    // Initialize bookings display
    loadBookings();
});
