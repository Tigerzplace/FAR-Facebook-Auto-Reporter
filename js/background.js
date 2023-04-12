chrome.runtime.onConnect.addListener(function (externalPort) {
	externalPort.onDisconnect.addListener(function () {
		chrome.browserAction.setBadgeBackgroundColor({ color: "#bb1511" });
		chrome.browserAction.setBadgeText({ text: "X" });

		setTimeout(function () {
			chrome.browserAction.setBadgeText({ text: "" });
		}, 3000);
	});
});



function injectContentScript(tabId) {
	chrome.tabs.executeScript(
	  tabId,
	  { file: '/js/newContent.js' },
	  function() {
		console.log('Content script loaded');
	  }
	);
  }



/*


function injectContentScript(tabId) {
	chrome.tabs.executeScript(
		tabId,
		{
			file: '/js/newContent.js',
			allFrames: true // <-- execute in all frames of the tab
		},
		function (results) {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			} else {
				// Check if the content script has already been loaded
				var isLoaded = false;
				for (var i = 0; i < results.length; i++) {
					if (results[i] !== null) {
						isLoaded = true;
						break;
					}
				}
				if (!isLoaded) {
					// Inject the content script
					chrome.tabs.executeScript(
						tabId,
						{ file: '/js/newContent.js' },
						function () {
							console.log('Content script loaded');
						}
					);
				} else {
					console.log('Content script already loaded');
				}
			}
		}
	);
}


function clearLogs() {
	chrome.storage.local.remove("logs", function() {
	  console.log("Logs cleared");
	});
  }
  

(function() {
	var originalLog = console.log;
	console.log = function() {
	  var logMessage = Array.prototype.slice.call(arguments).join(" ");
	  var stack = new Error().stack;
	  var stackLines = stack.split('\n');
	  var callerLine = stackLines[2].trim();
	  var fileMatch = callerLine.match(/(https?:\/\/[^\s]+)/);
	  var fileName = fileMatch ? fileMatch[1].split('/').pop() : 'unknown';
	  var lineNumberMatch = callerLine.match(/:(\d+):\d+$/);
	  var lineNumber = lineNumberMatch ? lineNumberMatch[1] : 'unknown';
	  chrome.runtime.sendMessage({action: "log", data: logMessage, file: fileName + ":" + lineNumber, timestamp: Date.now()});
	  originalLog.apply(console, arguments);
	};
  })();

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "log") {
	  chrome.storage.local.get("logs", function(data) {
		var logs = data.logs || [];
		logs.push({message: message.data, file: message.file, timestamp: message.timestamp});
		chrome.storage.local.set({logs: logs});
	  });
	}
  });
  */