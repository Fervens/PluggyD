var pluggyd = {};

(function() {
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
	
	var defaultPreferences = {
		slimModeEnabled: false, //If true, a skinnier version of plug.dj rooms will be used.
		chatExpanded: false, //If true, the chatbox will be expanded when the page loads.
		animateAvatars: true //If true, avatar dance animations will occur normally; otherwise, they will be disabled.
	};
	
	pluggyd.loadPreferences = function() {
		if (!window.localStorage.pluggydPreferences) {
			return $.extend({}, defaultPreferences);
		}
		
		return $.extend({}, JSON.parse(window.localStorage.pluggydPreferences), defaultPreferences);
	};
	
	pluggyd.savePreferences = function(preferences) {
        window.localStorage.pluggydPreferences = JSON.stringify(preferences);
	};
	
	pluggyd.sendMessageToTabs = function($message) {
		chrome.tabs.query({url: "http://*.plug.dj/*"}, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, $message);
			}
		});
		
		chrome.tabs.query({url: "http://plug.dj/*"}, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, $message);
			}
		});
	};
	
	pluggyd.preferences = pluggyd.loadPreferences();
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (tab.url.indexOf('plug.dj') > -1) {
			chrome.pageAction.show(tabId);
		}
	});
	
	chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
		if (message.event == 'initialize') {
			sendResponse({
				event: 'initialize',
				args: {
					preferences: pluggyd.preferences,
					pluggydSettings: {
						slimModeCss: chrome.extension.getURL('css/slimMode.css')
					}
				}
			});
		}
		else if (message.event == 'chatExpandedUpdated') {
			pluggyd.preferences.chatExpanded = message.args;
			pluggyd.savePreferences(pluggyd.preferences);
		}
	});
})();
