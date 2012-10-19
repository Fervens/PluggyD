(function($) {
	$(function() {
		setupListenerForInjected();
		setupListenerForExtension();
		injectIntoPage();
	});
	
	function setupListenerForInjected() {
		window.addEventListener("message", function(event) {
			if (event.source != window || !event.data) {
			  return;
			}
			
			var data = JSON.parse(event.data);
			if (!data.pluggydInjected) {
				return;
			}
			
			if (data.event == 'initialize') {
				chrome.extension.sendMessage(data, function(message) {
					sendMessageToInjected(message);
				});
				return;
			}
			
			chrome.extension.sendMessage(data);
		}, false);
	}
	
	function setupListenerForExtension() {
		chrome.extension.onMessage.addListener(function(message) {
			sendMessageToInjected(message);
		});
	}

	function sendMessageToInjected(message) {
		message.pluggydContent = true;
		window.postMessage(JSON.stringify(message), '*');
	}
	
	function injectIntoPage() {
		//Bind listeners before injecting into plug.dj.
		$("head script:last").after(
			'<script src="' + chrome.extension.getURL('js/injected.js') + '"></script>'
		);
	}
})(jQuery);