(function($) {
	$(function() {
		$('#pluginVersion').text(chrome.app.getDetails().version);
		
		var $slimModeEnabled = $('#slimModeEnabled');
		var slimModeEnabled = (window.localStorage.slimModeEnabled == "checked");
		$slimModeEnabled.prop('checked', slimModeEnabled);
		$slimModeEnabled.click(function() {
			window.localStorage.slimModeEnabled = $slimModeEnabled.is(':checked') ? "checked" : "";
			console.log(window.localStorage.slimModeEnabled);
		});
	});
})(jQuery);