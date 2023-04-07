/*
	Facebook Auto Reporter v2
 coded by Nasir Ali (fb.com/tiger6117)
video tutorials can be found @ : https://goo.gl/8Xedwf
get more social sites tweaky stuff updates @ : facebook.com/tigerzplace
for more scripts and tools visit : https://www.tigerzplace.com



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




var v2 = 0, tryy = 0, returnn = 0, globel_url = 0, url_len = 0, ids_length = 0; done = 0, count = 0, newlinks = 0, blocked = 0, loadlinks = 0, PersistentWindow = 0, loginAccounts = 0;




let FAR = document;
const karKom = 0;
let excludedIDs, ex_len;
let port = chrome.runtime.connect();
var orignal_wait = 0, reportingAccount = 0;
let tabId, wait, link = 0, global_url_len = 0;
var manifestData = chrome.runtime.getManifest();

let profileData = { "name": 0, "dp": 0, userID: 0 };


//for dividing algorithm

let linksPerAccount = 0, currentAccountIndex = 0, currentLinkIndex = 0, dividingAlgorithm = 0, temp_global_urls = 0, temp_global_url_len = 0;


const hosts = ["facebook.com", "m.facebook.com", "mbasic.facebook.com", "web.facebook.com", "touch.facebook.com", "mobile.facebook.com"];





function stopReporter(stop) {

	if (ResetAll()) {


		if (stop) {

			document.getElementById('status2').innerHTML = 'Stopped';
			document.getElementById('status2').style.color = 'Red';
			alert("Want to stop reporting?");
			toastr.info("Reporting will stop soon. ");

		} else {
			toastr.info("close FAR and refresh page!!! ");
			alert("Auto Reporting is Completed");
		}

	}

}

function logs(log) {

	if (v2) {
		document.getElementById("reportLinks2").value += log + "\n";
	} else {
		document.getElementById("ReportLinks").value += log + "\n";
	}
}


function newReportLinks(log) {

	if (v2) {
		document.getElementById("NewReportLinks2").value += log + "\n";
	} else {
		document.getElementById("NewReportLinks").value += log + "\n";
	}

}

function Report(Account) {

	// show, skip and stop button in the reporter
	document.getElementById("btn-before").style.display = "none";
	document.getElementById("btn-after").style.display = "block";


	chrome.tabs.update(tabId, { url: Account }, function () {
		// current link from global url == link

		const listener = (tabId, tabInfo) => {
			if (filter(tabInfo.url)) {
				toastr.error("You aren't allowed xD");
				logs("Link " + link + ": " + Account + " | Can't Report !");
				chrome.tabs.onUpdated.removeListener(listener);
				reportOnThis(globel_url[++currentLinkIndex]);
			} else {
				if (tabInfo.status === 'complete') {
					chrome.tabs.onUpdated.removeListener(listener);
					// Trying to submit report to FaceBook.
					chrome.tabs.sendMessage(tabId, { type: "submit" }, async function (response) {
						// link is just for log
						link = currentLinkIndex + 1;
						if (response) {
							switch (response.farewell) {
								case 'Submitted':
								case 'confirm':
								case 'submitAgain':
									let tyype;
									if (response.farewell == "submitAgain") {
										tyype = "Again";
										console.log(tyype);
									} else if (response.farewell == "Submitted") {
										tyype = "check";
										console.log(tyype);
									} else if (response.farewell == "confirm") {
										tyype = "yes";
										console.log(tyype);
									}
									finalReport(tyype);
									break;
								case 'Disabled':
									notValid = currentLinkIndex + 1;
									toastr.info("Link: " + notValid + " - (Account) is Blocked");
									notValid++;
									logs("Link " + notValid + ": " + Account + " | Blocked");
									reportOnThis(globel_url[++currentLinkIndex]);
									break;
								case 'Not Valid':
									toastr.error("Wrong Report Link !!!");
									logs("Link " + link + ": " + Account + " | Wrong Link");
									reportOnThis(globel_url[++currentLinkIndex]);
									break;
								default:
									break;
							}
						} else {
							tryy++;
							if (tryy > 5) {
								tryy = 0;
								toastr.error("Trying next link");
								logs("Link " + link + ": " + Account + " | Response error");
								reportOnThis(globel_url[++currentLinkIndex]);
							} else {
								console.log("If Response Error");
								toastr.error("Response Error: Trying Again!");
								Report(Account);
							}
						}
					});
				}
			}
		};
		chrome.tabs.onUpdated.addListener(listener);
	});

	async function finalReport(sendType) {
		console.log("sendType: " + sendType);

		const res = await new Promise((resolve) => {
			setTimeout(() => {
				chrome.tabs.sendMessage(tabId, { type: sendType }, (res) => {
					resolve(res);
				});
			}, 3000);
		});

		if (v2) {
			document.getElementById('reportedLinks2').style.color = "red";
		} else {
			document.getElementById('reportedLinks').style.color = "red";
		}

		if (res) {
			if (res.farewell == "confirmed") {
				await new Promise((resolve) => {
					chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
						if (info.status === 'complete') {
							chrome.tabs.onUpdated.removeListener(listener);
							resolve();
						}
					});
				});
				await finalReport("check");
			} else if (res.farewell == "Again") {
				await new Promise((resolve) => {
					chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
						if (info.status === 'complete') {
							chrome.tabs.onUpdated.removeListener(listener);
							resolve();
						}
					});
				});
				await finalReport("Again");
			} else if (res.farewell == "Reported") {
				done++;
				count++;
				if (v2) {
					document.getElementById('reportedLinks2').innerHTML = done;
				} else {
					document.getElementById('reportedLinks').innerHTML = done;
				}
				chrome.browserAction.setBadgeText({ text: "" + done });

				setTimeout(() => {
					if (done == 1) {
						toastr.success(done + " Report is Done");
						logs("Link " + link + ": " + Account + " | Reported");
						newReportLinks(Account);
						reportOnThis(globel_url[++currentLinkIndex]);
					} else {
						toastr.success(done + " Reports are Done");
						logs("Link " + link + ": " + Account + " | Reported");
						newReportLinks(Account);
						reportOnThis(globel_url[++currentLinkIndex]);
					}
				}, 1000);
			} else if (res.farewell == "Slow") {
				toastr.error("Report wasn't Successful");
				toastr.warning("Your Internet Speed might be Slow");
				logs("Link " + link + ": " + Account + " | Not Done");
				reportOnThis(globel_url[++currentLinkIndex]);
			} else if (res.farewell == "Error") {
				toastr.error("Error : Trying next link.");
				logs("Link " + link + ": " + Account + " | Not Done");
				reportOnThis(globel_url[++currentLinkIndex]);
			}
		} else {
			tryy++;
			if (tryy > 5) {
				tryy = 0;
				toastr.error("Trying next link");
				logs("Link " + link + ": " + Account + " | Response error");
				reportOnThis(globel_url[++currentLinkIndex]);
			} else {
				console.log("If Response Error");
				toastr.error("Response Error: Trying Again!");
				Report(Account);
			}
		}

	} // finalReport
	
}// Report Function

	function updateUrl(LinkToVisit) {
		console.log("updateURL");

		if (wait < orignal_wait && url_len > 20) {

			if (done < 21) {
				wait = 5 * 1000;
			} else if (done > 21 && done < 50) {
				wait = 7 * 1000;
			} else if (done >= 50 && done <= 100) {
				wait = 8 * 1000;
			} else if (done > 100 && done <= 180) {
				wait = 12 * 1000;
			} else if (done > 180 && done <= 250) {
				wait = 15 * 1000;
			} else if (done > 250 && done > 300) {
				wait = 20 * 1000;
			}
		} else {
			wait = orignal_wait;
		}

		chrome.windows.getLastFocused(null, function () {

			chrome.tabs.query({ 'active': true, 'url': "*://*.facebook.com/*" }, function (tab) {

				tabId = tab[0].id;
				console.log("tabid" + tabId);
				chrome.browserAction.setBadgeBackgroundColor({ color: "#bb1511" });

				if (v2) {
					document.getElementById("reportLinks2").value = "\t\t\t\t\t\tlogs\n\n";
					document.getElementById("loginCredentials").value = "\t\t\t\tUsed Account Logs\n\n";

					// remaining work from here.
					if (loginAccounts.length > 1 && url_len > 1500 && dividingAlgorithm == 0) {


						// activate dividing algorithm
						dividingAlgorithm = 1
						temp_global_urls = global_url;
						temp_global_url_len = url_len;


						linksPerAccount = Math.floor(temp_global_url_len / loginAccounts.length);
						toastr.success("Dividing algorithm detected!!!");

						toastr.info(`Links to report per account: ${linksPerAccount}`);
						document.getElementById("loginCredentials").value = '';
						newDividingAlgorithm(0);

					} else {

						checkLoginPage();

					}
				}

				else {
					document.getElementById("ReportLinks").value = "\t\t\t\t\t\tlogs\n\n";
					Report(LinkToVisit);
				}



			}); //tab.query
		});

	} //updateUrl


	function newDividingAlgorithm(restart = 0) {


		console.log("Dividing Algorithm");

		const startIndex = currentLinkIndex;
		const endIndex = startIndex + linksPerAccount;

		global_url = temp_global_urls.slice(startIndex, endIndex);
		url_len = global_url.length;


		if (document.getElementById("loginCredentials").value === '') {


			var algoLog = `
			Dividing Algorithm Activated...!\n

				Total links: ${temp_global_url_len}
				Total accounts: ${loginAccounts.length}
				Reports Per Account to: ${linksPerAccount}	

		********************************************************\n\n`;

			document.getElementById("loginCredentials").value += algoLog;

		} else {

			document.getElementById("loginCredentials").value += " \n ***************************************************** \n";

		}


		if (restart) {

			v2 = 0;
			currentAccountIndex = 0;
			currentLinkIndex += linksPerAccount;

		} else {

			checkLoginPage();

		}


		if (currentLinkIndex >= temp_global_url_len) {

			v2 = 1;
			toastr.success(`Reporting completed using new algo!!!`);
			return 1; // all links have been visited

		}

		loginControl(currentAccountIndex);

	}

	function reportOnThis(id) {

		console.log(`ids_length: ${ids_length}`);
		console.log("reportonThis(id): id = " + id);
		console.log("++currentLinkIndex:" + currentLinkIndex);
		console.log("url_len:" + url_len);

		if (currentLinkIndex <= url_len) {

			console.log("currentLinkIndex <= url_len");

			if (is_valid_url(id)) {

				if (count == 20) {
					count = 0;

					chrome.browserAction.setBadgeBackgroundColor({ color: "black" });
					chrome.browserAction.setBadgeText({ text: "Wait" });



					if (v2) {

						document.getElementById('status2').innerHTML = 'Waiting... ';
						document.getElementById('status2').style.color = 'Black';

					} else {

						document.getElementById('status').innerHTML = 'Waiting... ';
						document.getElementById('status').style.color = 'Black';

					}

					toastr.info("Reporter will start after a minute");

					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 1000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 4000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 8000);

					setTimeout(function () { toastr.info("50 sec is remaining"); }, 10000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 12000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 14000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 18000);

					setTimeout(function () { toastr.info("40 sec is remaining"); }, 20000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 22000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 24000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 28000);

					setTimeout(function () { toastr.info("30 sec is remaining"); }, 30000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 32000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 34000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 38000);


					setTimeout(function () { toastr.info("20 sec is remaining"); }, 40000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 42000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 44000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 48000);

					setTimeout(function () { toastr.info("10 sec is remaining"); }, 50000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 52000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 54000);
					setTimeout(function () { toastr.info("Please wait ... !!!"); }, 58000);

					setTimeout(function () {


						if (v2) {
							document.getElementById('status2').innerHTML = 'On';
							document.getElementById('status2').style.color = 'green';
						} else {

							document.getElementById('status').innerHTML = 'On';
							document.getElementById('status').style.color = 'green';

						}

						toastr.success("Reporter is started again !!!");

						setTimeout(function () {
							chrome.browserAction.setBadgeText({ text: "" + done });
							chrome.browserAction.setBadgeBackgroundColor({ color: "#bb1511" });
							Report(id);
						}, 1000);

					}, 60000);

				} else {
					if (link == 0 && reportingAccount == 0 && currentAccountIndex == 0 && v2 == 1) {


						console.log("link == 0 && reportingAccount == 0 && currentAccountIndex==0");

						setTimeout(function () { toastr.info("Estimated time for reporting:  " + (estimate_time * loginAccounts.length) / 60 + " min") }, 5000);
						updateUrl(id);

					} else if (v2 == 0 && currentLinkIndex == 0) {
						setTimeout(function () { toastr.info("Estimated time for reporting:  " + estimate_time / 60 + " min") }, 2000);
						updateUrl(id);
					} else {
						link++;
						// new algo for time saving
						if (wait < orignal_wait && url_len > 20) {

							if (done < 21) {
								wait = 2 * 1000;
							} else if (done > 21 && done < 50) {
								wait = 5 * 1000;
							} else if (done >= 50 && done <= 100) {
								wait = 8 * 1000;
							} else if (done > 100 && done <= 180) {
								wait = 12 * 1000;
							} else if (done > 180 && done <= 250) {
								wait = 15 * 1000;
							} else if (done > 250 && done > 300) {
								wait = 20 * 1000;
							}
						} else { wait = orignal_wait - 1000; }

						console.log(wait + " seconds");
						setTimeout(function () { toastr.info("Next report after " + (wait / 1000) + " seconds."); }, 1000);
						setTimeout(function () { Report(id); }, wait);

					} // else if link==0
				} // else if count


			} else {

				if (currentLinkIndex == 0) {

					if (v2) {
						document.getElementById("reportLinks2").value = "\t\t\t\t\t\t Logs\n\n";
						if (currentAccountIndex == 0 && logCheck == 0) {
							document.getElementById("loginCredentials").value = "\t\t\t\tUsed Account logs\n\n";
						}
					} else {
						document.getElementById("ReportLinks").value = "\t\t\t\t\t\tlogs\n\n";

					}
				}

				notValid = currentLinkIndex;
				notValid++;
				if (currentLinkIndex <= url_len - 1) {
					toastr.warning(" Link: " + notValid + " is not valid !!!");
					url_len++;
				}

				if (done != 0) {
					reportOnThis(globel_url[++currentLinkIndex]);
				} else {
					updateUrl(globel_url[++currentLinkIndex]);
				}

			}
		} //currentLinkIndex<url_len
		else if (currentLinkIndex > url_len - 1) {


			setTimeout(function () {

				if (v2 && currentAccountIndex >= ids_length - 1) {

					document.getElementById('status2').innerHTML = 'Completed ';
					document.getElementById('status2').style.color = 'green';

				} else {
					document.getElementById('status').innerHTML = 'Completed ';
					document.getElementById('status').style.color = 'green';
				}

				if (loadlinks == 1) {

					if (url_len <= 5 && blocked >= 3) {

						toastr.info("Ask admin to update server links");

					} else if (blocked >= 5) {

						updateServer();

					}

				}


				toastr.success(done + " Account(s) Reported Successfully ");

				if (currentAccountIndex < ids_length - 1) {
					console.log("currentAccountIndex<ids_length");
					console.log(currentAccountIndex + ":" + ids_length);

					if (!dividingAlgorithm) {

						currentLinkIndex = 0;
						url_len = global_url_len;

					}

					link = 0;
					done = 0;
					count = 0

					//terms
					if (currentAccountIndex % 2 == 0 || currentAccountIndex == 0) {
						chrome.tabs.sendMessage(tabId, { type: "term" }, function (term) {
							if (term) {
								if (term.farewell == "term-done") {
									console.log("terms accepted");
								}
							}
						});
					} // if currentAccountIndex%2

					currentAccountIndex++;
					if (currentAccountIndex == -1) {
						reportingAccount++;
					} else if (reportingAccount == 0) { reportingAccount++ };
					console.log(currentAccountIndex + " account used for reporting");
					document.getElementById("reportLinks2").value = "\t\t\t\t\t\t Logs\n\n";
					document.getElementById("loginCredentials").value += reportingAccount + " account used for reporting.\n";
					checkLoginPage();

				} else {
					document.getElementById("loginCredentials").value += reportingAccount + " account used for reporting.\n";
					chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
					chrome.browserAction.setBadgeText({ text: "Done" });
					stopReporter();
				}
			}, 3000);
			setTimeout(function () {
				chrome.browserAction.setBadgeText({
					'text': '' //an empty string displays nothing!
				});
			}, 5000);
		}
		/*
	else if (notValid>0){
		currentLinkIndex=0;
		done=0;
		toastr.error("All Reports were not Successfully Done !");
	}*/


	} // reportOnThis()

	function ResetAll() {


		currentLinkIndex = 0;
		link = 0;
		globel_url = 0;
		url_len = 0;
		done = 0;
		count = 0;
		loadlinks = 0;
		blocked = 0;
		newlinks = "";
		excludedIDs = "";
		ex_len = 0;
		loginAccounts = 0;
		ids_length = 0;
		v2 = 0;
		currentAccountIndex = 0;
		orignal_wait = 0;
		reportingAccount = 0;
		logCheck = 0;
		global_url_len = 0;
		temp_global_url_len = 0;
		temp_global_url_len = 0;
		dividingAlgorithm = 0;
		linksPerAccount = 0;
		return true;

	}

	function startFbAutoReporter(url, l) {
		ex = loadExcludeIDs();

		setTimeout(function () {

			globel_url = url;
			url_len = l;
			global_url_len = l;
			wait *= 1000;
			orignal_wait = wait + 1000;
			toastr.info("Setting Up the Reporter");

			estimate_time = 0;

			if (url_len < 20) {
				estimate_time = 0;
				estimate_time = estimate_time + 5 * url_len;

			} else if (url_len > 21 && url_len < 50) {
				estimate_time = 100;
				estimate_time = estimate_time + (5 * (url_len - 20));

			} else if (url_len >= 50 && url_len <= 100) {

				estimate_time = 250;
				estimate_time = estimate_time + (8 * (url_len - 50));

			} else if (url_len > 100 && url_len <= 180) {
				estimate_time = 550;
				estimate_time = estimate_time + (12 * (url_len - 100));
			} else if (url_len > 180 && url_len <= 250) {
				estimate_time = 1510;
				estimate_time = estimate_time + (15 * (url_len - 180));

			} else if (url_len > 250 && url_len > 300) {
				estimate_time = 2560;
				estimate_time = estimate_time + (20 * (url_len - 250));

			}


			var timer = (url_len / 10);
			estimate_time = timer * 60;

			if (v2) {

				document.getElementById('TotalLinks2').innerHTML = url_len;
				document.getElementById('TotalLinks2').style.color = '#634ef0';
				document.getElementById('status2').innerHTML = 'On';
				document.getElementById('status2').style.color = 'green';

			} else {

				document.getElementById('TotalLinks').innerHTML = url_len;
				document.getElementById('TotalLinks').style.color = '#634ef0';
				document.getElementById('status').innerHTML = 'On';
				document.getElementById('status').style.color = 'green';

			}
			document.getElementById("ReportLinks").value = "\t\t\t\t\t\tlogs\n\n";

		}, 2000);

		setTimeout(function () { reportOnThis(url[currentLinkIndex]); }, 3000);

	} // startFbAutoReporter(url,l)

	async function Reporter(ReportLinks, v2Accounts) {

		if (ReportLinks) {
			var Links = ReportLinks;

			if (v2) {

				if (maKwa.raka + ":" + maKwa.sahida == maKwa.ogora) {

					if (v2Accounts) {
						loginAccounts = v2Accounts.split("\n");
						//console.log ("Accounts: "+loginAccounts);
						// spliting the input from textarea into array w.r.t newline
						var reporting_link = Links.split("\n");
						// reporting_link is now containing the links as an array i.e [link1,link2,link3,link4,link5]
						check(reporting_link);
					} else {
						toastr.error("Please Provide Login Accounts");
					}
				} // ogora 
				else {
					toastr.warning(maKwa.nshta);
				}

			} else {

				// spliting the input from textarea into array w.r.t newline
				var reporting_link = Links.split("\n");
				// reporting_link is now containing the links as an array i.e [link1,link2,link3,link4,link5]
				check(reporting_link);
			}


		} else {
			ResetAll();


			var ch = document.getElementById("loginCredentials").value.split(",");
			if (ch.length > 1) {
				if (document.getElementById("reportLinks2").value == "")
					var card = document.querySelector('.card');
				card.classList.toggle('is-flipped');
			}

			toastr.error("Please Enter Report Links");

		}
	}


	function loadUrls(t) {
		loadlinks = 1;
		var client = new XMLHttpRequest();
		client.open('GET', 'https://hackology.co/PCD/ReportLinks.txt');
		client.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status === 200) {

					if (client.responseText = "") {
						document.getElementById("ReportLinks").value = "Sorry no Links were found :)";
						toastr.info("Contact PCD (Page) on Facebook");
					} else {
						if (t == 1) {
							document.getElementById("reportLinks2").value = client.responseText;
							document.getElementById("loadIds").style.display = "";

						} else { document.getElementById("ReportLinks").value = client.responseText; }

						toastr.success("Reporting Links Loaded");

					}
				} else if (this.status == 404) {
					toastr.error("Links Not Found");
					setTimeout(function () { toastr.info("contact me: fb.com/tigerzplace"); }, 1000);
				} else if (this.status == 403) {
					toastr.error("Forbidden Access..!!!");
					setTimeout(function () { toastr.info("contact me: fb.com/tigerzplace"); }, 1000);
				} else if (this.status == 400) {
					toastr.error("Forbidden..!!!");
					setTimeout(function () { toastr.info("contact me: fb.com/tigerzplace"); }, 1000);
				}

			}
			setTimeout(function () {
				if (document.getElementById("ReportLinks").value == "" && document.getElementById("reportLinks2").value == "") {

					toastr.error("Links couldn't be loaded");
					setTimeout(function () { toastr.info("contact me: fb.com/tigerzplace"); }, 1000);
				}

			}, 5000);

		}
		client.send();
	}


	function loadExcludeIDs() {


		var client = new XMLHttpRequest();
		client.open('GET', 'https://hackology.co/PCD/Excluded_IDs.txt');
		client.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status === 200) {
					if (client.responseText = "") {

						toastr.info("IDs Not Found (EX)");
					} else {
						toastr.success("IDs Loaded (EX)");

						excludedIDs = client.responseText.split("\n");
						ex_len = excludedIDs.length;


					}
				} else if (this.status === 404) {

					toastr.error("IDs File not Found (EX)");
				} else {

					toastr.error("Couldn't Fetch IDs (EX)");
				}
			} else {
				console.log("State not ready.");
			}


		}
		client.send();

	} //loadExcludeIDs


	function updateServer() {

		if (v2) {
			newlinks = document.getElementById("NewReportLinks2").value;
		} else {
			newlinks = document.getElementById("NewReportLinks").value;
		}

		if (validation(newlinks)) {
			var http = new XMLHttpRequest();
			var key = btoa(newlinks.split("\n").length);
			var url = 'https://hackology.co/PCD/update.php';
			var params = 'reportLinks=' + newlinks + '&data=' + key + '6117&key=' + key + '&update=';
			http.open('POST', url, true);

			//Send the proper header information along with the request
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			http.onreadystatechange = function () {//Call a function when the state changes.
				if (http.readyState == 4) {
					if (http.status == 200) {
						toastr.success("Server file is Update!!!");
						console.log("Server File Updated");

						if (v2) {
							document.getElementById("NewReportLinks2").value = "";
						} else {
							document.getElementById("NewReportLinks").value = "";
						}

					} else {
						toastr.error("Server file Error");
						console.log("Server File Updatation Failed!");
					}
				} // readyState
			}
			http.send(params);

		} // validation if
		else {
			toastr.error("No No No");
		}
		return;
	} // updateServer






	function loaded() {


		/*
			chrome.windows.getCurrent({"populate" : true}, function (){
				chrome.tabs.query( { 'active' : true, 'highlighted':true}, function (tab){ 
						 */
		if (karKom) {
			console.log = function () { };
		}

		chrome.windows.getLastFocused(null, function () {
			chrome.tabs.query({ 'active': true, 'highlighted': true }, function (tab) {

				//console.log("Open Facebook & Try Again!!")
				console.log(tab[0].url);
				var currentHost = getHostName(tab[0].url);

				if (hosts.includes(currentHost)) {
					tabId = tab[0].id;
					setEventListener();
					setEventListeners();
					flip();
					setTimeout(function () { toastr.info("Use English (US) Language !!!"); }, 1000);

					/*
					chrome.storage.local.get(['like'], function(result) {
						if (result.like!=undefined){
							if (result.like!=1){
							// Terms
								setTimeout(function(){Like(tab[0].id);},5000);
							}
						}
					}); */

				}// if facebook.com
				else {

					setTimeout(function () { toastr.error("Wrong Host Detected !!!"); }, 1000);
					setTimeout(function () { toastr.error("Open Facebook & Try Again"); }, 2000);
					setTimeout(function () { toastr.error("Terminating Reporter ...."); }, 4000);
					setTimeout(function () { window.close(); }, 6000);
				}
			}); //tab.query

		}); // chrome.windows
		document.getElementById("farVersion").innerText = "v" + manifestData.version;
	}// loaded

	window.onload = loaded;
