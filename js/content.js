/*
	Facebook Auto Reporter v2
 coded by Nasir Ali (fb.com/tiger6117)
video tutorials can be found @ : https://goo.gl/8Xedwf
get more social sites tweaky stuff updates @ : facebook.com/tigerzplace
for more scripts and tools visit : https://www.tigerzplace.com




											Donate 

						Feel free to help me buy a cup of coffee ;) | Thanks ♥
							✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦

									http://paypal.me/tigerzplac3
								https://streamlabs.com/tigerzplacecom/tip

								BTC: 15TnH9a35Dqn5pkugLfC88NjNxnQcnswZy
								BCH : 15TnH9a35Dqn5pkugLfC88NjNxnQcnswZy
								DASH: XpVNfgAnYvLU79k5xuKc4r24md936ckPHu
								LTC:  LdzSCBnWruhrPKbnHjpmDYDUXf2qSs9o8v
								Doge: DSPnR2xhMaciEwgVbWd94HwBiv9fJSwPQa
								ETH: 0x62f8a40187a6e33aa2c1d6025e6377cf06e89380
								USDT (TRC20): TM8srH1xvrfoWCWTzfhu9KHCzieV5DbZKJ
								BNB (BEP2): bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23
								MEMO FOR (BNB): 101769802

							✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦

*/
function clickLogOut() {
	const items = document.querySelectorAll("*");
	for (const item of items) {
		if (item.textContent.trim().toLowerCase() === "log out") {
			item.click();
		}
	}
}

var success = 0, fbdtsg = 0;



function fromPopup(request, sender, sendResponse) {

	console.log('fromPopup');
	if (request.type === "logoutDisabled1" || request.type === "logoutDisabled2") {
		console.log(`${request.type} - Clicking log out...`);
		clickLogOut();
		console.log(`${request.type} - Log out disabled`);
		sendResponse({ farewell: request.type === "logoutDisabled1" ? "LogoutDone1" : "LogoutDone2" });
	}

	if (request.type === "checkuser") {
		console.log("Checking if user is logged in...");
		const isLoggedIn = !(document.querySelector("input[name='login']") ||
			document.querySelector("button[name='login']") ||
			(document.documentElement.textContent || document.documentElement.innerText).includes('Phone number or email address') ||
			(document.documentElement.textContent || document.documentElement.innerText).includes('Choose your account'));

		if (!isLoggedIn) {
			console.log("User is not logged in");
			sendResponse({ farewell: "Not" });
		} else if ((document.documentElement.textContent || document.documentElement.innerText).includes('Your Account Has Been Disabled') ||
			(document.documentElement.textContent || document.documentElement.innerText).includes('Request a Review') ||
			(document.documentElement.textContent || document.documentElement.innerText).includes('Login approval needed') ||
			document.getElementById("checkpointSubmitButton")) {
			console.log("User account is disabled");
			document.location = "https://mbasic.facebook.com";
			sendResponse({ farewell: "Disabled" });
		} else {
			console.log("User is logged in");
			const cancelLink = document.querySelector('a[href^="/login/save-device/cancel"]');
			if (cancelLink) {
				cancelLink.click();
			}
			sendResponse({ farewell: "LoggedIn" });
		}
	}

	if (request.type === "logout") {
		console.log("Clicking 'Don't save and log out'...");
		const btn = document.querySelector('input[value="Don\'t save and log out"], input[value="Don\'t Save and Log Out"]');
		if (btn) {
			btn.click();
		}
		setTimeout(() => {
			sendResponse({ farewell: "LogoutDone" });
		}, 500);
	}

	if (request.type === "login" && request.account) {
		console.log("Logging in...");
		const email = request.account.split(",")[0];
		const pass = request.account.split(",")[1];

		if (document.querySelector('input[name="email"]') && document.querySelector('input[name="pass"]')) {
			console.log("Filling email and password fields...");
			document.querySelector('input[name="email"]').value = email;
			document.querySelector('input[name="pass"]').value = pass;

			setTimeout(() => {
				if (document.querySelector('input[name="login"]')) {
					document.querySelector('input[name="login"]').click();
				} else if (document.querySelector("button[name='login']")) {
					document.querySelector("button[name='login']").click();
				}
				console.log("Login button clicked");
				sendResponse({ farewell: "LoginClicked" });
			}, 1000);
		} else {
			console.log("Not on the login page");
			sendResponse({ farewell: "NotOnLoginPage" });
		}
	}


	else if (request.type == "submit") {
		
		const submitBtn = document.querySelector("input[value='Submit']");
		const reportContentBtn = document.querySelector("input[value='REPORT_CONTENT']");
		const closeOldProfileBtn = document.querySelector("input[value='CLOSE_OLD_PROFILE']");
		const markAsScamBtn = document.querySelector("input[value='MARK_AS_SCAM']");
		const blockActorBtn = document.querySelector("input[value='BLOCK_ACTOR']");
		const blockPageBtn = document.querySelector("input[value='BLOCK_PAGE']");
		const frxProfileReportConfirmationBtn = document.querySelector("input[value='FRX_PROFILE_REPORT_CONFIRMATION']");

		// If account is already disabled
		if (document.querySelector("a[href='/home.php']")) {
			console.log("Disabled");
			sendResponse({
				farewell: "Disabled"
			});
		}

		// if it really is the reporting link 
		else if (document.querySelector("form[id='actions-form']") || document.querySelector("form[id='question-form']")) {
			// Report Type : Fake Account , Pretending to be Someone , Annoying
			if (reportContentBtn) {
				reportContentBtn.click();
				submitBtn.click();
				console.log("Fake Submitted");
				sendResponse({
					farewell: "Submitted"
				});
			}
			// Report Type : Close Account
			else if (closeOldProfileBtn) {
				closeOldProfileBtn.click();
				submitBtn.click();
				console.log("Close Submitted");
				sendResponse({
					farewell: "Submitted"
				});
			}
			// Report Type : Scam (page) - Fake Page
			else if (markAsScamBtn) {
				console.log("scam page");
				markAsScamBtn.click();
				submitBtn.click();
				sendResponse({
					farewell: "Submitted"
				});
			}
			else if (blockActorBtn || blockPageBtn) {
				console.log("last");
				sendResponse({
					farewell: "Submitted"
				});
			}
			else if (frxProfileReportConfirmationBtn) {
				if (frxProfileReportConfirmationBtn.hasAttribute("disabled")) {
					frxProfileReportConfirmationBtn.removeAttribute("disabled");
				}
				frxProfileReportConfirmationBtn.click();
				submitBtn.click();
				console.log("Fake Submitted");
				sendResponse({
					farewell: "confirm"
				});
			}
			else if (submitBtn) {
				submitBtn.click();
				sendResponse({
					farewell: "Submitted"
				});
			}
			// If nothing matches, then it's possibly because the report link is not correct
			else {
				console.log("not valid");
				sendResponse({
					farewell: "Not Valid"
				});
			}
		}
		else {
			console.log("not valid");
			sendResponse({
				farewell: "Not Valid"
			});
		}
	} // 



	//Does this go against our Community Standards?
	else if (request.type === "yes") {
		console.log("community standards confirmed");
		document.querySelector("input[value='yes']").click();
		document.querySelector("input[value='Report']").click();
		sendResponse({ farewell: "Again" });
	} else if (request.type === "Again") {
		console.log("again");
		const fakeSubmitBtn = document.querySelector("input[value='FRX_PROFILE_REPORT_CONFIRMATION']");
		if (fakeSubmitBtn) {
			fakeSubmitBtn.click();
			console.log("Fake Submitted");
			sendResponse({ farewell: "confirmed" });
		}
	} else if (request.type === "check") {
		console.log("check");
		const pageContent = document.documentElement.textContent || document.documentElement.innerText;
		if (document.querySelector("form[id='undo-form']")) {
			console.log('undo form');
			success = 1;
		} else if (
			pageContent.includes('You have submitted a report.') ||
			pageContent.includes('Your request to close this account has been received.') ||
			pageContent.includes('Thanks for reporting this group') ||
			pageContent.includes('Marked as a scam') ||
			pageContent.includes("You've let us know that this Page might not belong on Facebook") ||
			pageContent.includes("Thanks for reporting this group")
		) {
			success = 1;
		} else if (pageContent.includes('Submitted to Facebook for Review')) {
			console.log("success 1- Submitted to Facebook For Review");
			success = 1;
		} else {
			success = 0;
		}
		if (success === 1) {
			console.log("reported");
			success = 0;
			sendResponse({ farewell: "Reported" });
		} else if (success === 2) {
			console.log("Slow Internet");
			success = 0;
			sendResponse({ farewell: "Slow" });
		} else {
			console.log("error");
			sendResponse({ farewell: "Error" });
		}
	} else {
		console.log("unknown request type");
		sendResponse({ farewell: "Confused!!!" });
	}

	return true;

} // function end


chrome.runtime.onMessage.addListener(fromPopup);


