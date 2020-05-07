let userObj = {
  loadTime: 0,
  screenWidth: 0,
  geolocation: []
}
window.onload = function () {
    userObj.loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
    userObj.screenWidth = screen.width
    userObj.geolocation = navigator.geolocation.getCurrentPosition((Geolocation)=> return Geolocation)
  
    console.log(userObj)
}

