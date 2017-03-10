"use strict";
var geoip2 = function () {
    function Lookup(e, t, o, n) {
        this.successCallback = e, this.errorCallback = t, this.geolocation = o && o.hasOwnProperty("geolocation") ? o.geolocation : navigator.geolocation, this.type = n
    }

    var exports = {};
    Lookup.prototype.returnSuccess = function (e) {
        this.successCallback && "function" == typeof this.successCallback && this.successCallback(this.fillInObject(this.objectFromJSON(e)))
    }, Lookup.prototype.returnError = function (e) {
        this.errorCallback && "function" == typeof this.errorCallback && (e || (e = {error: "Unknown error"}), this.errorCallback(e))
    }, Lookup.prototype.objectFromJSON = function (json) {
        return "undefined" != typeof window.JSON && "function" == typeof window.JSON.parse ? window.JSON.parse(json) : eval("(" + json + ")")
    };
    var fillIns = {
        country: [["continent", "Object", "names", "Object"], ["country", "Object", "names", "Object"], ["registered_country", "Object", "names", "Object"], ["represented_country", "Object", "names", "Object"], ["traits", "Object"]],
        city: [["city", "Object", "names", "Object"], ["continent", "Object", "names", "Object"], ["country", "Object", "names", "Object"], ["location", "Object"], ["postal", "Object"], ["registered_country", "Object", "names", "Object"], ["represented_country", "Object", "names", "Object"], ["subdivisions", "Array", 0, "Object", "names", "Object"], ["traits", "Object"]]
    };
    return Lookup.prototype.fillInObject = function (e) {
        for (var t = "country" === this.type ? fillIns.country : fillIns.city, o = 0; o < t.length; o++)for (var n = t[o], r = e, s = 0; s < n.length; s += 2) {
            var i = n[s];
            r[i] || (r[i] = "Object" === n[s + 1] ? {} : []), r = r[i]
        }
        try {
            Object.defineProperty(e.continent, "continent_code", {
                enumerable: !1, get: function () {
                    return this.code
                }, set: function (e) {
                    this.code = e
                }
            })
        } catch (c) {
            e.continent.code && (e.continent.continent_code = e.continent.code)
        }
        if ("country" !== this.type)try {
            Object.defineProperty(e, "most_specific_subdivision", {
                enumerable: !1, get: function () {
                    return this.subdivisions[this.subdivisions.length - 1]
                }, set: function (e) {
                    this.subdivisions[this.subdivisions.length - 1] = e
                }
            })
        } catch (c) {
            e.most_specific_subdivision = e.subdivisions[e.subdivisions.length - 1]
        }
        return e
    }, Lookup.prototype.getGeoIPResult = function () {
        var e, t, o = this, n = "//js.maxmind.com/geoip/v2.1/" + this.type + "/me?", r = {referrer: location.protocol + "//" + location.hostname};
        if (!this.alreadyRan) {
            this.alreadyRan = 1, "Microsoft Internet Explorer" === navigator.appName && window.XDomainRequest && navigator.appVersion.indexOf("MSIE 1") === -1 ? (t = new XDomainRequest, n = window.location.protocol + n, t.onprogress = function () {
            }) : (t = new window.XMLHttpRequest, n = "https:" + n);
            for (e in r)r.hasOwnProperty(e) && r[e] && (n += e + "=" + encodeURIComponent(r[e]) + "&");
            n = n.substring(0, n.length - 1), t.open("GET", n, !0), t.onload = function () {
                if ("undefined" == typeof t.status || 200 === t.status)o.returnSuccess(t.responseText); else {
                    var e, n = t.hasOwnProperty("contentType") ? t.contentType : t.getResponseHeader("Content-Type");
                    if (/json/.test(n) && t.responseText.length)try {
                        e = o.objectFromJSON(t.responseText)
                    } catch (r) {
                        e = {
                            code: "HTTP_ERROR",
                            error: "The server returned a " + t.status + " status with an invalid JSON body."
                        }
                    } else e = t.responseText.length ? {
                        code: "HTTP_ERROR",
                        error: "The server returned a " + t.status + " status with the following body: " + t.responseText
                    } : {
                        code: "HTTP_ERROR",
                        error: "The server returned a " + t.status + " status but either the server did not return a body or this browser is a version of Internet Explorer that hides error bodies."
                    };
                    o.returnError(e)
                }
            }, t.ontimeout = function () {
                o.returnError({code: "HTTP_TIMEOUT", error: "The request to the GeoIP2 web service timed out."})
            }, t.onerror = function () {
                o.returnError({
                    code: "HTTP_ERROR",
                    error: "There was a network error receiving the response from the GeoIP2 web service."
                })
            }, t.send(null)
        }
    }, exports.country = function (e, t, o) {
        var n = new Lookup(e, t, o, "country");
        n.getGeoIPResult()
    }, exports.city = function (e, t, o) {
        var n = new Lookup(e, t, o, "city");
        n.getGeoIPResult()
    }, exports.insights = function (e, t, o) {
        var n = new Lookup(e, t, o, "insights");
        n.getGeoIPResult()
    }, exports
}();
//# sourceMappingURL=geoip2.js.map

var windowWidth = $(window).width(),
    windowHeight = $(window).height();
var resizeMainWindow = function () {
    var windowWidthNew = jQuery(window).width();
    var windowHeightNew = jQuery(window).height();
    if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
        windowWidth = windowWidthNew;
        windowHeight = windowHeightNew;
    }
};

var now = new Date();
var time = now.getTime();
var expireTime = time + 1000 * 36000;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}

var dataCookie = function (country_detect, segment_selected) {
    var data = {
        country_detect: country_detect,
        segment_selected: segment_selected
    }

    return data;

}

var a = document.getElementById("loc");

function jsonpCallbackCountry() {
    // $.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) {
    //     alert('Latitude: ' + data.latitude +
    //         '\nLongitude: ' + data.longitude +
    //         '\nCountry: ' + data.address.country);
    // });
    // $.get("http://ip-api.com/json", function (response) {
    //     console.log(response.country);
    // }, "jsonp");
    $.getJSON('http://ipinfo.io', function (data) {
        console.log(data.ip)
        console.log(data.country);
        var countryCode = data.country,
            getRetDetect = getNameCountry(countryCode.toLowerCase()),
            segmentSelectedCokkie = getCookie('segment-selected'),
            dropdownLanSelect = $('.dropdown-languages-select'),
            country = getRetDetect.country_detect,
            segment = getRetDetect.segment_selected,
            btnSelect = "";

        setCookie('country-detect', country, expireTime);

        if (segmentSelectedCokkie === "") {
            setCookie('segment-selected', segment, expireTime);
            if (country != "Others") {
                btnSelect = dropdownLanSelect.find("a:contains('" + segment + "')");
            }

        } else {
                btnSelect = dropdownLanSelect.find("a:contains('" + segmentSelectedCokkie + "')");
        }
        $(btnSelect).click();
    });
}

function getNameCountry(countryChar) {
    switch (countryChar) {
        case "sg":
            return dataCookie("SINGAPORE", "UOB SINGAPORE");
            break;
        case "cn":
            return dataCookie("CHINA", "UOB CHINA");
            break;
        case "hk":
            return dataCookie("HONG KONG", "UOB HONG KONG");
            break;
        case "id":
            return dataCookie("INDONESIA", "UOB INDONESIA");
            break;
        case "my":
            return dataCookie("MALAYSIA", "UOB MALAYSIA");
            break;
        case "in":
            return dataCookie("INDIA", "UOB MUMBAI");
            break;
        case "ph":
            return dataCookie("PHILIPPINES", "UOB PHILIPPINES");
            break;
        case "tw":
            return dataCookie("TAIWAN", "UOB TAIPEI");
            break;
        case "th":
            return dataCookie("THAILAND", "UOB THAILAND");
            break;
        case "jp":
            return dataCookie("JAPAN", "UOB TOKYO");
            break;
        case "mm":
            return dataCookie("MYANMAR", "UOB YANGON");
            break;
        default:
            return dataCookie("Others", "UOB GROUP");
            break;
    }
}

function initDropdownLanguagesSelect() {
    $('.dropdown-languages-select ul li').on('click', function () {
        var me = $(this),
            dropdownOpen = me.closest('.dropdown'),
            buttonDropDown = dropdownOpen.find('.btn-dropdown-languages-select'),
            spanText = buttonDropDown.find('.text-bold'),
            segment = me.text().replace('UOB', '').trim();

        if (spanText.text() !== segment) {
            $(spanText).animate({opacity: 0})
                .queue(function () {
                    $(this).text(segment).dequeue();
                })
                .animate({opacity: 1}, 350);

            setCookie('segment-selected', segment, expireTime);
        }
    });
}

var detectCountry = (function () {
    // $.getJSON("http://jsonip.com/?callback=?", function (data) {
    //     console.log(data.ip);
    // });

    /* This implements the actual redirection. */
    var redirectBrowser = function (site) {
        var getRetDetect = getNameCountry(site),
            segmentSelectedCokkie = getCookie('segment-selected'),
            dropdownLanSelect = $('.dropdown-languages-select'),
            country = getRetDetect.country_detect,
            segment = getRetDetect.segment_selected,
            btnSelect = "";

        console.log(site);

        setCookie('country-detect', country, expireTime);

        if (segmentSelectedCokkie === "") {
            setCookie('segment-selected', segment, expireTime);
            if (country != "Others") {
                btnSelect = dropdownLanSelect.find("a:contains('" + segment + "')");
            }

        } else {
            if (country != "Others") {
                btnSelect = dropdownLanSelect.find("a:contains('" + segmentSelectedCokkie + "')");
            }
        }

        $(btnSelect).click();
        return site;
        // window.location = uri;
    };

    /* These are the country codes for the countries we have sites for.
     * We will check to see if a visitor is coming from one of these countries.
     * If they are, we redirect them to the country-specific site. If not, we
     * redirect them to world.example.com */
    var sites = {
        "sg": true,
        "cn": true,
        "hk": true,
        "id": true,
        "my": true,
        "in": true,
        "ph": true,
        "tw": true,
        "th": true,
        "jp": true,
        "mm": true
    };
    var defaultSite = "world";

    var onSuccess = function (geoipResponse) {
        console.log(geoipResponse);
        /* There's no guarantee that a successful response object
         * has any particular property, so we need to code defensively. */
        if (!geoipResponse.country.iso_code) {
            redirectBrowser("world");
        }

        /* ISO country codes are in upper case. */
        var code = geoipResponse.country.iso_code.toLowerCase();

        if (sites[code]) {
            redirectBrowser(code);
        }
        else {
            redirectBrowser("world");
        }
    };

    /* We don't really care what the error is, we'll send them
     * to the default site. */
    var onError = function (error) {
        redirectBrowser("world");
    };

    return function () {
        geoip2.country(onSuccess, onError);
    };
}());


$(document).ready(function () {
    $('.accordion-toggle', '.business-block').on('click', function () {
        var el = $(this);
        el.closest('.panel-heading').toggleClass('active');
    });
});
$(window).load(function () {
    initDropdownLanguagesSelect();
    // detectCountry();
    jsonpCallbackCountry();
});

$(window).bind('resize', resizeMainWindow);

