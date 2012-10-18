(function($) {
	var preferences = {};
	var defaultPreferences = {
		slimModeEnabled: false
	};
	
	$(function() {
		loadPreferences();
		setupMessageHandlers();
		setupPage();
	});
	
	function setupMessageHandlers() {
		chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
			if (message == 'getPreferences') {
				sendResponse(preferences);
			}
		});
	}
	
	function setupPage() {
		$('#pluginVersion').text(chrome.app.getDetails().version);
		
		var $slimModeEnabled = $('#slimModeEnabled');
		$slimModeEnabled.prop('checked', preferences.slimModeEnabled);
		$slimModeEnabled.click(function() {
			preferences.slimModeEnabled = $slimModeEnabled.is(':checked');
			savePreferences(preferences);
			sendMessageToTabs({
				'event': 'slimModeChanged',
				'args': preferences.slimModeEnabled
			});
		});
	}
	
	function loadPreferences() {
		if (!window.localStorage.pluggydPreferences) {
			preferences = defaultPreferences;
			return;
		}
		
		preferences = JSON.parse(window.localStorage.pluggydPreferences);
	}
	
	function savePreferences(preferences) {
        window.localStorage.pluggydPreferences = JSON.stringify(preferences);
	}
	
	function sendMessageToTabs($message) {
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
	}
})(jQuery);