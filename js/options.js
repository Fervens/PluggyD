(function($) {
	$(function() {
		$('#pluginVersion').text(chrome.app.getDetails().version);
	});
})(jQuery);