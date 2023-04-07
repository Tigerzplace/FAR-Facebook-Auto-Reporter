chrome.runtime.onConnect.addListener(function (externalPort)  {
	externalPort.onDisconnect.addListener(function() {
							chrome.browserAction.setBadgeBackgroundColor({color: "#bb1511"});
							chrome.browserAction.setBadgeText({text: "X"});
							
							setTimeout (function (){
								chrome.browserAction.setBadgeText({text: ""});
							},3000);
	});
}); 

/*
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