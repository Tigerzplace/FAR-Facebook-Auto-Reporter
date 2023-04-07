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

function clickLogOut() {
    if (document.all !== undefined) {
        var items = document.all;
    }
    else {
        var items = document.getElementsByTagName("*");
    };
    for (var i = 0; i < items.length; ++i) {
        if (items[i].textContent.includes("Log Out")) {
            items[i].click();
        }
    }
    return 1;
}

var success = 0, fbdtsg = 0;
function fromPopup(request, sender, sendResponse) {

    console.log('fromPopup');

    switch (request.type) {
        case "logoutDisabled1":
        case "logoutDisabled2":
            console.log(`${request.type} - Clicking log out...`);
            clickLogOut();
            console.log(`${request.type} - Log out disabled`);
            sendResponse({ farewell: request.type === "logoutDisabled1" ? "LogoutDone1" : "LogoutDone2" });
            break;

        // checking if user is logged in or not
        case "checkuser":
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
                document.location = "http://mbasic.facebook.com";
                sendResponse({ farewell: "Disabled" });
            } else {
                console.log("User is logged in");
                const cancelLink = document.querySelector('a[href^="/login/save-device/cancel"]');
                if (cancelLink) {
                    cancelLink.click();
                }
                sendResponse({ farewell: "LoggedIn" });
            }
            break;



        case "logout":
            console.log("Clicking 'Don't save and log out'...");
            const btn = document.querySelector('input[value="Don\'t save and log out"], input[value="Don\'t Save and Log Out"]');
            if (btn) {
                btn.click();
            }
            setTimeout(() => {
                sendResponse({ farewell: "LogoutDone" });
            }, 500);
            break;


        //login user
        case "login":
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
            break;


        // for submit button
        case "submit":
            console.log("submit");

            const submitBtn = document.querySelector("input[value='Report']");
            const reportContentBtn = document.querySelector("input[value='REPORT_CONTENT']");
            const closeOldProfileBtn = document.querySelector("input[value='CLOSE_OLD_PROFILE']");
            const markAsScamBtn = document.querySelector("input[value='MARK_AS_SCAM']");
            const blockActorBtn = document.querySelector("input[value='BLOCK_ACTOR']");
            const blockPageBtn = document.querySelector("input[value='BLOCK_PAGE']");
            const frxProfileReportConfirmationBtn = document.querySelector("input[value='FRX_PROFILE_REPORT_CONFIRMATION']");

            const actionsForm = document.querySelector("form[id='actions-form']");
            const questionForm = document.querySelector("form[id='question-form']");

            // If account is already disabled
            if (document.querySelector("a[href='/home.php']")) {
                console.log("Disabled");
                sendResponse({ farewell: "Disabled" });
                break;
            }

            // Check if it's the old report link or the new one
            if (actionsForm || questionForm) {
                console.log("Report for accounts, groups & pages");

                if (reportContentBtn) {
                    reportContentBtn.click();
                    submitBtn.click();
                    console.log("Fake submitted");
                    sendResponse({ farewell: "Submitted" });
                } else if (closeOldProfileBtn) {
                    closeOldProfileBtn.click();
                    submitBtn.click();
                    console.log("Close submitted");
                    sendResponse({ farewell: "Submitted" });
                } else if (markAsScamBtn) {
                    console.log("Scam page");
                    markAsScamBtn.click();
                    submitBtn.click();
                    sendResponse({ farewell: "Submitted" });
                } else if (blockActorBtn || blockPageBtn) {
                    console.log("Last");
                    sendResponse({ farewell: "Submitted" });
                } else if (frxProfileReportConfirmationBtn) {
                    console.log('frxProfileReportConfirmationBtn');
                    if (frxProfileReportConfirmationBtn.hasAttribute("disabled")) {
                        frxProfileReportConfirmationBtn.removeAttribute("disabled");
                    }
                    frxProfileReportConfirmationBtn.click();
                    submitBtn.click();
                    console.log("Fake submitted");
                    sendResponse({ farewell: "confirm" });
                } else if (submitBtn) {
                    submitBtn.click();
                    sendResponse({ farewell: "Submitted" });
                } else {
                    console.log("Not valid");
                    sendResponse({ farewell: "Not Valid" });
                }
            } else {
                console.log("Report for accounts, groups & pages -- new");

                if (
                    (document.documentElement.textContent || document.documentElement.innerText).indexOf(
                        "I believe that this goes against Facebook's Community Standards"
                    ) > -1
                ) {
                    document.getElementById("m_check_list_aria_label").click();
                    document.querySelector("input[value='Report']").click();
                    sendResponse({ farewell: "submitAgain" });
                } else if (frxProfileReportConfirmationBtn) {
                    if (frxProfileReportConfirmationBtn.hasAttribute("disabled")) {
                        frxProfileReportConfirmationBtn.removeAttribute("disabled");
                    }
                    document.querySelector("input[value='FRX_PROFILE_REPORT_CONFIRMATION']").click();
                    document.querySelector("input[value='Submit']").click();
                    console.log("Fake submitted");
                    sendResponse({ farewell: "confirm" });
                } else if (document.querySelector("input[value='REPORT_CONTENT']")) {
                    document.querySelector("input[value='REPORT_CONTENT']").click();
                    document.querySelector("input[value='Submit']").click();
                    console.log("Group submitted");
                    sendResponse({ farewell: "Submitted" });
                } else if (document.querySelector("input[value='Submit']")) {
                    document.querySelector("input[value='Submit']").click();
                    sendResponse({ farewell: "Submitted" });
                } else {
                    console.log("not valid");
                    sendResponse({ farewell: "Not Valid" });
                }
                break;
            }

        case "yes":
            console.log("community standards confirmed");
            document.querySelector("input[value='yes']").click();
            document.querySelector("input[value='Report']").click();
            sendResponse({ farewell: "Again" });
            break;



        case "Again":
            console.log("again");
            const fakeSubmitBtn = document.querySelector("input[value='FRX_PROFILE_REPORT_CONFIRMATION']");
            if (fakeSubmitBtn) {
                fakeSubmitBtn.click();
                console.log("Fake Submitted");
                sendResponse({ farewell: "confirmed" });
            }
            break;



        case "check":
            console.log("check");

            const pageContent = document.documentElement.textContent || document.documentElement.innerText;
            const successConditions = [
                'You have submitted a report',
                'Your request to close this account has been received.',
                'Thanks for reporting this group',
                'Marked as a scam',
                "You've let us know that this Page might not belong on Facebook",
                'Submitted to Facebook for review'
            ];
            let success = successConditions.some(condition => pageContent.includes(condition)) ? 1 : 0;

            if (document.querySelector("form[id='undo-form']")) {
                console.log('undo form');
                success = 1;
            }

            if (success === 1) {
                console.log("reported");
                document.querySelector("input[value='Submit']").click();
                sendResponse({ farewell: "Reported" });
            } else {
                console.log("error");
                sendResponse({ farewell: "Error" });
            }


            break;


        default:
            console.log("unknown request type");
            sendResponse({ farewell: "Confused!!!" });
            break;
    }
} //popup function



chrome.runtime.onMessage.addListener(fromPopup);



