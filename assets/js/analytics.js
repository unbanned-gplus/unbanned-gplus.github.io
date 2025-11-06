(function() {
  // Load Google Tag Manager (gtag.js) asynchronously
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-YG1CBEB1K8";
  document.head.appendChild(gtagScript);

  // Initialize gtag once the script has loaded
  gtagScript.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-YG1CBEB1K8');
  };
})();
