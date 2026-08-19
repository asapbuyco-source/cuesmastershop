// ============================================================
// Static Currency Switcher
// ============================================================

const CURRENCY_RATES = {
    PHP: 1, USD: 0.0174, EUR: 0.0160, GBP: 0.0136, CAD: 0.0237,
    AUD: 0.0267, SGD: 0.0233, JPY: 2.65, AED: 0.0639, MYR: 0.0783,
    HKD: 0.136, KRW: 23.8
};

const CURRENCY_SYMBOLS = {
    PHP: '₱', USD: '$', EUR: '€', GBP: '£', CAD: 'CA$',
    AUD: 'A$', SGD: 'S$', JPY: '¥', AED: 'AED', MYR: 'RM',
    HKD: 'HK$', KRW: '₩'
};

const CURRENCY_NAMES = {
    PHP: 'Philippines · PHP', USD: 'United States · USD',
    EUR: 'Europe · EUR', GBP: 'United Kingdom · GBP',
    CAD: 'Canada · CAD', AUD: 'Australia · AUD',
    SGD: 'Singapore · SGD', JPY: 'Japan · JPY',
    AED: 'UAE · AED', MYR: 'Malaysia · MYR',
    HKD: 'Hong Kong · HKD', KRW: 'South Korea · KRW'
};

let selectedCurrency = localStorage.getItem('cm_currency') || 'PHP';

function convertPrice(phpAmount, toCurrency) {
    const rate = CURRENCY_RATES[toCurrency] || 1;
    const converted = phpAmount * rate;
    if (toCurrency === 'JPY' || toCurrency === 'KRW') return Math.round(converted);
    return parseFloat(converted.toFixed(2));
}

function formatNumber(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parsePhpPrice(str) {
    // Strip everything that isn't a digit or a decimal point
    const cleaned = str.replace(/[^\d.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
}

function tagPrices() {
    document.querySelectorAll('.price, .price__regular, .price__sale, .price-item, [class*="price"]').forEach(el => {
        // Tag anything that contains PHP or our symbols or numbers with PHP
        if (el.children.length === 0 && (el.textContent.includes('PHP') || el.textContent.includes('₱') || el.textContent.includes('â‚±') || el.textContent.includes(','))) {
            const raw = el.textContent.trim();
            const val = parsePhpPrice(raw);
            if (val !== null && !el.dataset.phpPrice) {
                el.dataset.phpPrice = val;
                el.dataset.origText = raw;
            }
        }
    });
}

function applyPrices(currency) {
    const sym = CURRENCY_SYMBOLS[currency] || currency;
    document.querySelectorAll('[data-php-price]').forEach(el => {
        const phpVal = parseFloat(el.dataset.phpPrice);
        if (isNaN(phpVal)) return;
        const converted = convertPrice(phpVal, currency);
        el.textContent = sym + formatNumber(converted);
    });
}

function updateDropdownLabel(currency) {
    document.querySelectorAll('.disclosure__button.localization-form__select').forEach(btn => {
        const span = btn.querySelector('span');
        if (span) span.textContent = CURRENCY_NAMES[currency] || currency;
    });
}

function interceptLocalizationForms() {
    document.querySelectorAll('form.localization-form, form[action="javascript:void(0);"]').forEach(form => {
        form.addEventListener('submit', e => e.preventDefault());
        form.submit = function() { return false; };
    });

    document.querySelectorAll('.disclosure__link[data-value]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            const countryCode = link.dataset.value;
            const countryToCurrency = {
                PH: 'PHP', US: 'USD', GB: 'GBP', CA: 'CAD',
                AU: 'AUD', SG: 'SGD', JP: 'JPY', AE: 'AED',
                MY: 'MYR', HK: 'HKD', KR: 'KRW',
                AT: 'EUR', BE: 'EUR', DE: 'EUR', ES: 'EUR',
                FI: 'EUR', FR: 'EUR', IE: 'EUR', IT: 'EUR',
                NL: 'EUR', PT: 'EUR'
            };

            const currency = countryToCurrency[countryCode] || 'USD';
            selectedCurrency = currency;
            localStorage.setItem('cm_currency', currency);

            tagPrices();
            applyPrices(currency);
            updateDropdownLabel(currency);

            document.querySelectorAll('.disclosure__list-wrapper').forEach(d => d.hidden = true);
            document.querySelectorAll('.disclosure__button').forEach(b => b.setAttribute('aria-expanded', 'false'));
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    tagPrices();
    if (selectedCurrency !== 'PHP') {
        applyPrices(selectedCurrency);
        updateDropdownLabel(selectedCurrency);
    }
    interceptLocalizationForms();
});
