/*
	GDPNRW MAIN JS
*/

var _paq = _paq || [];
_paq.push(['setVisitorCookieTimeout', 2880]);
_paq.push(['setReferralCookieTimeout', 2880]);
_paq.push(['setSessionCookieTimeout', 0]);
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
 
function embedTrackingCode() {
   var u="//matomo.gdpnrw.de/";
   _paq.push(["setTrackerUrl", u+"matomo.php"]);
   _paq.push(["setSiteId", globalMatomoSiteId ]);
   _paq.push(['enableHeartBeatTimer', 30]);
   
   (function() {
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
	})();
  
  	console.log('MATOMO Tracking enabled for id ' + globalMatomoSiteId )
}
 
function deleteMatomoCookies(){
    _paq.push(["disableCookies"]);
    _paq.push(["deleteCookies"]);
    location.reload();
 
    console.log('MATOMO Tracking disabled')
}
 
 
window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
             "popup": {
		      "background": "#C0C0C0",
		      "text": "#000000"
		    },
		    "button": {
		      "background": "#009D30",
		      "text": "#FFFFFF"
		    }
		  },
		"theme": "classic",
        "cookie": { 
            "expiryDays": 1
         },
        "type": "opt-in",
        "content": {
            "message": "Wir verwenden Tracking-Cookies, um unsere Website stetig zu verbessern sowie für anonymisierte Nutzungsstatistiken.",
            "allow": "Einverstanden",
            "deny": "Ablehnen",
            "link": "Mehr erfahren",
            "href": globalPrivacyPageUrl,
            "policy": 'Cookie Einstellungen'
        },
        onPopupOpen: function () {
            document.body.classList.add("cookieconsent-banner-opened");
        },
        onPopupClose: function () {
            document.body.classList.remove("cookieconsent-banner-opened");
        },
        onInitialise: function (status) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type == 'opt-in' && didConsent) {
                // enable cookies
                embedTrackingCode();
            }
            if (type == 'opt-out' && !didConsent) {
                // disable cookies
            }
        },
        onStatusChange: function (status, chosenBefore) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type == 'opt-in' && didConsent) {
                // enable cookies
                embedTrackingCode();
            }
            if (type == 'opt-in' && !didConsent) {
                // disable cookies
                deleteMatomoCookies();
            }
            if (type == 'opt-out' && !didConsent) {
                // disable cookies
                deleteMatomoCookies();
            }
        },
        onRevokeChoice: function () {
            var type = this.options.type;
            if (type == 'opt-in') {
                // disable cookies
            }
            if (type == 'opt-out') {
                // enable cookies
                embedTrackingCode();
            }
        },
 
    })
});
 
 
function openCCbanner(){
    var el = document.querySelector('.cc-revoke');
    el.click();
}