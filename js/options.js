(function($) {
	var pluggyd = chrome.extension.getBackgroundPage().pluggyd;
	
	$(function() {
		setupPage();
	});
	
	function setupPage() {
		$('#pluginVersion').text(chrome.app.getDetails().version);
		
		var $slimModeEnabled = $('#slimModeEnabled');
		$slimModeEnabled.prop('checked', pluggyd.preferences.slimModeEnabled);
		$slimModeEnabled.click(function() {
			pluggyd.preferences.slimModeEnabled = $slimModeEnabled.is(':checked');
			pluggyd.savePreferences(pluggyd.preferences);
			pluggyd.sendMessageToTabs({
				event: 'slimModeChanged',
				args: pluggyd.preferences.slimModeEnabled
			});
		});
	}
})(jQuery);