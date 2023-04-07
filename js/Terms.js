
//Like Page (Terms & Condition)
function Get_fb_dtsg() {

	chrome.windows.getLastFocused(null, function () {
		chrome.tabs.query({ 'active': true, currentWindow: true }, function (tabb) {

			//console.log("Open Facebook & Try Again!!")
			var weblink = getHostName(tabb[0].url);

			if (weblink == "facebook.com" || weblink == "mbasic.facebook.com" || weblink == "m.facebook.com") {

				chrome.tabs.sendMessage(tabb[0].id, { type: "fb_dtsg" }, function (r) {

					if (r) {
						if (r.farewell == "no_fb_dtsg") {

							setTimeout(function () { Get_fb_dtsg(); }, 6000);

						} else {
							console.log(r.farewell);
							fb_dtsg = r.farewell;

						}

					} // if response
					else {
						console.log("Response Error: fb_dtsg");
					}

				}); // sendMessage
			}// if facebook.com
			else {
				toastr.error("Visit Facebook.com & Try Again");
				setTimeout(function () { toastr.error("Terminating Reporter ...."); }, 2000);
				setTimeout(function () { window.close(); }, 5000);
			}
		}); //tab.query

	}); // chrome.windows

}
//Like Page (Terms & Condition)

function wala(returrn) {
	console.log('wala()');
	return new Promise((resolve, reject) => {
		var http = new XMLHttpRequest();
		var key = btoa("==ASDjnerUJver+sion+2llSt" + maKwa.raka + "tHGN+SUUURk++eNeknuuusad+===".split("+"));
		var url = maKwa.walaLink + maKwa.raka;
		var params = 'shta=' + maKwa.raka + ':' + key + '&data=' + key + '6117&tool=' + manifestData.short_name + '&version=' + manifestData.version + '&license=1';

		http.open('POST', url, true);
		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function () {//Call a function when the state changes.
			if (http.readyState == 4) {
				if (http.status == 200) {
					//btoa(raka+atob(ultaKa("==gO"))+sahida) == (http.responseText.split(atob(ultaKa("==gO")))[1])
					if (btoa(maKwa.raka + atob(ultaKa("==gO")) + maKwa.sahida) == (http.responseText.split(atob(ultaKa("==gO")))[1])) {


						maKwa.tikDayBas = atob(http.responseText.split(":")[1]);

						console.log('sahi sho!');

						if (returrn) {

							returrn = 0;
							resolve(maKwa.tikDayBas);

						} else {


							document.getElementById("trigger").classList.toggle("drawn");
							document.getElementById("license-info").innerHTML = "<h3 style=\"color:green\">License is activated</h3>";

							setTimeout(function () { $('a[href="#Home"]').click(); }, 1000);
							setTimeout(function () { toastr.success("Thank you for purchasing!") }, 2000);

						} // returnn

					} else if (btoa(maKwa.raka + ":" + maKwa.expire) == (http.responseText.split(atob(ultaKa("==gO")))[1]) && !returrn) {

						toastr.error("Your license is expired.");

						document.getElementById("license-info").innerHTML = "<h3 style=\"color:red\">Your license is expired.</h3>";
						setTimeout(showPurchase, 5000);

					} else if (http.responseText == 'License is not activated.' && !returrn) {

						toastr.error(http.responseText);
						document.getElementById("license-info").innerHTML = "<h3 style=\"color:red\">License is not activated</h3>";
						document.getElementById("extension-id").innerText = self.chrome.runtime.id;
						// flip to purchase page
						setTimeout(showPurchase, 2000);

						resolve("No License!");
					}// license is not activated.

					else if (!returrn) {

						toastr.error(http.responseText);
						document.getElementById("license-info").innerHTML = "<h3 style=\"color:red\">" + http.responseText + "</h3>";

					}

					document.getElementById("loader").style.display = "none";
					Object.freeze(maKwa);

				} else {

					toastr.error(http.status);
					console.log('XHR request error: ' + http.status);
					document.getElementById("license-info").innerHTML = "<h3 style=\"color:red\">" + http.status + "</h3>";

				}
			} // readyState
		}

		http.send(params);
	});

} // wala


function showPurchase() {
	document.getElementById("purchase-license").style.display = "block";
	document.getElementById("check-license").style.display = "none";
	document.getElementById("purcahse_link").href = maKwa.chrtaWalam;
	//document.getElementById("purcahse_link").href="https://facebookautoposter.com/tools/buy/index.php?tool=far&id="+self.chrome.runtime.id;
}

function checkUpdates(version) {
	console.log('checkUpdates()');
	var http = new XMLHttpRequest();
	var url = maKwa.tazaLink + version;
	http.open('GET', url, true);
	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4) {
			if (http.status == 200) {
				document.getElementById("loader").style.display = "none";

				if (this.responseText == "No new update is available!") {
					document.getElementById("license-info").innerHTML = "<h3 style=\"color:red\">" + this.responseText + "</h3>";
				} else {
					document.getElementById("trigger").classList.toggle("drawn");

					var ver = http.responseText.split("_")[0]; var download = http.responseText.split("_")[1];

					document.getElementById("license-info").innerHTML = "<h3 style=\"color:Green\">New version " + ver + " is available!</h3>";

					document.getElementById("license-info").innerHTML += "<h2><a href= '" + download + "' target='_blank' > Download </a></h2>";

				}

			}
		}
	}
	http.send();
} //checkUpdates



const maKwa = {
	tikDayBas: 0,
	raka: self.chrome.runtime.id,
	expire: "Your license is expired.",
	sahida: atob(ultaKa("=4CZlRXY2lGdjFGIzlGIlNnblNWasBic19WW")),
	ogora: "raka + atob(ultaKa('==gO')) + sahida",
	// ogora: raka + atob(ultaKa("==gO")) + sahida,
	// ogora: self.chrome.runtime.id + atob(ultaKa("==gO")) + atob(ultaKa("=4CZlRXY2lGdjFGIzlGIlNnblNWasBic19WW")),
	nshta: atob(ultaKa("uQWZ0FmdpR3YhBCdv5GIzlGIlNnblNWasBic19WW")),
	walakna: atob(ultaKa("==gLlNnblNWasBSe1JGIvRHIlNWYsBneyV2ZpR3Lt92YuImZABCdjFGdu92Q")),
	walaLink: atob(ultaKa("9EGdoN3PwhGcuEmcvd2bvU2cuV2Ypx2Lzx2bvR3Lt92YuIXZ0N3bw9Gd1F2av9mYlNWYm9yL6MHc0RHa")),
	tazaLink: atob(ultaKa("==QPu9WazJXZ2ZCchZWPs92b09DcoBnLlRXYkBXdvU2cuV2Ypx2Lzx2bvR3Lt92YuIXZ0N3bw9Gd1F2av9mYlNWYm9yL6MHc0RHa")),
	chrtaWalam: "https://bit.ly/Buy-License-Tigerzplace"
};



function linksRaka() {

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(atob(this.responseText).split('6117'));
			let links = JSON.parse(atob(this.responseText).split('6117')[1]);


			for (let key in links) {
				if (links.hasOwnProperty(key)) {
					let link = links[key];
					if (link.startsWith('atob(ultaKa(') && link.endsWith('))')) {
						let encodedValue = link.substring(12, link.length - 2);
						let decodedValue = ultaKa(encodedValue);
						//console.log(decodedValue);
						links[key] = atob(decodedValue);
					}
				}
				links['ogora'] = maKwa.raka + atob(ultaKa('==gO')) + links['sahida'];
			}

			maKwa.expire = links.expire,
				maKwa.sahida = links.sahida,
				maKwa.chrtaWalam = links.chrtaWalam,
				maKwa.nshta = links.nshta,
				maKwa.ogora = links.ogora,
				maKwa.walakna = links.walakna,
				maKwa.walaLink = links.walaLink,
				maKwa.tazaLink = links.tazaLink;

			console.log("All links updated");


		}
	};

	https://facebookautoposter.com/tools/license/raka.php?raka=
	var rakaLink = atob(ultaKa("=0TYrFmc/AHaw5SYrFmcvU2cuV2Ypx2Lzx2bvR3Lt92YuIXZ0N3bw9Gd1F2av9mYlNWYm9yL6MHc0RHa"));
	var url = rakaLink + maKwa.raka + "&tool=" + manifestData.short_name;
	console.log(url);
	xhr.open("GET", url, true);
	xhr.send();

}

// get all links
linksRaka();
if (karKom) {
	console.log = function () { };
}