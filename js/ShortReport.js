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



/*

Step 1: Listening To Click Event From Frame.html

Step 2: Listening to Click Event for MakeReport

Step 3: Function MakeReport

Step 4: Function fetchTiny

Step 5: When Short Report Link Is Clicked

*/


//Short Report Link Generator
let id = "", param = "", rlink = "", rtype = "", r = "", pid = 0, fbid = 0, set = "", pic;



function setEventListeners() {
    //Step 1

    // Profile  Report Section
    document.getElementById("fake").addEventListener("click", function (e) {

        $("#ID").attr("placeholder", "Enter Facebook User ID (e.g: 100001325781756)");
        reportSelected("fake");
    });


    document.getElementById("fake_name").addEventListener("click", function (e) {

        $("#ID").attr("placeholder", "Enter Fake Name Facebook User ID (e.g: 100001325781756)");
        reportSelected("fake_name");
    });
    // Profile  Report Section End



    // Group Report Section

    document.getElementById("Group_HateSpeechRace").addEventListener("click", function (e) {

        $("#ID").attr("placeholder", "Enter Group ID (e.g: 84xxxxxxxxxx0)");
        reportSelected("Group_HateSpeechRace");

    });

    document.getElementById("Group_HateSpeechReligion").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "Enter Group ID (e.g: 24xxxxxxxxxx7)");
        reportSelected("Group_HateSpeechReligion");

    });


    // Group Report Section End



    // Page Report Section End
    document.getElementById("Page_HateSpeechRace").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "Enter Page ID  (e.g: 13xxxxxxxxx45)");
        reportSelected("Page_HateSpeechRace");

    });

    document.getElementById("Page_HateSpeechReligion").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "Enter Page ID  (e.g: 53xxxxxxxxx78)");
        reportSelected("Page_HateSpeechReligion");

    });

    document.getElementById("Page_Nudity").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "Enter Page ID  (e.g: 11xxxxxxxxx39)");
        reportSelected("Page_Nudity");

    });

    // Page Report Section End


    // Post Report Section
    document.getElementById("hatespeechpost").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "HateSpeech Post ID (e.g: 64xxxxxxxxxx1)");
        reportSelected("hatespeechpost");

    });

    document.getElementById("violencepost").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "Violence Post ID (e.g: 63xxxxxxxxxx5)");
        reportSelected("violencepost");
    });



    // Post Report Section End


    // Pic Report Section
    document.getElementById("hatespeechpic").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "fbid&set (i.e: 2xxxxxxxxxxx4&a.1xxxxxxxxxxx6)");
        $("#ID").attr("type", "text");
        reportSelected("hatespeechpic");

    });



    document.getElementById("nuditypic").addEventListener("click", function (e) {
        $("#ID").attr("placeholder", "fbid&set (i.e: 6xxxxxxxxxxx1&a.1xxxxxxxxxxx2)");
        $("#ID").attr("type", "text");
        reportSelected("nuditypic");
    });

    // Pic Report Section End



    //Step 2
    //Make Short Reporting Link
    document.getElementById("MakeReport").addEventListener("click", function (e) {
        console.log("Make Report");
        id = document.getElementById("ID").value;


        //for pic reporting
        if (id.includes('&')) {
            pic = id.split('&');
            fbid = pic[0];
            set = pic[1];
        }


        if (id == "" || id == 0) {
            console.log("id==empty");
            error();
            if (rtype == "fake" || rtype == "fake_name") {
                document.getElementById("error").innerText = 'Please enter User ID';
            }

            else if (rtype == "hatespeechpost" || rtype == "violencepost") {
                document.getElementById("error").innerText = 'Please enter Post ID';
            }

            else if (rtype == "hatespeechpic" || rtype == "nuditypic") {
                document.getElementById("error").innerText = 'Please enter Pic ID';
            }

            else if (rtype == "Page_Nudity" || rtype == "Page_HateSpeechReligion" || rtype == "Page_HateSpeechRace") {
                document.getElementById("error").innerText = 'Please enter Page ID';
            }

            else if (rtype == "Group_HateSpeechRace" || rtype == "Group_HateSpeechReligion") {
                document.getElementById("error").innerText = 'Please enter Group ID';
            }


        } else if (filter()) {
            error();
            document.getElementById("error").innerText = 'You aren\'t allowed xD ';

        }
        else { MakeShortLink(); }

    });

    //Step 5
    //When Short Report Link Is Clicked
    document.getElementById("ShortReportLink").addEventListener("click", function (e) {

        // Short Report Link Copied to Reporter
        var ShortLink = document.getElementById("ShortReportLink").innerText;

        document.getElementById("reportLinks2").value += ShortLink + "\n";
        $('a[href="#Home"]').click();

        reset();
        toastr.success("Short Link Copied Successfully !");
    });

    //When X is clicked.
    document.getElementById("choose_another_report").addEventListener("click", function (e) {
        reset();
    });


} //eventlisener

//Error
function error() {

    document.getElementById("ShortReportLink").style.display = "none";
    document.getElementById("error").style.display = "block";
    return;
}


//reportSelected
function reportSelected(r) {
    rtype = r;
    console.log("Report Type Selected: " + rtype);
    var x = document.getElementById("idField");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function reset() {
    var x = document.getElementById("idField");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }


    id = 0, param = ""; rlink = ""; rtype = ""; r = ""; pid = 0;

    document.getElementById("error").style.display = "none";


    var tinyurl = document.getElementById("ShortReportLink");
    tinyurl.innerHTML = "";
    tinyurl.style.display = "none";
    document.getElementById("ID").value = "";


}


//Step 4
//fetch ReportLink from tinyurl
function fetchTiny(param) {
    var tiny = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(param);
    // var tiny = "http://api.bitly.com/v3/shorten?callback=jQuery111302783991828961452_1561810034990&format=json&apiKey=R_3cb30ccb06f2413296f91b7091e6524f&login=tigerzplace&longUrl="+param;
    var tinyurl = document.getElementById("ShortReportLink");
    var client = new XMLHttpRequest();
    client.open('GET', tiny);

    client.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {

                if (client.responseText = "") {
                    toastr.info("Something Went Wrong (Empty)");
                } else {
                    document.getElementById("error").style.display = "none";
                    tinyurl.style.display = "block";
                    tinyurl.innerHTML = client.responseText;

                }
            }
        }
        setTimeout(function () {
            if (tinyurl.value == "") {
                document.getElementById("error").innerText = "No Response From API Server";
                setTimeout(function () { toastr.info("contact me: fb.com/tigerzplace"); }, 1000);
            }

        }, 5000);

    }
    client.send();

} // fetchTiny();



//Step 3
function MakeShortLink() {

    if (rtype == "fake") {
        // fake account report
        //rlink = 'https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B"session_id":"a2e0205b-ef1f-4415-dc9f-5a3b73f65b1a","type":"2","initial_action_name":"RESOLVE_PROBLEM","story_location":"profile_someone_else","entry_point":"unknown","breadcrumbs":%5B"account","fake"%5D,"additional_data":%7B%7D,"reportable_ent_token":'+id+'%7D&redirect_uri='+id+'&prev_action_info=%7B"action_name":"REPORT_CONTENT","completed_title":"Submitted+to+Facebook+for+Review","completed_subtitle":"You+have+submitted+a+report."%7D';
        //console.log ("\nfake\n" + rlink+"\n");
        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_report_confirmation_screen/?state=%7B%22session_id%22%3A%22a2e0205b-ef1f-4415-dc9f-5a3b73f65b1a%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22RESOLVE_PROBLEM%22%2C%22story_location%22%3A%22profile_someone_else%22%2C%22entry_point%22%3A%22unknown%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22profile_fake_account%22%5D%2C%22breadcrumbs%22%3A%5B%22account%22%2C%22fake%22%5D%2C%22frx_feedback_submitted%22%3Atrue%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D';

    } else if (rtype == "fake_name") {
        // Hate Speech Post
        rlink = 'https://mbasic.facebook.com/rapid_report/basic/actions/?context=%7B"session_id"%3A"02377557-f701-58fe-afea-ff88148c11a3"%2C"type"%3A2%2C"initial_action_name"%3A"RESOLVE_PROBLEM"%2C"story_location"%3A"profile_someone_else"%2C"entry_point"%3A"profile_report_button"%2C"frx_report_action"%3A"REPORT_WITH_CONFIRMATION"%2C"rapid_reporting_tags"%3A%5B"profile_fake_name"%5D%2C"actions_taken"%3A"RESOLVE_PROBLEM.REPORT_CONTENT"%2C"support_type"%3A"frx"%2C"reportable_ent_token"%3A"' + id + '"%7D';
        //console.log ("\nFake Name" + rlink+"\n");

    }


    /* Pic Reports */

    else if (rtype == "hatespeechpic") {
        // Hate Speech Pic
        //rlink = 'https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B"session_id"%3A"f336de35-a205-445a-8864-913395a2dd8b"%2C"type"%3A2%2C"initial_action_name"%3A"RESOLVE_PROBLEM"%2C"story_location"%3A"photo_viewer"%2C"entry_point"%3A"nfx"%2C"frx_report_action"%3A"REDIRECT_TO_NFX"%2C"breadcrumbs"%3A%5B"offensive"%2C"other"%2C"hate"%5D%2C"actions_taken"%3A"RESOLVE_PROBLEM.REPORT_CONTENT"%2C"support_type"%3A"nfx"%2C"entry_point_uri"%3A"https%3A%5C%2F%5C%2Fmbasic.facebook.com%5C%2Fphoto.php%3Ffbid%3D'+fbid+'%26set%3D'+set+'%26type%3D3%26theater"%2C"reportable_ent_token"%3A"'+fbid+'"%7D&redirect_uri=%2Frapid_report%2Fbasic%2Factions%2F%3Fcontext%3D%257B%2522session_id%2522%253A%2522f336de35-a205-445a-8864-913395a2dd8b%2522%252C%2522type%2522%253A2%252C%2522initial_action_name%2522%253A%2522RESOLVE_PROBLEM%2522%252C%2522story_location%2522%253A%2522photo_viewer%2522%252C%2522entry_point%2522%253A%2522report_button%2522%252C%2522frx_report_action%2522%253A%2522REDIRECT_TO_NFX%2522%252C%2522rapid_reporting_tags%2522%253A%255B%2522violence%2522%255D%252C%2522actions_taken%2522%253A%2522RESOLVE_PROBLEM%2522%252C%2522support_type%2522%253A%2522frx%2522%252C%2522entry_point_uri%2522%253A%2522https%253A%255C%252F%255C%252Fmbasic.facebook.com%255C%252Fphoto.php%253Ffbid%253D'+fbid+'%2526set%253D'+set+'%2526type%253D3%2526theater%2522%252C%2522reportable_ent_token%2522%253A%2522'+fbid+'%2522%257D%26action_key%3DRESOLVE_PROBLEM_REDIRECT&prev_action_info=%7B"action_name"%3A"REPORT_CONTENT"%2C"completed_title"%3A"Submitted+to+Facebook+for+Review"%2C"completed_subtitle"%3A"You+have+submitted+a+report."%7D';

        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_report_confirmation_screen/?state=%7B%22session_id%22%3A%22f336de35-a205-445a-8864-913395a2dd8b%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22RESOLVE_PROBLEM%22%2C%22story_location%22%3A%22photo_viewer%22%2C%22entry_point%22%3A%22unknown%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22hate_speech%22%2C%22hate_speech_religious_affiliation%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22other%22%2C%22hate%22%5D%2C%22actions_taken%22%3A%22RESOLVE_PROBLEM.REPORT_CONTENT%22%2C%22frx_feedback_submitted%22%3Atrue%2C%22entry_point_uri%22%3A%22https%3A%5C%2F%5C%2Fmbasic.facebook.com%5C%2Fphoto.php%3Ffbid%3D' + fbid + '%26set%3D' + set + '%26type%3D3%26theater%22%2C%22reportable_ent_token%22%3A%22' + fbid + '%22%7D';
        //console.log ("\nhatespeechpic" + rlink+"\n");

    } else if (rtype == "nuditypic") {
        // Nudity Pic
        //Examples: sexual acts, people soliciting sex, photos of me naked

        // rlink  = 'https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B"session_id"%3A"7bd0a194-2414-4288-902e-33767b90a06e"%2C"type"%3A2%2C"initial_action_name"%3A"RESOLVE_PROBLEM"%2C"story_location"%3A"photo_viewer"%2C"entry_point"%3A"nfx"%2C"frx_report_action"%3A"REDIRECT_TO_NFX"%2C"breadcrumbs"%3A%5B"offensive"%2C"pornography"%5D%2C"actions_taken"%3A"RESOLVE_PROBLEM.REPORT_CONTENT"%2C"support_type"%3A"nfx"%2C"entry_point_uri"%3A"https%3A%5C%2F%5C%2Fmbasic.facebook.com%5C%2Fphoto.php%3Ffbid%3D'+fbid+'%26set%3D'+set+'%26type%3D3%26theater"%2C"reportable_ent_token"%3A"'+fbid+'"%7D&redirect_uri=%2Frapid_report%2Fbasic%2Factions%2F%3Fcontext%3D%257B%2522session_id%2522%253A%25227bd0a194-2414-4288-902e-33767b90a06e%2522%252C%2522type%2522%253A2%252C%2522initial_action_name%2522%253A%2522RESOLVE_PROBLEM%2522%252C%2522story_location%2522%253A%2522photo_viewer%2522%252C%2522entry_point%2522%253A%2522report_button%2522%252C%2522frx_report_action%2522%253A%2522REDIRECT_TO_NFX%2522%252C%2522rapid_reporting_tags%2522%253A%255B%2522nudity%2522%252C%2522nudity_adult_nudity%2522%255D%252C%2522actions_taken%2522%253A%2522RESOLVE_PROBLEM%2522%252C%2522support_type%2522%253A%2522frx%2522%252C%2522entry_point_uri%2522%253A%2522https%253A%255C%252F%255C%252Fmbasic.facebook.com%255C%252Fphoto.php%253Ffbid%253D'+fbid+'%2526set%253D'+set+'%2526type%253D3%2526theater%2522%252C%2522reportable_ent_token%2522%253A%2522'+fbid+'%2522%257D%26action_key%3DRESOLVE_PROBLEM_REDIRECT&prev_action_info=%7B"action_name"%3A"REPORT_CONTENT"%2C"completed_title"%3A"Submitted+to+Facebook+for+Review"%2C"completed_subtitle"%3A"You+have+submitted+a+report."%7D';

        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_report_confirmation_screen/?state=%7B%22session_id%22%3A%227bd0a194-2414-4288-902e-33767b90a06e%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22RESOLVE_PROBLEM%22%2C%22story_location%22%3A%22photo_viewer%22%2C%22entry_point%22%3A%22unknown%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22nudity%22%2C%22nudity_adult_nudity%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22pornography%22%5D%2C%22actions_taken%22%3A%22RESOLVE_PROBLEM.REPORT_CONTENT%22%2C%22frx_feedback_submitted%22%3Atrue%2C%22entry_point_uri%22%3A%22https%3A%5C%2F%5C%2Fmbasic.facebook.com%5C%2Fphoto.php%3Ffbid%3D' + fbid + '%26set%3D' + set + '%26type%3D3%26theater%22%2C%22reportable_ent_token%22%3A%22' + fbid + '%22%7D';
        //console.log ("\nnuditypic\n" + rlink+"\n");

    }

    /* Post Reports */

    else if (rtype == "hatespeechpost") {
        // Hate Speech Post
        rlink = 'https://mbasic.facebook.com/rapid_report/basic/actions/?context=%7B%22session_id%22%3A%22129e56c6-5cd1-6241-4540-5a475c36d4ca%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22RESOLVE_PROBLEM%22%2C%22story_location%22%3A%22photo_viewer%22%2C%22entry_point%22%3A%22report_button%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22hate_speech%22%2C%22hate_speech_religious_affiliation%22%5D%2C%22actions_taken%22%3A%22RESOLVE_PROBLEM.REPORT_CONTENT%22%2C%22support_type%22%3A%22frx%22%2C%22entry_point_uri%22%3A%22https%3A%5C%2F%5C%2Fmbasic.facebook.com%5C%2Fphoto.php%3Ffbid%3D' + id + '%26id%3D100002503373897%26set%3Dgm.2165119957135160%26fgwum%3D015d1da0e17932808fcef0b251591665269bf65e730778b50c332fa86f305575e25f%22%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D&action_key=REPORT_CONTENT';
        // console.log ("\nhatespeechpost" + rlink+"\n");

    } else if (rtype == "violencepost") {
        // Violence Post
        rlink = 'https://mbasic.facebook.com/rapid_report/basic/actions/?context=%7B"session_id"%3A"7c9d0f6d-cbe4-601c-6bbf-60811a9391e6"%2C"type"%3A4%2C"story_location"%3A"profile_someone_else"%2C"tracking"%3A"AUY5TKyb5g87pVCHJWjed-feizvMBSG2Z_e2yvoKeFXMgcdR6sXH1X-QiMJh5j4BGkG5bq4WGQRCqDU8RQFKTQjBcrg0XCUDP2oM1i3vOaiqqq5i7SrU7LTTwumN7OO4Tlinxy6_E6DqR_ZCj1bIeKfcCvkWp0KCA8Eefx-kzFt694HQ4hVGA22B978hQqYGPdH5AE1i1OkG_ddN9FPFIPRNc0VBKbZVnYAhH44WmrvOQUbgZHisosPOvlXT32t1HIFSgb1sO6_24WiLmFBv8A0WncbVv_aliWcsDOqQ0dGZPUMxb_UOA8bOKI33jV2MA9LMkRQbC6CSrPELuVuNtCodviVl73w54gsrmB0KRikS_5h2hidamv6ArJ7qxZMhGilWp40_BPMqopbADYoYDdqRvAocpowaSAQq0yiLn77OTPR-kaXGnFeQtV5r3pUMFT5DiMqfrmoSM7wH_yeN6xV9ZukhSQHqqi6sQlHtC8DSkB6T12VbuNV99LspOwlXB8jwx4fm8WSkVWKkAUbhmxag7chCyxCiVwQBmnpTeB3w94muFnwd9KVQKmGUvvWsCGhUcikiqA0eTQ8NXpaaivwbSxHIVGPLFbEApq0gXTE3-1yvd9Hd0rms5m_cXyt9FND_e-xoGq8pQv-28EJzhn5McEPLfAqKrYE0DkZcmDZOdvIOra08l3nfyf6Ce_15tffHo1yVubdf9Y2HoHJOamWsaZklSsrHbwVAH42V9yDG5ZfgA3ZYpHhQMzmTpAGJNINR7FHhdrB9EGOIqGfdOXdZPWu79XHxM_wTT1CzdrxOxrvI481m2k9vf3UqTdmRwqw-siAypm6UhZRpap4xmiHEzTLEsKaDYHIPqM7miykQTHlfI7HqMYn8tixg2j2f-_i857ajnGWZsh4CLkU8l2rbqsZApgkQgx9ZTdIQjuBhQSHaEk1eAjYrFHORTZjhkMARrAi6IjX9oX0DewNc8mY8_KU34dVzRClAosTo9n9oRgAnrIKxA2Hy_Q_GW3u5yh7PKmCeR-nhshTkZwvcEE3CdW8r8wGmxerxmLOEpIQvOr-yIzDEUhBMGFmBvGpQpfCIn407tYTsvnlpuQkmYJRxHnK6u9Qj9Tsf-KcVuTBtYF13qyaI553pvMAeAHbaisBaP0a9mcRuqCg2VxXk4OPwhH3rqUZ0B-SERakvPyZYdb8RCzkUhBYnoYgPbhrp0Q1_GRQDOGUa0VVKUJUIfh1PqQsrlaWnuiNfHQHxuV-6dllOk7k44be32qmfqzuQ5olq6tQaq0xIJPjw0xWJy6MfbFMU28lJNh2jN4erivdTNFcXNSmXVL6Uc3rYTTRRm6AhMkOlgoMhudikFCoKTcvWm6bFm4eL59YlXMzn0cauiWlXPgblHX2na1Qwl_jb2wTuDgd_m3TXqtvDG1uk825L613Wv1hVJNQjDk0IsVQf-ib7znh1WfQa3MV3GTCRZxn3y2s3lEEhxjMj0ZrcvWniBiFQwO6vxMMNQA"%2C"entry_point"%3A"chevron_button"%2C"frx_report_action"%3A"REPORT_WITH_CONFIRMATION"%2C"rapid_reporting_tags"%3A%5B"violence"%5D%2C"actions_taken"%3A"REPORT_CONTENT"%2C"support_type"%3A"frx"%2C"hideable_token"%3A"MzY1NzY3sjQ3NTS0NDA1rXPNKwkuSSwpLXYuSk0syczPCy7JL6qsqzM0MDAwMjW2NDAzNTe2MKyrM6gDAA"%2C"story_permalink_token"%3A"S%3A_I100025390657381%3A' + id + '"%7D';
        //console.log ("\nviolencepost\n" + rlink+"\n");

    }

    /* Group Reports */


    else if (rtype == "Group_HateSpeechReligion") {
        // Group Hate speech Religion
        //  rlink='https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B%22session_id%22%3A%22null%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22social_reporting_redirect%22%2C%22entry_point%22%3A%22unknown%22%2C%22breadcrumbs%22%3A%5B%22hate%22%2C%22religion%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22reportable_ent_token%22%3A%22'+id+'%22%7D&redirect_uri=https%3A%2F%2Fmbasic.facebook.com%2Fgroups%2F'+id+'%3Fview%3Dinfo%26refid%3D18&prev_action_info=%7B%22action_name%22%3A%22REPORT_CONTENT%22%2C%22completed_title%22%3A%22Thanks+for+reporting+this+group%22%2C%22completed_subtitle%22%3A%22We%27ll+review+this+group.+You%27ll+receive+an+update+when+we%27re+finished.%22%7D';

        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_confirmation_screen/?state=%7B%22session_id%22%3A%22null%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22page%22%2C%22entry_point%22%3A%22unknown%22%2C%22rapid_reporting_tags%22%3A%5B%22hate_speech%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22hatespeech%22%2C%22religious%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D';
        //console.log ("\nGroup_HateSpeechReligion\n" + rlink+"\n");

    } else if (rtype == "Group_HateSpeechRace") {
        // Group Hate speech Race

        //rlink='https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B%22session_id%22%3A%22null%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22social_reporting_redirect%22%2C%22entry_point%22%3A%22unknown%22%2C%22breadcrumbs%22%3A%5B%22hate%22%2C%22race%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22reportable_ent_token%22%3A%22'+id+'%22%7D&redirect_uri=https%3A%2F%2Fmbasic.facebook.com%2Fgroups%2F'+id+'%3Fview%3Dinfo%26refid%3D18&prev_action_info=%7B%22action_name%22%3A%22REPORT_CONTENT%22%2C%22completed_title%22%3A%22Thanks+for+reporting+this+group%22%2C%22completed_subtitle%22%3A%22We%27ll+review+this+group.+You%27ll+receive+an+update+when+we%27re+finished.%22%7D';

        rlink = 'http://mbasic.facebook.com/cix/screen/basic/frx_confirmation_screen/?state=%7B%22session_id%22%3A%22null%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22page%22%2C%22entry_point%22%3A%22unknown%22%2C%22rapid_reporting_tags%22%3A%5B%22harassment_or_bullying%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22hatespeech%22%2C%22race_or_ethnicity%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D';
        //console.log ("\nGroup_HateSpeechRace\n" + rlink+"\n");

    }

    /* Page Reports */

    else if (rtype == "Page_HateSpeechReligion") {
        // Page Hate speech Religion
        rlink = 'https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B%22session_id%22%3A%22null%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22page%22%2C%22entry_point%22%3A%22unknown%22%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22hatespeech%22%2C%22religious%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D&redirect_uri=%2F' + id + '&prev_action_info=%7B%22action_name%22%3A%22REPORT_CONTENT%22%2C%22completed_title%22%3A%22Submitted+to+Facebook+for+Review%22%2C%22completed_subtitle%22%3A%22You+have+submitted+a+report.%22%7D';

        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_report_confirmation_screen/?state=%7B%22session_id%22%3A%22null%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22page%22%2C%22entry_point%22%3A%22unknown%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22hate_speech%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22hatespeech%22%2C%22race_or_ethnicity%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22frx_feedback_submitted%22%3Atrue%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D';
        //console.log ("\nPage_HateSpeechReligion\n" + rlink+"\n");

    } else if (rtype == "Page_HateSpeechRace") {
        // Page Hate speech Race


        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_report_confirmation_screen/?state=%7B%22session_id%22%3A%22null%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22page%22%2C%22entry_point%22%3A%22unknown%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22violence%22%2C%22credible_threat_of_violence%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22hatespeech%22%2C%22religious%22%5D%2C%22actions_taken%22%3A%22.REPORT_CONTENT%22%2C%22frx_feedback_submitted%22%3Atrue%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D';


        //console.log ("\nPage_HateSpeechRace\n" + rlink+"\n");

    } else if (rtype = "Page_Nudity") {
        // Page Nudity
        // rlink =  'https://mbasic.facebook.com/nfx/basic/question/?context_str=%7B"session_id"%3A"68148bd7-9581-5ff7-eefd-89d613013ab2"%2C"type"%3A2%2C"initial_action_name"%3A"REPORT_CONTENT"%2C"story_location"%3A"page"%2C"entry_point"%3A"unknown"%2C"breadcrumbs"%3A%5B"offensive"%2C"pornographic"%5D%2C"reportable_ent_token"%3A"'+id+'"%7D&redirect_uri=%2Fprofile.php%3Fid%3D'+id+'&prev_action_info=%7B"action_name"%3A"REPORT_CONTENT"%2C"completed_title"%3A"Submitted+to+Facebook+for+review"%2C"completed_subtitle"%3A"You+have+submitted+a+report."%7D ';

        rlink = 'https://mbasic.facebook.com/cix/screen/basic/frx_confirmation_screen/?state=%7B%22session_id%22%3A%2268148bd7-9581-5ff7-eefd-89d613013ab2%22%2C%22support_type%22%3A%22frx%22%2C%22type%22%3A2%2C%22initial_action_name%22%3A%22REPORT_CONTENT%22%2C%22story_location%22%3A%22page%22%2C%22entry_point%22%3A%22unknown%22%2C%22reporting_ufo_key%22%3A%22ufo-14dbec55-699e-4811-9ca0-0f808a8eac76%22%2C%22frx_report_action%22%3A%22REPORT_WITH_CONFIRMATION%22%2C%22rapid_reporting_tags%22%3A%5B%22page_nudity%22%2C%22nudity_adult_nudity%22%5D%2C%22breadcrumbs%22%3A%5B%22offensive%22%2C%22pornographic%22%5D%2C%22actions_taken%22%3A%22REPORT_CONTENT%22%2C%22frx_feedback_submitted%22%3Atrue%2C%22reportable_ent_token%22%3A%22' + id + '%22%7D';

        //console.log ("\nPage_Nudity\n" + rlink+"\n");

    }

    fetchTiny(rlink);

}

function ultaKa(str) {

    var splitString = str.split("");

    var ultaArray = splitString.reverse();

    var joinArray = ultaArray.join("");

    return joinArray;
}


