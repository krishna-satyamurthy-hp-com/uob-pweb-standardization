/* 
 * it contains all contant values 
 * User will be able to edit values as per API changes
 * 
 */
var diningTapMap = {};
diningTapMap[0] = [4, "All"]; //Order = 0 ; category id = 4 ;   name = "All"
diningTapMap[1] = [8, "New in Town"];
diningTapMap[2] = [8, "1 for 1"];
diningTapMap[3] = [8, "Western / European"];
diningTapMap[4] = [8, "Chinese"];
diningTapMap[5] = [8, "Japanese + Korean"];
diningTapMap[6] = [8, "Entertainment"];

var filterMap = {};
filterMap['0-9'] = "0,1,2,3,4,5,6,7,8,9";
filterMap['A-E'] = "a,b,c,d,e";
filterMap['F-J'] = "f,g,h,i,j";
filterMap['K-O'] = "k,l,m,n,o";
filterMap['P-T'] = "p,q,r,s,t";
filterMap['U-Z'] = "u,v,w,x,y,z";
filterMap['Others'] = "%23";


var openHrsDayMap = {};
openHrsDayMap[0]  = "Mon";
openHrsDayMap[1]  = "Tue";
openHrsDayMap[2]  = "Wed";
openHrsDayMap[3]  = "Thu";
openHrsDayMap[4]  = "Fri";
openHrsDayMap[5]  = "Sat";
openHrsDayMap[6]  = "Sun";
openHrsDayMap[7]  = "PH (Eve)";
openHrsDayMap[8]  = "PH (Weekday)";
openHrsDayMap[9]  = "PH (Weekend)";

var countryFilterMap = {};
//countryFilterMap['0'] = "ALL";
countryFilterMap['SG'] = "Singapore";
countryFilterMap['MY'] = "Malaysia";
countryFilterMap['ID'] = "Indonesia";
countryFilterMap['TH'] = "Thailand";

var categoryFiltermap = {};
categoryFiltermap[0] = "ALL";
categoryFiltermap[1] = "Travel";
categoryFiltermap[2] = "Shopping";
categoryFiltermap[3] = "Beauty & Wellness";
categoryFiltermap[4] = "Education";
categoryFiltermap[5] = "Fashion";
categoryFiltermap[6] = "Lifestyle";
categoryFiltermap[7] = "Multi";
categoryFiltermap[8] = "Online";
categoryFiltermap[9] = "Shipping";
categoryFiltermap[10] = "Services";
categoryFiltermap[11] = "Dining";

var diningImagePath = "https://pib.uob.com.sg/assets/images/mobile/mighty/dining/restaurants/";  //if(deal id < 2000000000000000000)
var NonDiningImagePath = "https://pib.uob.com.sg/assets/images/mobile/mighty/deals/sg/banner/";  //  if (deal id > 2000000000000000000)


//var apiUrl = "http://10.100.105.221:8082/mighty-dining/deals",
//var apiUrl = "https://u-sgmbsoi.uob.com.sg:443/mighty-dining/deals/",
var apiUrl = "https://sgmbsoi.uob.com.sg/mighty-dining/deals/",
        totalDealPerPage = 9,
        orderBy = "MERCHANT_NAME_ASC",
        currentPage = 0,
        totalPages = 0,
        currentTab = 0, //ALL Tab
        currentFilter = false,
        pageScroll = false,
        ajaxOn = false;



function makeTimeFormat(time) {
    time = zeroFill(time, 4);
    time = time.match(/.{1,2}/g);
    time = time.join(':');

    return tConvert(time);
}


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function checkNull(element) {
    if (element === "" || element === null || typeof element === 'undefined') {
        return 1;
    }

    return 0;
}

// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}

function zeroFill(number, width)
{
    width -= number.toString().length;
    if (width > 0)
    {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
}


function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}