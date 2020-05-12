const Domain = require("../models/Domain");
const Metric = require("../models/Metrics");
const RawData = require("../models/RawData");
require('dotenv').config();


const getForDomain = (req, res) => {
    Metric.find({"domainId": req.param('domainId') }).then(metric => {
        console.log("Found metric object for this domain")
        RawData.find({ "siteId": req.param('domainId') }).then(data => {
            console.log("Found raw data for domain");
            console.log(data)
            data.forEach((site, index) => {
                console.log(site)
                // Browser
                switch (site.deviceType) {
                    case "Firefox":
                        metric.browser.firefox += 1;
                        break;
                    case "Chrome":
                        console.log("Found Chrome")
                        metric.browser.chrome +=1;
                        console.log("Updated metric")
                        break;
                    case "Safari":
                        metric.browser.Safari +=1;
                        break;
                    case "IE":
                        metric.browser.ie +=1;
                        break;
                    case "":
                        break;
                    default:
                        metric.browser.other +=1;
                }
                console.log("Made it past browser")

                // Device Type
                const screenWidth = site.screenWidth;
                if(screenWidth < 480){
                    metric.deviceType.mobile += 1;
                } else if(768 <= screenWidth && screenWidth < 1024 ){
                    metric.deviceType.tablet += 1;
                } else if(screenWidth >= 1024){
                    metric.deviceType.deskTop += 1;
                }
                console.log("Made it past deviceType")

                // Load Times
                metric.loadTimes.data.time.push(site.loadTime);
                metric.loadTimes.avg += site.loadTime;
                if(site.loadTime > metric.loadTimes.high){
                    metric.loadTimes.high = site.loadTime
                }

                if(metric.loadTimes.low === 0){
                    metric.loadTimes.low = site.loadTime
                } else if(site.loadTime < metric.loadTimes.low && site.loadTime > 0){
                    metric.loadTimes.low = site.loadTime
                }
                console.log("Made it past load times")

                // Locale
                if(site.geolocation.lat !== 0 && site.geolocation.long !== 0){
                    metric.location.push({
                        lat: site.geolocation.lat,
                        long: site.geolocation.long
                    })
                }
            });
            metric.loadTimes.avg = metric.loadTimes.avg / data.length;

            console.log("Compiled Data");
            console.log(metric);
            res.status(200)
                .json({
                    status: 200,
                    metrics: metric
                })
        }).catch(err => {
            res.status(200)
                .json({
                    status: 500,
                    message: "Error compiling metrics",
                    error: err
                })
        })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                message: "Error retrieving metrics",
                error: err
            })
    })
};


module.exports = {
    getForDomain
};