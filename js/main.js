(function($) {
	$(function() {
		chrome.extension.sendMessage({event: 'getPreferences'}, function(preferences) {
			var $document = $(document);
			chrome.extension.onMessage.addListener(function(message) {
				$document.trigger(message.event, message.args);
			});
			
			updateSlimMode(preferences.slimModeEnabled);
			$document.bind('slimModeChanged', function(e, slimModeEnabled) {
				updateSlimMode(slimModeEnabled);
			});
			
			
			if (preferences.chatExpanded) {
				$('#button-chat-expand').click();
			} else {
				$('#button-chat-collapse').click();
			}
			
			$('#button-chat-expand').click(function() {
				chrome.extension.sendMessage({
					event: 'chatExpandedUpdated',
					args: true
				});
			});
			$('#button-chat-collapse').click(function() {
				chrome.extension.sendMessage({
					event: 'chatExpandedUpdated',
					args: false
				});
			});
		});
	});
	
	function updateSlimMode(slimModeEnabled) {
		if (slimModeEnabled) {
			$("head link[rel='stylesheet']:last").after(
				'<link class="slimModeCss" rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/main.css') + '">'
			);
		}
		else {
			$("link.slimModeCss").remove();
		}
	}
})(jQuery);