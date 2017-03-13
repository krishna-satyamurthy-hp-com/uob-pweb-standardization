var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

document.addEventListener("DOMContentLoaded", function() {
	initHeader();
	initNavigationBar();
    initWrapBox();
});

function initHeader() {
	//var segmentName = getSegmentName();
    var segmentName = getMetaTagValue("segment-label").trim();

	if (segmentName.length > 0) {
		var segmentHeaderButton = document.getElementById("dropdown-personal");
		if (segmentHeaderButton) {
			segmentHeaderButton.innerHTML = 
				"<span data-uob-tg-mobile=\"hide\">You are in </span><span class=\"text-bold\">" + 
				segmentName + "</span><span class=\"caret\"></span>";		
		}
	}

    var segmentOptions = document.querySelectorAll(".block-personal .list-unstyled li");
    for (var i=0; i<segmentOptions.length; i++) {
        if (segmentOptions[i].innerText.toLowerCase().indexOf(segmentName.toLowerCase()) >=0) {
            segmentOptions[i].setAttribute("style", "display:none;");
        }
    }

	var countryName = getCountryName();

	if (countryName.length > 0) {
		var countryHeaderButton = document.getElementById("dropdown-languages");
		if (countryHeaderButton) {
			countryHeaderButton.innerHTML = 
				"<span data-uob-tg-mobile=\"show\">UOB </span><span class=\"text-bold\">" + 
				countryName + "</span><span class=\"caret\"></span>";		
		}	
	}

    var countryOptions = document.querySelectorAll(".block-languages:not(.mleft-10) .list-unstyled li");
    for (var i=0; i<countryOptions.length; i++) {
        if (countryOptions[i].innerText.toLowerCase().indexOf(countryName.toLowerCase()) >=0) {
            countryOptions[i].setAttribute("style", "display:none;");
        }
    }
	
	var languageUse = getLanguage();
	
	/*
	if (languageUse.length > 0) {
		var languageHeaderButton = document.getElementById("dropdown-languagesuse");
		if (languageHeaderButton) {
			languageHeaderButton.innerHTML = 
				"<span data-uob-tg-mobile=\"show\">UOB </span><span class=\"text-bold\">" + 
				languageUse + "</span><span class=\"caret\"></span>";		
		}	
	}
	*/
	
	var languageOptions = document.querySelectorAll(".mleft-10[data-uob-tg-desktop='show'] .list-unstyled li");
    

    if (languageOptions.length > 1) {
        for (var i=0; i<languageOptions.length; i++) {
            //populate language list
            if (languageOptions[i].innerText.toLowerCase().indexOf(languageUse.toLowerCase()) >=0) {
                languageOptions[i].setAttribute("style", "display:none;");
                //populate default 
                var nextOption = "";
                if (languageOptions.length > 1) {
                    if (i == 0) {
                        nextOption = languageOptions[1].innerText;
                    } else {
                        nextOption = languageOptions[1].innerText;
                    }
                } 

                nextOption = getCountryFromLanguageOption(nextOption);

                if (nextOption.length > 0) {
                    var languageHeaderButton = document.getElementById("dropdown-languagesuse");
                    if (languageHeaderButton) {
                        languageHeaderButton.removeAttribute("style", "display:none;");
                        languageHeaderButton.innerHTML = 
                            "<span class=\"text-bold\">" + 
                            nextOption + "</span><span class=\"caret\"></span>";       
                    }   
                }
            }
            var link = languageOptions[i].querySelector("a");
            if (link) {
                var option = link.innerText;
                if (getCountryFromLanguageOption(option).length > 0) {
                    link.innerText = getCountryFromLanguageOption(option);
                    link.setAttribute("title", getCountryFromLanguageOption(option));
                    var href = getLinkFromLanguageOption(option);
                    if (href) {
                        link.setAttribute("href", href);
                    }
                }
            }
        }
    }
} 

function initNavigationBar() {
	// var segmentName = getSegmentName();
    var segmentName = getMetaTagValue("segment-label").trim();

	if (segmentName.length > 0) {
		var segmentNavbarButton = document.getElementById("dropdown-personal-mobile");
		if (segmentNavbarButton) {
			segmentNavbarButton.innerHTML = 
				"<span data-uob-tg-mobile=\"hide\">You are in </span><span class=\"text-bold\">" + 
				segmentName + "</span><span class=\"caret\"></span>";		
		}
	}

	
	var countryName = getCountryName();

	if (countryName.length > 0) {
		var countryNavbarButton = document.getElementById("dropdown-languages-mobile");
		if (countryNavbarButton) {
			countryNavbarButton.innerHTML = 
				"<span data-uob-tg-mobile=\"show\">UOB </span><span class=\"text-bold\">" + 
				countryName + "</span><span class=\"caret\"></span>";		
		}	
	}
	
	var languageUse = getLanguage();
	
	var languageOptions = document.querySelectorAll("div[data-uob-tg-mobile='show'] .mleft-10 .list-unstyled li")
    for (var i=0; i<languageOptions.length; i++) {
		//populate language list
        if (languageOptions[i].innerText.toLowerCase().indexOf(languageUse.toLowerCase()) >=0) {
            languageOptions[i].setAttribute("style", "display:none;");

            var nextOption = "";
            if (languageOptions.length > 1) {
                if (i == 0) {
                    nextOption = languageOptions[1].innerText;
                } else {
                    nextOption = languageOptions[1].innerText;
                }
            } 

            nextOption = getCountryFromLanguageOption(nextOption);

        	if (nextOption.length > 0) {
        		var languageNavbarButton = document.getElementById("dropdown-languagesuse-mobile");
        		if (languageNavbarButton) {
        			languageNavbarButton.removeAttribute("style", "display:none;");
        			languageNavbarButton.innerHTML = 
        				"<span data-uob-tg-mobile=\"show\" class=\"text-bold\">" + 
        				nextOption + "</span><span class=\"caret\"></span>";		
        		}	
        	}
		}
        var link = languageOptions[i].querySelector("a");
        if (link) {
            var option = link.innerText;
            if (getCountryFromLanguageOption(option).length > 0) {
                link.innerText = getCountryFromLanguageOption(option);
                link.setAttribute("title", getCountryFromLanguageOption(option));
                var href = getLinkFromLanguageOption(option);
                if (href) {
                    link.setAttribute("href", href);
                }
            }
        }
	}
	
}

function getSegmentName() {
	var segment = getMetaTagValue("segment").trim();
	var segmentName = ""
	if (segment && segment.length > 0) {
		if (Segment_Mapping[segment]) {
			segmentName = Segment_Mapping[segment];
		}
	} else {
		if (window.location.hostname.indexOf("www.uobgroup.com") >= 0) {
			segmentName = "UOB Group";
		}
	}
	return segmentName;
}

function getCountryName() {
	var countryCode = getMetaTagValue("country").trim();
	var countryName = "";
	if (countryCode && isoCountries.hasOwnProperty(countryCode.toUpperCase())) {
		countryName = isoCountries[countryCode.toUpperCase()];
	}
	return countryName;
}

function getLanguage() {
	var language = getMetaTagValue("language").trim();
	/*var languageCode = "";
	if (language && stdLangauge.hasOwnProperty(language.toUpperCase())) {
		languageCode = stdLangauge[language.toUpperCase()];
	}
	return languageCode;*/
    return (language) ? language : "";
}

function getCountryFromLanguageOption(option) {
    return option.substring(0, option.indexOf("|"));
}

function getLanguageCodeFromLanguageOption(option) {
    return option.substring(option.indexOf("|") + 1, option.length);
}

function getLinkFromLanguageOption(option) {
    if (typeof(isTeamSiteServer) !="function" || isTeamSiteServer()) {
        return null;
    }
    var href = document.location.href;
    var languageCode =  getLanguageCodeFromLanguageOption(option).toLowerCase();
    var segment = getSegmentForAnalytics();
    var newSegment = segment;
    switch (languageCode) {
        case "en":
            if (segment.lastIndexOf("-") >=0) {
                newSegment = segment.substring(0, segment.lastIndexOf("-"));
            }
            break;
        default:
            if (segment.lastIndexOf("-") >=0) {
                newSegment = segment.substring(0, segment.lastIndexOf("-"));
            }
            newSegment += "-" + languageCode;
            break;
    }
    href = href.replace(segment, newSegment);
    return href;
}

function initWrapBox() {
    var gridContainers = document.querySelectorAll(".imageBox-content");
    for (var j=0; j<gridContainers.length; j++) {
        var links = gridContainers[j].querySelectorAll(".imageBox-grid .image-item-wrap-box a");
        for (var i=0; i<links.length; i++) {
            if (links[i].hasAttribute("title")) {
                var div = document.createElement('div');
                div.innerHTML = links[i].getAttribute("title");
                links[i].setAttribute("title", div.innerText);
            }
            if (links[i].hasAttribute("href")) {
                links[i].setAttribute("href", links[i].getAttribute("href") + "-" + j);
            }
        }
        var collapseDivs = gridContainers[j].querySelectorAll(".collapse-body .collapse");
        for (var i=0; i<collapseDivs.length; i++) {
            if (collapseDivs[i].hasAttribute("id")) {
                collapseDivs[i].setAttribute("id", collapseDivs[i].getAttribute("id") + "-" + j);
            }
        }
        var collapseBtns = gridContainers[j].querySelectorAll(".collapse-body .collapse-nav");
        for (var i=0; i<collapseBtns.length; i++) {
            if (collapseBtns[i].hasAttribute("href")) {
                collapseBtns[i].setAttribute("href", collapseBtns[i].getAttribute("href") + "-" + j);
            }
        }
    }
}