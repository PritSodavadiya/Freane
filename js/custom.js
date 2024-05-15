// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

// Add Cart Product

let cart = [];
let total = 0;

// Load cart data from local storage on page load
window.onload = function () {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart;
        updateCartUI();
        calculateTotal();
    }
};

function addToCart(itemName, itemPrice, itemImage) {
    cart.push({ name: itemName, price: itemPrice, image: itemImage });
    updateCartUI();
    calculateTotal();
    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartList = document.getElementById('cart');
    const itemCounter = document.getElementById('item-counter');

    cartList.innerHTML = '';
    cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `<img src="${item.image}" alt="${item.name}" class="cart-item-image"> <br><h5 class="my-1">${item.name}</h5> <p> ₹${item.price.toFixed(2)}</p>`;
        cartList.appendChild(listItem);
    });

    itemCounter.textContent = cart.length;
}

function calculateTotal() {
    total = cart.reduce((acc, item) => acc + item.price, 0);
    const totalPrice = document.getElementById('total-price');
    totalPrice.textContent = total.toFixed(2);
}

function checkout() {
    alert(`Total: ₹${total.toFixed(2)}\nThank you for your order!`);
    cart = [];
    updateCartUI();
    calculateTotal();
    // Clear cart data from local storage
    localStorage.removeItem('cart');
}
