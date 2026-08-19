// Mailto Checkout Integration
const ORDER_EMAIL = "asapbuyco@gmail.com"; // <-- Replace this with your actual email address!

document.addEventListener('DOMContentLoaded', () => {
    // Hide the dynamic payment buttons (Buy it now, PayPal) since they rely on Shopify backend
    const dynamicButtons = document.querySelectorAll('.shopify-payment-button');
    dynamicButtons.forEach(btn => btn.style.display = 'none');
    
    // Intercept all "Add to Cart" and "Checkout" forms
    const forms = document.querySelectorAll('form[action*="/cart/add"], form[action*="/cart"], form[action*="/contact"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default Shopify checkout
            
            // Try to grab product title from the page
            let productTitle = document.title.split('-')[0].trim();
            const titleElement = document.querySelector('h1');
            if (titleElement) {
                productTitle = titleElement.innerText.trim();
            }
            
            // If they are on the cart page, make the title generic
            if (form.action && form.action.includes("/contact")) {
                const subject = encodeURIComponent("New Contact/Newsletter Request");
                let bodyText = "Hello,\n\nI am reaching out regarding:\n\n";
                form.querySelectorAll("input, textarea").forEach(input => {
                    if(input.name && input.name !== "utf8" && input.name !== "form_type" && input.value) {
                        bodyText += input.name.replace("contact[", "").replace("]", "") + ": " + input.value + "\n";
                    }
                });
                const body = encodeURIComponent(bodyText);
                window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
                return;
            }
            if (productTitle.toLowerCase().includes("your cart")) {
                 productTitle = "items from my cart";
            }
            
            const productUrl = window.location.href;
            
            // Build the mailto link with pre-filled subject and body
            const subject = encodeURIComponent("New Order Request: " + productTitle);
            const body = encodeURIComponent(
                "Hello,\n\n" +
                "I would like to place an order for the following:\n\n" +
                "Product: " + productTitle + "\n" +
                "Link: " + productUrl + "\n\n" +
                "Please let me know the next steps for payment and shipping.\n\n" +
                "My Details:\n" +
                "Name: \n" +
                "Phone: \n" +
                "Address: \n"
            );
            
            // Open the customer's default email client
            window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
        });
        
        // Update the button text to make it clear
        const submitBtn = form.querySelector('button[type="submit"], button[name="add"], button[name="checkout"]');
        if (submitBtn) {
            const span = submitBtn.querySelector('span');
            if (span) {
                span.innerText = "Order via Email";
            } else {
                submitBtn.innerText = "Order via Email";
            }
        }
    });
});
