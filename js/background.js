(function() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (tab.url.indexOf('plug.dj') > -1) {
			chrome.pageAction.show(tabId);
		}
	});
	
	window.setTimeout(function () {
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-35666244-1']);
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackEvent', 'Version', chrome.app.getDetails().version]);

		var ga = document.createElement('script'), s;
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';
		s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	}, 10000);
})();
