// api key 2546b7a496c060af3bd2b136ddbd82dd PLEASE DO NOT USE IT SIGN UP FOR YOUR OWN KEY ITS FREE
$(document).ready(function() {
    var celsius = false,
        farenheight = true;

    var requestTimout = setTimeout(function() {
        console.log("eror");
    }, 8000);

    function getCoordinates2(callback) {
        $.getJSON("https://ipinfo.io/json", function(data) {
            var loc = data.loc.split(",");
            callback(loc[0], loc[1])
            $(".address").append(data.city + " " + data.region + " " + data.country);
        });
    }


    function getWeather2(lat, lon) {
        var darkAddress = "https://api.darksky.net/forecast/c0ce7614b48fa84f870127065c32177a/" + lat + "," + lon;
        $.ajax({
            url: darkAddress,
            dataType: "jsonp",
            success: function(data) {
                var iconc = new Skycons({
                    "color": "#eee"
                });
                iconc.set("icon1", data.currently.icon);
                iconc.play();
                $(".description").append(data.currently.summary);
                $(".degInt").append(Math.round(data.currently.temperature) + " ºF");
                clearTimeout(requestTimout);
                // return data
            }
        });
    }

    function convertor(isFarenheightButton) {
        var cel = $(".degInt").text();
        cel = parseFloat(cel);
        if (isFarenheightButton !== farenheight & celsius !== isFarenheightButton) {
            var degreesInF = Math.round(cel * 9 / 5 + 32);
            $(".degInt").text(degreesInF + " ºF");
            farenheight = true;
        } else if (isFarenheightButton === celsius & isFarenheightButton !== farenheight) {
            var degreesInC = Math.round((cel - 32) * 5 / 9);
            $(".degInt").text(degreesInC + " ºC");
            farenheight = false;
        }
    }

    getCoordinates2(getWeather2);
    $(".farenheight").click(function() {
        convertor(true)
    });
    $(".celsius").click(function() {
        convertor(false)
    });

});
