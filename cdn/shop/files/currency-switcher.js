// ============================================================
// Static Currency Switcher (Cues Master Shop)
// Converts PHP prices client-side, stores choice in localStorage.
// Works with email-checkout.js (cart/checkout) via shared globals.
// ============================================================

var CURRENCY_RATES = {
    PHP: 1, USD: 0.0174, EUR: 0.0160, GBP: 0.0136, CAD: 0.0237,
    AUD: 0.0267, SGD: 0.0233, JPY: 2.65, AED: 0.0639, MYR: 0.0783,
    HKD: 0.136, KRW: 23.8
};

var CURRENCY_SYMBOLS = {
    PHP: '\u20B1', USD: '$', EUR: '\u20AC', GBP: '\u00A3', CAD: 'CA$',
    AUD: 'A$', SGD: 'S$', JPY: '\u00A5', AED: 'AED', MYR: 'RM',
    HKD: 'HK$', KRW: '\u20A9'
};

var CURRENCY_NAMES = {
    PHP: 'Philippines \u00B7 PHP', USD: 'United States \u00B7 USD',
    EUR: 'Europe \u00B7 EUR', GBP: 'United Kingdom \u00B7 GBP',
    CAD: 'Canada \u00B7 CAD', AUD: 'Australia \u00B7 AUD',
    SGD: 'Singapore \u00B7 SGD', JPY: 'Japan \u00B7 JPY',
    AED: 'UAE \u00B7 AED', MYR: 'Malaysia \u00B7 MYR',
    HKD: 'Hong Kong \u00B7 HKD', KRW: 'South Korea \u00B7 KRW'
};

function cmStorageGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
}

function cmStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

var selectedCurrency = cmStorageGet('cm_currency', 'USD');
if (selectedCurrency === 'PHP') {
    // PHP is no longer offered; migrate existing visitors to USD
    selectedCurrency = 'USD';
    cmStorageSet('cm_currency', 'USD');
}

function convertPrice(phpAmount, toCurrency) {
    var rate = CURRENCY_RATES[toCurrency] || 1;
    var converted = Number(phpAmount) * rate;
    if (toCurrency === 'JPY' || toCurrency === 'KRW') return Math.round(converted);
    return parseFloat(converted.toFixed(2));
}

function formatNumber(num, currency) {
    var whole = currency === 'JPY' || currency === 'KRW';
    return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: whole ? 0 : 2,
        maximumFractionDigits: whole ? 0 : 2
    });
}

function parsePhpPrice(str) {
    // Strip everything that isn't a digit or a decimal point
    var cleaned = String(str || '').replace(/[^\d.]/g, '');
    var num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
}

function tagPrices() {
    // Tag leaf price elements with their original PHP value once.
    // Handles both real '₱' and the mojibake 'â‚±' present in the static HTML.
    document.querySelectorAll('.price, [class*="price"], .money, .totals__total-value').forEach(function (el) {
        if (el.children.length !== 0) return; // only leaf nodes
        var text = el.textContent || '';
        var looksLikePrice = text.indexOf('PHP') !== -1 ||
                             text.indexOf('\u20B1') !== -1 ||
                             text.indexOf('\u00E2\u201A\u00B1') !== -1;
        if (!looksLikePrice) return;
        if (el.dataset && el.dataset.phpPrice) return; // already tagged
        var val = parsePhpPrice(text);
        if (val === null) return;
        el.dataset.phpPrice = val;
    });
}

function applyPrices(currency) {
    var sym = CURRENCY_SYMBOLS[currency] || currency;
    document.querySelectorAll('[data-php-price]').forEach(function (el) {
        var phpVal = parseFloat(el.dataset.phpPrice);
        if (isNaN(phpVal)) return;
        var converted = convertPrice(phpVal, currency);
        el.textContent = sym + formatNumber(converted, currency);
    });
}

function updateDropdownLabel(currency) {
    var name = CURRENCY_NAMES[currency] || currency;
    document.querySelectorAll('.disclosure__button.localization-form__select').forEach(function (btn) {
        var span = btn.querySelector('span');
        if (span) span.textContent = name;
    });
}

function interceptLocalizationForms() {
    // Block the Shopify localization forms from navigating anywhere.
    document.querySelectorAll('form.localization-form, form[action="javascript:void(0);"]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        });
    });

    document.querySelectorAll('.disclosure__link[data-value]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var countryCode = link.getAttribute('data-value');
            var countryToCurrency = {
                US: 'USD', GB: 'GBP', CA: 'CAD',
                AU: 'AUD', SG: 'SGD', JP: 'JPY', AE: 'AED',
                MY: 'MYR', HK: 'HKD', KR: 'KRW',
                AT: 'EUR', BE: 'EUR', DE: 'EUR', ES: 'EUR',
                FI: 'EUR', FR: 'EUR', IE: 'EUR', IT: 'EUR',
                NL: 'EUR', PT: 'EUR'
            };

            selectedCurrency = countryToCurrency[countryCode] || 'USD';
            cmStorageSet('cm_currency', selectedCurrency);

            tagPrices();
            applyPrices(selectedCurrency);
            updateDropdownLabel(selectedCurrency);

            document.querySelectorAll('.disclosure__list-wrapper').forEach(function (d) { d.hidden = true; });
            document.querySelectorAll('.disclosure__button').forEach(function (b) {
                b.setAttribute('aria-expanded', 'false');
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    tagPrices();
    // Always apply: prices are stored in PHP and must be converted to the
    // selected currency (USD by default).
    applyPrices(selectedCurrency);
    updateDropdownLabel(selectedCurrency);
    interceptLocalizationForms();
});
