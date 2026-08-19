// ============================================================
// Static Cart & Mailto Checkout Manager
// ============================================================

const ORDER_EMAIL = "asapbuyco@gmail.com";

let cart = JSON.parse(localStorage.getItem('cm_static_cart')) || [];

function saveCart() {
    localStorage.setItem('cm_static_cart', JSON.stringify(cart));
}

function addToCart(item) {
    // Check if product already exists
    const existing = cart.find(i => i.title === item.title);
    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    saveCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const bubble = document.getElementById('cart-icon-bubble');
    if (!bubble) return;
    
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    const countDiv = bubble.querySelector('.cart-count-bubble');
    
    if (count > 0) {
        if (countDiv) {
            countDiv.querySelector('span[aria-hidden="true"]').innerText = count;
        } else {
            const html = `
              <div class="cart-count-bubble">
                <span aria-hidden="true">${count}</span>
                <span class="visually-hidden">${count} item${count > 1 ? 's' : ''}</span>
              </div>
            `;
            bubble.insertAdjacentHTML('beforeend', html);
        }
    } else if (countDiv) {
        countDiv.remove();
    }
}

function formatPrice(num) {
    // Use the currency switcher if available, otherwise fallback to PHP
    const currency = localStorage.getItem('cm_currency') || 'PHP';
    // If currency switcher is active and the convertPrice function is available
    if (typeof convertPrice === 'function' && typeof formatNumber === 'function' && typeof CURRENCY_SYMBOLS !== 'undefined') {
        const converted = convertPrice(num, currency);
        const sym = CURRENCY_SYMBOLS[currency] || currency;
        return sym + formatNumber(converted);
    }
    return "₱" + num.toLocaleString('en-US', {minimumFractionDigits: 2});
}

function renderCart() {
    const isCartPage = window.location.href.includes('cart');
    if (!isCartPage) return;

    const cartItemsWrapper = document.querySelector('cart-items');
    const emptyState = document.querySelector('.cart__warnings');
    const contents = document.querySelector('.js-contents');
    const mainFooter = document.getElementById('main-cart-footer');
    
    if (!cartItemsWrapper || !contents) return;

    if (cart.length === 0) {
        cartItemsWrapper.classList.add('is-empty');
        if (emptyState) emptyState.style.display = 'block';
        if (mainFooter) mainFooter.classList.add('is-empty');
        contents.innerHTML = '';
        return;
    }

    cartItemsWrapper.classList.remove('is-empty');
    if (emptyState) emptyState.style.display = 'none';
    if (mainFooter) mainFooter.classList.remove('is-empty');

    let html = `
      <table class="cart-items">
        <thead>
          <tr>
            <th class="caption-with-letter-spacing" colspan="2" scope="col">Product</th>
            <th class="caption-with-letter-spacing" colspan="1" scope="col">Quantity</th>
            <th class="caption-with-letter-spacing right" colspan="1" scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
    `;

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
          <tr class="cart-item" style="border-bottom: 1px solid #ccc; margin-bottom: 15px;">
            <td class="cart-item__media" style="padding-top:15px; padding-bottom: 15px;">
                <img src="${item.image}" alt="${item.title}" width="100" style="max-width:100px; height:auto; border-radius: 4px;">
            </td>
            <td class="cart-item__details">
              <a href="${item.url}" class="cart-item__name h4 break">${item.title}</a>
              <div class="cart-item__price-wrapper">
                <span class="price price--end" data-php-price="${item.price}">${formatPrice(item.price)}</span>
              </div>
            </td>
            <td class="cart-item__quantity">
                <div style="display:flex; align-items:center;">
                    <span style="font-size: 1.2rem; font-weight: bold; margin-right: 15px;">x${item.quantity}</span>
                    <button type="button" class="button button--tertiary" style="padding: 5px 10px; min-width: auto; min-height: auto; font-size: 1.2rem;" onclick="removeFromCart(${index})">🗑</button>
                </div>
            </td>
            <td class="cart-item__totals right">
              <div class="cart-item__price-wrapper">
                <span class="price price--end" data-php-price="${itemTotal}">${formatPrice(itemTotal)}</span>
              </div>
            </td>
          </tr>
        `;
    });

    html += `</tbody></table>`;
    contents.innerHTML = html;

    // Update subtotal
    const subtotalEl = document.querySelector('.totals__total-value');
    if (subtotalEl) {
        subtotalEl.setAttribute('data-php-price', subtotal);
        subtotalEl.innerText = formatPrice(subtotal);
    }
    
    // Attach Mailto logic to checkout button
    const checkoutBtn = document.getElementById('checkout');
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.innerText = "✉ Checkout via Email";
        
        // Add checkout styling
        checkoutBtn.style.cssText = `
            background-color: #c9a84c !important;
            color: #0a0a0a !important;
            border: 2px solid #c9a84c !important;
            font-weight: 700 !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            padding: 14px 24px !important;
            font-size: 1rem !important;
            cursor: pointer !important;
            transition: background-color 0.2s ease, transform 0.1s ease !important;
            border-radius: 4px !important;
        `;
        
        // Clone and replace to clear existing listeners
        const newCheckoutBtn = checkoutBtn.cloneNode(true);
        checkoutBtn.parentNode.replaceChild(newCheckoutBtn, checkoutBtn);
        
        newCheckoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            let orderText = "Hello,\n\nI would like to place an order for the following items from my cart:\n\n";
            cart.forEach(item => {
                orderText += `- ${item.title} (x${item.quantity})\n`;
                orderText += `  Link: ${window.location.origin}${item.url.replace(window.location.origin, '')}\n`;
            });
            
            orderText += "\n\nPlease let me know the next steps for payment and shipping.\n\n";
            orderText += "My Details:\nName: \nPhone: \nAddress: \n";
            
            const subject = encodeURIComponent("New Cart Order Request");
            const body = encodeURIComponent(orderText);
            
            window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
        });
    }
    
    // Trigger currency conversion on newly rendered prices
    if (typeof applyPrices === 'function' && selectedCurrency) {
        applyPrices(selectedCurrency);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    // Intercept product page "Add to Cart" forms
    const addForms = document.querySelectorAll('form[action*="/cart/add"]');
    addForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let productTitle = document.title.split('-')[0].trim();
            const titleElement = document.querySelector('h1');
            if (titleElement) productTitle = titleElement.innerText.trim();
            
            let price = 0;
            const priceEl = document.querySelector('.price-item--sale, .price-item--regular');
            if (priceEl && priceEl.dataset.phpPrice) {
                price = parseFloat(priceEl.dataset.phpPrice) || 0;
            } else if (priceEl) {
                const raw = priceEl.textContent.replace(/[₱,\s]/g, '');
                price = parseFloat(raw) || 0;
            }
            
            let img = '';
            const imgEl = document.querySelector('.product__media img');
            if (imgEl) img = imgEl.src;
            
            let qty = 1;
            const qtyInput = form.querySelector('input[name="quantity"]');
            if (qtyInput) qty = parseInt(qtyInput.value) || 1;
            
            addToCart({
                title: productTitle,
                price: price,
                image: img,
                quantity: qty,
                url: window.location.pathname
            });
            
            const submitBtn = form.querySelector('button[type="submit"], button[name="add"]');
            if (submitBtn) {
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "✓ Added to Cart";
                submitBtn.style.backgroundColor = "#25d366";
                submitBtn.style.color = "#fff";
                submitBtn.style.borderColor = "#25d366";
                
                setTimeout(() => {
                    submitBtn.innerText = "Add to Cart";
                    // Reset styling so it looks normal again
                    submitBtn.style.backgroundColor = "";
                    submitBtn.style.color = "";
                    submitBtn.style.borderColor = "";
                }, 2000);
            }
        });
        
        // Remove the previously injected "Order via Email" button overrides
        // so it looks like a normal Add to Cart button
        const submitBtn = form.querySelector('button[type="submit"], button[name="add"]');
        if (submitBtn) {
            submitBtn.style.cssText = ""; // Clear my inline styles
            const span = submitBtn.querySelector('span');
            if (span) {
                span.innerText = "Add to cart";
            } else {
                submitBtn.innerText = "Add to cart";
            }
        }
    });

    // Intercept contact/newsletter forms
    document.querySelectorAll('form[action*="/contact"]').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = encodeURIComponent("New Contact/Newsletter Request");
            let bodyText = "Hello,\n\nI am reaching out regarding:\n\n";
            form.querySelectorAll("input, textarea").forEach(input => {
                if(input.name && input.name !== "utf8" && input.name !== "form_type" && input.value) {
                    bodyText += input.name.replace("contact[", "").replace("]", "") + ": " + input.value + "\n";
                }
            });
            const body = encodeURIComponent(bodyText);
            window.location.href = mailto:+ORDER_EMAIL+?subject=+subject+&body=+body;
        });
    });
});
