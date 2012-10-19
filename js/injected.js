(function($) {
	$(function() {
		setupListenerForContent();
		sendMessageToContent({
			event: 'initialize'
		});
	});
	
	function setupListenerForContent() {
		var initialized = false;
		var $document = $(document);
		
		window.addEventListener("message", function(event) {
			if (event.source != window || !event.data) {
				return;
			}
			
			var data = JSON.parse(event.data);
			if (!data.pluggydContent) {
				return;
			}
			
			if (data.event == 'initialize') {
				initialize(data.args);
				initialized = true;
			}
			
			//Can only run init event until we've been initalized.
			if (!initialized) {
				return;
			}
			
			$document.trigger(data.event, data.args);
		}, false);
	}
	
	function sendMessageToContent(message) {
		message.pluggydInjected = true;
		window.postMessage(JSON.stringify(message), '*');
	}
	
	var pluggydSettings = null;
	function initialize(args) {
		var $document = $(document);
		var preferences = args.preferences;
		pluggydSettings = args.pluggydSettings;
		
		updateSlimMode(preferences.slimModeEnabled);
		$document.bind('slimModeEnabledChanged', function(e, slimModeEnabled) {
			updateSlimMode(slimModeEnabled);
		});
		
		updateChatExpanded(preferences.chatExpanded);
		$('#button-chat-expand').click(function() {
			sendMessageToContent({
				event: 'chatExpandedUpdated',
				args: true
			});
		});
		$('#button-chat-collapse').click(function() {
			sendMessageToContent({
				event: 'chatExpandedUpdated',
				args: false
			});
		});
		
		updateAvatarAnimations(preferences.animateAvatars);
		$document.bind('animateAvatarsChanged', function(e, animateAvatars) {
			updateAvatarAnimations(animateAvatars);
		});
	}
	
	function updateSlimMode(slimModeEnabled) {
		if (slimModeEnabled) {
			$("head link[rel='stylesheet']:last").after(
				'<link class="slimModeCss" rel="stylesheet" type="text/css" href="' + pluggydSettings.slimModeCss + '" />'
			);
		}
		else {
			$("link.slimModeCss").remove();
		}
	}
	
	function updateChatExpanded(chatExpanded) {
		if (chatExpanded) {
			$('#button-chat-expand').click();
		}
		else {
			$('#button-chat-collapse').click();
		}
	}
	
	var defaultAnimationFunc = null;
	function updateAvatarAnimations(animateAvatars) {
		if (!defaultAnimationFunc) {
			defaultAnimationFunc = RoomUser.animateAvatars;
		}
		
		if (animateAvatars) {
			RoomUser.animateAvatars = defaultAnimationFunc;
		}
		else {
			RoomUser.animateAvatars = function() {};
		}
	}
})(jQuery);