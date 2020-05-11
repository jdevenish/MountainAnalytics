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
    if (navigator.userAgent.search("MSIE")>0) {
        userObj.deviceType = "IE"
    }else if (navigator.userAgent.search("Chrome")>0) {
        userObj.deviceType= "Chrome"
    }else if (navigator.userAgent.search("Firefox")>0) {
        userObj.deviceType="Firefox"
    }else if (navigator.userAgent.search("Safari")>0 && navigator.userAgent.search("Chrome") < 0) {
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

    let sendToMA = new XMLHttpRequest()
    sendToMA.open('POST', "https://mountain-analytics.herokuapp.com/data/create", true)
    sendToMA.setRequestHeader("Content-Type", "application/json");
    sendToMA.setRequestHeader("Access-Control-Allow-Origin", "*");
    sendToMA.send(JSON.stringify(userObj))
};