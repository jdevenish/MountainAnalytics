let userObj = {
    siteId: document.getElementById("MountainAnalytics").getAttribute("siteId"),
    loadTime: 0,
    screenWidth: 0,
    geolocation: {
        lat: 0,
        long: 0
    },
    deviceType: ""
};

function BrowserDetection() {
    //Check if browser is IE
    if (navigator.userAgent.search("MSIE")>0) {
        // insert conditional IE code here
        userObj.deviceType = "IE"
    }else if (navigator.userAgent.search("Chrome")>0) {
        // insert conditional Chrome code here
        userObj.deviceType= "Chrome"
    }else if (navigator.userAgent.search("Firefox")>0) {
        // insert conditional Firefox Code here
        userObj.deviceType="Firefox"
    }else if (navigator.userAgent.search("Safari")>0 && navigator.userAgent.search("Chrome") < 0) {
        // insert conditional Safari code here
        userObj.deviceType = "Safari"
    }else {
        userObj.deviceType = "Other"
    }
}

let request = new XMLHttpRequest();
request.open('GET', "https://freegeoip.app/json/", true);
request.onload = function() {
    let data = JSON.parse(this.response);
    if(request.status >= 200 && request.status < 400){
        userObj.geolocation.lat = data.latitude
        userObj.geolocation.long = data.longitude
    }
};
request.send();


window.onload = function () {
    userObj.loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
    userObj.screenWidth = screen.width;
    BrowserDetection();
};

let sendToMA = new XMLHttpRequest();
sendToMA.open('POST', "https://mountain-analytics.herokuapp.com/data/create", true);
sendToMA.send(userObj);