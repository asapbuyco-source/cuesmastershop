
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.Lg8ZtQUP.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.BMQJ_QkM.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.DwuWpKQq.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser-legacy.Cfngx9b5.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-grouping-legacy.C03ZKF9q.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery-legacy.BIP3Q_KQ.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers-legacy.CBQz9TWw.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-errors-legacy.C3q5AzJD.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-proposal-legacy.DfX7rhM8.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress-legacy.DtZRvijn.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared-legacy.DmhhbGnT.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-extension-execution-errors-legacy.B_DI2LT7.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-rpc-legacy.DQzGXjxI.js","/cdn/shopifycloud/checkout-web/assets/c1/error-logger-report-graphql-error-legacy.BTN_Js0c.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails-legacy.BBbex9f4.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound-legacy.BfWetvah.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate-legacy.Dfpb0fvJ.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-browser-legacy.C7YoG0AT.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shopCashMoney-legacy.Wys_WnOY.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast-legacy.BlEKGrm-.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.BrpXty2N.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage-legacy.Djvos1GM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal-legacy.bR2KewTM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase-legacy.DcLkP0bw.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition-legacy.Yl47iYSg.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin-legacy.ChvvVUTk.js","/cdn/shopifycloud/checkout-web/assets/c1/remember-me-hooks-legacy.CovQ2nFR.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink-legacy.BZ3bpvIa.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm-legacy.Nn2G0ZLN.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField-legacy.C3-PwG1a.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture-legacy.C1x292ve.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module-legacy.CruLFkVr.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover-legacy.DqayxV1A.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice-legacy.B-txqJTi.js","/cdn/shopifycloud/checkout-web/assets/c1/Interaction-tracker-legacy.C0_vHbs3.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox-legacy.DSHkmR-9.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.B3F5Hn5O.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useEcpSpiDebugLog-legacy.C5aKoo0h.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo-legacy.ZzgwYMTT.js","/cdn/shopifycloud/checkout-web/assets/c1/Monorail-monorailMetric-wallets-legacy.wBTRoARQ.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks-legacy.CxJZz7J3.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState-legacy.BvSRRrc3.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.d8Nmg3kq.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping-legacy.BGrIE-e5.js","/cdn/shopifycloud/checkout-web/assets/c1/components-useVaultedMsiInstallments-legacy.B8aTdxX9.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon-legacy.12fbmmnm.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-context-legacy.CfQbF1a2.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.DJkYGq6a.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine-legacy.BF6ZteNW.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName-legacy.DB-sRhkg.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge-legacy.BSz6o2v9.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useFilteredShopPayAvailablePaymentMethods-legacy.y7RJn02_.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.CzW8YGu1.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.CadxpKKe.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage-legacy.CF72JobU.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit-legacy.FLwFFEc2.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons-legacy.DGov5HhK.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-installments-types-legacy.DXsftVrL.js","/cdn/shopifycloud/checkout-web/assets/c1/IncentiveBadge-legacy.Bs76u94I.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler-legacy.BPFaNqgt.js","/cdn/shopifycloud/checkout-web/assets/c1/negotiated-findSelectedDeliveryMethod-legacy.Bf7zNgBb.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button-legacy.BHEevkRJ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences-legacy.B8y_kXPw.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-monorail-legacy.CimToZW4.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector-legacy.BTU29IE_.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.DDOVFJg1.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-SectionStyleOverride-legacy.qEJrz9OJ.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch-legacy.BSRBi13U.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscounts-legacy.BFjJ7Wxx.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay-legacy.D7_ykzXo.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot-legacy.DHyrEEEw.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent-legacy.Debo3Q5a.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodRateLabel-legacy.Bangkatb.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included-legacy.kdMJb3Qy.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines-legacy.DxVk36Wa.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.W2LO_5_3.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.Bzc0xtRs.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.BgBBel1G.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea-legacy.D5BdRGxS.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.BQdGTpEd.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.QvZHRJRj.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  