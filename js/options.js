(function($) {
	var pluggyd = chrome.extension.getBackgroundPage().pluggyd;
	
	$(function() {
		setupPage();
	});
	
	function setupPage() {
		$('#pluginVersion').text(chrome.app.getDetails().version);
		
		checkboxSetting('slimModeEnabled');
		checkboxSetting('animateAvatars');
	}
	
	function checkboxSetting(settingName) {
		var $element = $('#' + settingName);
		$element.prop('checked', pluggyd.preferences[settingName]);
		$element.click(function() {
			pluggyd.preferences[settingName] = $element.is(':checked');
			pluggyd.savePreferences(pluggyd.preferences);
			pluggyd.sendMessageToTabs({
				event: settingName + 'Changed',
				args: pluggyd.preferences[settingName]
			});
		});
	}
})(jQuery);