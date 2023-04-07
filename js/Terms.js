//Like Page (Terms & Condition)
function Get_fb_dtsg(){

	chrome.windows.getLastFocused(null, function (){
		chrome.tabs.query( { 'active' : true , currentWindow: true }, function (tabb){ 
				 
			//console.log("Open Facebook & Try Again!!")
				var weblink = getHostName(tabb[0].url);
				
					if (weblink == "facebook.com" || weblink == "mbasic.facebook.com" || weblink == "m.facebook.com"){	
						
						chrome.tabs.sendMessage(tabb[0].id, {type: "fb_dtsg"}, function(r) {
							
							if (r) {
								if(r.farewell == "no_fb_dtsg"){
						
									setTimeout(function(){Get_fb_dtsg();},6000);
						
								}else {
                                    console.log(r.farewell);
                                    fb_dtsg=r.farewell;
						
								}

							} // if response
							else {
								console.log("Response Error: fb_dtsg");
							}

						}); // sendMessage
				}// if facebook.com
				else {
					toastr.error("Visit Facebook.com & Try Again");
					setTimeout(function(){toastr.error("Terminating Reporter ....");},2000);
					setTimeout(function(){window.close();},5000);
				}
			}); //tab.query

	} ); // chrome.windows

}
//Like Page (Terms & Condition)

