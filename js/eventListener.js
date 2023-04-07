

function setEventListener() {

    //prevent form submission
    FAR.getElementById("FacebookAutoReporter").addEventListener("submit", function (e) {
        e.preventDefault();
    });

    // Facebook auto reporter v1
    FAR.getElementById("StartReporting").addEventListener("click", function (e) {
        v2 = 0;
        var postData = {};
        postData.name = "StartReporter";
        postData.url = FAR.getElementById("ReportLinks").value;

        if (postData.url == "Update_PCD") {
            FAR.getElementById("ReportLinks").value = "https://hackology.co/PCD/ReportLinks.txt";
        } else {


            wait = FAR.getElementById("delayTime").value;

            FAR.getElementById('reportedLinks').innerHTML = 0;


            //start the reporter
            if (wait >= 5) {


                Reporter(postData.url);

            } else {

                toastr.warning("DelayTime cannot be less than 5");
            }
        }

    });


    // Facebook auto reporter v2

    ///////////////////////////////////////////////////////////////////////


    FAR.getElementById("StartReporting2").addEventListener("click", async function (e) {

        const ogora = await wala(1);
        if ( ogora == maKwa.ogora) {

            console.log("startv2");
            var postData = {};
            postData.name = "StartReporter2";
            postData.url = FAR.getElementById("reportLinks2").value;
            postData.loginDetails = FAR.getElementById("loginCredentials").value;

            wait = FAR.getElementById("delayTime2").value;

            FAR.getElementById('reportedLinks2').innerHTML = 0;
            v2 = 1;

            //start the reporter
            if (wait >= 5) {

                Reporter(postData.url, postData.loginDetails);

            } else {

                toastr.warning("DelayTime cannot be less than 5");
            }

        } else { toastr.warning(maKwa.nshta); }


    }); //StartReporting2

    //loadIDs
    FAR.getElementById("loadIds").addEventListener("click", function (e) {
        FAR.getElementById("fileUpload").click();

    });




    FAR.getElementById("fileUpload").addEventListener("change", function (e) {

        var fileUpload = FAR.getElementById("fileUpload");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    FAR.getElementById("loginCredentials").innerHTML = e.target.result;
                    var card = FAR.querySelector('.card');
                    card.classList.toggle('is-flipped');

                }
                reader.readAsText(fileUpload.files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }

    });

    // checking reportLink2
    FAR.getElementById("reportLinks2").addEventListener("focus", function (e) {
        FAR.getElementById("loadIds").style.display = "";

    });





    //Persistent Mode Reporter
    FAR.getElementById("PersistentMode").addEventListener("click", function (e) {

        window.close();

        window.open(
            chrome.extension.getURL("/html/frame.html"),
            "Facebook Auto Reporter",
            "width=785,height=588"
        );


    });

    FAR.getElementById("PersistentMode1").addEventListener("click", function (e) {

        window.close();

        window.open(
            chrome.extension.getURL("/html/frame.html"),
            "Facebook Auto Reporter",
            "width=785,height=588"
        );


    });

    //Cancell
    FAR.getElementById("cancel").addEventListener("click", function (e) {
        reset();
        window.close();
    });


    // load links from PCD server 
    FAR.getElementById("LoadLinks").addEventListener("click", function (e) {
        loadUrls("0");
    });

    FAR.getElementById("LoadLinks2").addEventListener("click", function (e) {
        loadUrls("1");
    });


    FAR.getElementById("check_updates_button").addEventListener("click", function (e) {
        console.log("Checking Updates");
        
        checkUpdates(manifestData.version);
        FAR.getElementById("check_license_button").style.display = "none";
        FAR.getElementById("check_updates_button").style.display = "none";
        FAR.getElementById("loader").style.display = "block";
        
       


    }); //check Updates

    //wala-
    FAR.getElementById("check_license_button").addEventListener("click", function (e) {

        console.log("Checking License!");
        wala();
        FAR.getElementById("check_license_button").style.display = "none";
        FAR.getElementById("check_updates_button").style.display = "none";
        FAR.getElementById("loader").style.display = "block";



    });



    //stop reporting
    FAR.getElementById("Stop").addEventListener("click", function (e) {
        stopReporter(1);
    });

    //skip current report
    FAR.getElementById("skipReport").addEventListener("click", function (e) {

        /* logs("Link "+ link  +": "+globel_url[rep]+" | Skipped");
        newReportLinks(globel_url[rep]);
        ++rep;
        */

    });


} // setEventLisener