// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
      (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
      );
  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];
  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;
  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec( strData )){
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[ 1 ];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
          strMatchedDelimiter.length &&
          (strMatchedDelimiter != strDelimiter)
          ){
          // Since we have reached a new row of data,
          // add an empty row to our data array.
          arrData.push( [] );
      }
      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[ 2 ]){
          // We found a quoted value. When we capture
          // this value, unescape any double quotes.
          var strMatchedValue = arrMatches[ 2 ].replace(
              new RegExp( "\"\"", "g" ),
              "\""
              );
      } else {
          // We found a non-quoted value.
          var strMatchedValue = arrMatches[ 3 ];
      }
      // Now that we have our value string, let's add
      // it to the data array.
      arrData[ arrData.length - 1 ].push( strMatchedValue );
  }
  // Return the parsed data.
  return( arrData );
}
function CSV2JSON(csv) {
  var array = CSVToArray(csv);
  var objArray = [];
  for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
          var key = array[0][k];
          objArray[i - 1][key] = array[i][k]
      }
  }

  var json = JSON.stringify(objArray);
  var str = json.replace(/},/g, "},\r\n");

  return str;
}

var isoCountries = {
    'Afghanistan' : 'AF',
    'Aland Islands' : 'AX',
    'Albania' : 'AL',
    'Algeria' : 'DZ',
    'American Samoa' : 'AS',
    'Andorra' : 'AD',
    'Angola' : 'AO',
    'Anguilla' : 'AI',
    'Antarctica' : 'AQ',
    'Antigua And Barbuda' : 'AG',
    'Argentina' : 'AR',
    'Armenia' : 'AM',
    'Aruba' : 'AW',
    'Australia' : 'AU',
    'Austria' : 'AT',
    'Azerbaijan' : 'AZ',
    'Bahamas' : 'BS',
    'Bahrain' : 'BH',
    'Bangladesh' : 'BD',
    'Barbados' : 'BB',
    'Belarus' : 'BY',
    'Belgium' : 'BE',
    'Belize' : 'BZ',
    'Benin' : 'BJ',
    'Bermuda' : 'BM',
    'Bhutan' : 'BT',
    'Bolivia' : 'BO',
    'Bosnia And Herzegovina' : 'BA',
    'Botswana' : 'BW',
    'Bouvet Island' : 'BV',
    'Brazil' : 'BR',
    'British Indian Ocean Territory' : 'IO',
    'Brunei Darussalam' : 'BN',
    'Bulgaria' : 'BG',
    'Burkina Faso' : 'BF',
    'Burundi' : 'BI',
    'Cambodia' : 'KH',
    'Cameroon' : 'CM',
    'Canada' : 'CA',
    'Cape Verde' : 'CV',
    'Cayman Islands' : 'KY',
    'Central African Republic' : 'CF',
    'Chad' : 'TD',
    'Chile' : 'CL',
    'China' : 'CN',
    'Christmas Island' : 'CX',
    'Cocos (Keeling) Islands' : 'CC',
    'Colombia' : 'CO',
    'Comoros' : 'KM',
    'Congo' : 'CG',
    'Congo, Democratic Republic' : 'CD',
    'Cook Islands' : 'CK',
    'Costa Rica' : 'CR',
    'Cote D\'Ivoire' : 'CI',
    'Croatia' : 'HR',
    'Cuba' : 'CU',
    'Cyprus' : 'CY',
    'Czech Republic' : 'CZ',
    'Denmark' : 'DK',
    'Djibouti' : 'DJ',
    'Dominica' : 'DM',
    'Dominican Republic' : 'DO',
    'Ecuador' : 'EC',
    'Egypt' : 'EG',
    'El Salvador' : 'SV',
    'Equatorial Guinea' : 'GQ',
    'Eritrea' : 'ER',
    'Estonia' : 'EE',
    'Ethiopia' : 'ET',
    'Falkland Islands (Malvinas)' : 'FK',
    'Faroe Islands' : 'FO',
    'Fiji' : 'FJ',
    'Finland' : 'FI',
    'France' : 'FR',
    'French Guiana' : 'GF',
    'French Polynesia' : 'PF',
    'French Southern Territories' : 'TF',
    'Gabon' : 'GA',
    'Gambia' : 'GM',
    'Georgia' : 'GE',
    'Germany' : 'DE',
    'Ghana' : 'GH',
    'Gibraltar' : 'GI',
    'Greece' : 'GR',
    'Greenland' : 'GL',
    'Grenada' : 'GD',
    'Guadeloupe' : 'GP',
    'Guam' : 'GU',
    'Guatemala' : 'GT',
    'Guernsey' : 'GG',
    'Guinea' : 'GN',
    'Guinea-Bissau' : 'GW',
    'Guyana' : 'GY',
    'Haiti' : 'HT',
    'Heard Island & Mcdonald Islands' : 'HM',
    'Holy See (Vatican City State)' : 'VA',
    'Honduras' : 'HN',
    'Hong Kong' : 'HK',
    'Hungary' : 'HU',
    'Iceland' : 'IS',
    'India' : 'IN',
    'Indonesia' : 'ID',
    'Iran, Islamic Republic Of' : 'IR',
    'Iraq' : 'IQ',
    'Ireland' : 'IE',
    'Isle Of Man' : 'IM',
    'Israel' : 'IL',
    'Italy' : 'IT',
    'Jamaica' : 'JM',
    'Japan' : 'JP',
    'Jersey' : 'JE',
    'Jordan' : 'JO',
    'Kazakhstan' : 'KZ',
    'Kenya' : 'KE',
    'Kiribati' : 'KI',
    'Korea' : 'KR',
    'Kuwait' : 'KW',
    'Kyrgyzstan' : 'KG',
    'Lao People\'s Democratic Republic' : 'LA',
    'Latvia' : 'LV',
    'Lebanon' : 'LB',
    'Lesotho' : 'LS',
    'Liberia' : 'LR',
    'Libyan Arab Jamahiriya' : 'LY',
    'Liechtenstein' : 'LI',
    'Lithuania' : 'LT',
    'Luxembourg' : 'LU',
    'Macao' : 'MO',
    'Macedonia' : 'MK',
    'Madagascar' : 'MG',
    'Malawi' : 'MW',
    'Malaysia' : 'MY',
    'Maldives' : 'MV',
    'Mali' : 'ML',
    'Malta' : 'MT',
    'Marshall Islands' : 'MH',
    'Martinique' : 'MQ',
    'Mauritania' : 'MR',
    'Mauritius' : 'MU',
    'Mayotte' : 'YT',
    'Mexico' : 'MX',
    'Micronesia, Federated States Of' : 'FM',
    'Moldova' : 'MD',
    'Monaco' : 'MC',
    'Mongolia' : 'MN',
    'Montenegro' : 'ME',
    'Montserrat' : 'MS',
    'Morocco' : 'MA',
    'Mozambique' : 'MZ',
    'Myanmar' : 'MM',
    'Namibia' : 'NA',
    'Nauru' : 'NR',
    'Nepal' : 'NP',
    'Netherlands' : 'NL',
    'Netherlands Antilles' : 'AN',
    'New Caledonia' : 'NC',
    'New Zealand' : 'NZ',
    'Nicaragua' : 'NI',
    'Niger' : 'NE',
    'Nigeria' : 'NG',
    'Niue' : 'NU',
    'Norfolk Island' : 'NF',
    'Northern Mariana Islands' : 'MP',
    'Norway' : 'NO',
    'Oman' : 'OM',
    'Pakistan' : 'PK',
    'Palau' : 'PW',
    'Palestinian Territory, Occupied' : 'PS',
    'Panama' : 'PA',
    'Papua New Guinea' : 'PG',
    'Paraguay' : 'PY',
    'Peru' : 'PE',
    'Philippines' : 'PH',
    'Pitcairn' : 'PN',
    'Poland' : 'PL',
    'Portugal' : 'PT',
    'Puerto Rico' : 'PR',
    'Qatar' : 'QA',
    'Reunion' : 'RE',
    'Romania' : 'RO',
    'Russian Federation' : 'RU',
    'Rwanda' : 'RW',
    'Saint Barthelemy' : 'BL',
    'Saint Helena' : 'SH',
    'Saint Kitts And Nevis' : 'KN',
    'Saint Lucia' : 'LC',
    'Saint Martin' : 'MF',
    'Saint Pierre And Miquelon' : 'PM',
    'Saint Vincent And Grenadines' : 'VC',
    'Samoa' : 'WS',
    'San Marino' : 'SM',
    'Sao Tome And Principe' : 'ST',
    'Saudi Arabia' : 'SA',
    'Senegal' : 'SN',
    'Serbia' : 'RS',
    'Seychelles' : 'SC',
    'Sierra Leone' : 'SL',
    'Singapore' : 'SG',
    'Slovakia' : 'SK',
    'Slovenia' : 'SI',
    'Solomon Islands' : 'SB',
    'Somalia' : 'SO',
    'South Africa' : 'ZA',
    'South Georgia And Sandwich Isl.' : 'GS',
    'Spain' : 'ES',
    'Sri Lanka' : 'LK',
    'Sudan' : 'SD',
    'Suriname' : 'SR',
    'Svalbard And Jan Mayen' : 'SJ',
    'Swaziland' : 'SZ',
    'Sweden' : 'SE',
    'Switzerland' : 'CH',
    'Syrian Arab Republic' : 'SY',
    'Taiwan' : 'TW',
    'Tajikistan' : 'TJ',
    'Tanzania' : 'TZ',
    'Thailand' : 'TH',
    'Timor-Leste' : 'TL',
    'Togo' : 'TG',
    'Tokelau' : 'TK',
    'Tonga' : 'TO',
    'Trinidad And Tobago' : 'TT',
    'Tunisia' : 'TN',
    'Turkey' : 'TR',
    'Turkmenistan' : 'TM',
    'Turks And Caicos Islands' : 'TC',
    'Tuvalu' : 'TV',
    'Uganda' : 'UG',
    'Ukraine' : 'UA',
    'United Arab Emirates' : 'AE',
    'United Kingdom' : 'GB',
    'United States' : 'US',
    'United States Outlying Islands' : 'UM',
    'Uruguay' : 'UY',
    'Uzbekistan' : 'UZ',
    'Vanuatu' : 'VU',
    'Venezuela' : 'VE',
    'Viet Nam' : 'VN',
    'Virgin Islands, British' : 'VG',
    'Virgin Islands, U.S.' : 'VI',
    'Wallis And Futuna' : 'WF',
    'Western Sahara' : 'EH',
    'Yemen' : 'YE',
    'Zambia' : 'ZM',
    'Zimbabwe' : 'ZW'
};

function getCountryCode (countryName) {
    if (isoCountries.hasOwnProperty(countryName)) {
        return isoCountries[countryName];
    } else {
        return countryName;
    }
}
/**
* simplePagination.js v1.6
* A simple jQuery pagination plugin.
* http://flaviusmatis.github.com/simplePagination.js/
*
* Copyright 2012, Flavius Matis
* Released under the MIT license.
* http://flaviusmatis.github.com/license.html
*/

(function($){

	var methods = {
		init: function(options) {
			var o = $.extend({
				items: 1,
				itemsOnPage: 1,
				pages: 0,
				displayedPages: 5,
				edges: 2,
				currentPage: 0,
				hrefTextPrefix: '#page-',
				hrefTextSuffix: '',
				prevText: 'Prev',
				nextText: 'Next',
				ellipseText: '&hellip;',
				ellipsePageSet: true,
				cssStyle: 'light-theme',
				listStyle: '',
				labelMap: [],
				selectOnClick: true,
				nextAtFront: false,
				invertPageOrder: false,
				useStartEdge : true,
				useEndEdge : true,
				onPageClick: function(pageNumber, event) {
					// Callback triggered when a page is clicked
					// Page number is given as an optional parameter
				},
				onInit: function() {
					// Callback triggered immediately after initialization
				}
			}, options || {});

			var self = this;

			o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
			if (o.currentPage)
				o.currentPage = o.currentPage - 1;
			else
				o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
			o.halfDisplayed = o.displayedPages / 2;

			this.each(function() {
				self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
				methods._draw.call(self);
			});

			o.onInit();

			return this;
		},

		selectPage: function(page) {
			methods._selectPage.call(this, page - 1);
			return this;
		},

		prevPage: function() {
			var o = this.data('pagination');
			if (!o.invertPageOrder) {
				if (o.currentPage > 0) {
					methods._selectPage.call(this, o.currentPage - 1);
				}
			} else {
				if (o.currentPage < o.pages - 1) {
					methods._selectPage.call(this, o.currentPage + 1);
				}
			}
			return this;
		},

		nextPage: function() {
			var o = this.data('pagination');
			if (!o.invertPageOrder) {
				if (o.currentPage < o.pages - 1) {
					methods._selectPage.call(this, o.currentPage + 1);
				}
			} else {
				if (o.currentPage > 0) {
					methods._selectPage.call(this, o.currentPage - 1);
				}
			}
			return this;
		},

		getPagesCount: function() {
			return this.data('pagination').pages;
		},

		setPagesCount: function(count) {
			this.data('pagination').pages = count;
		},

		getCurrentPage: function () {
			return this.data('pagination').currentPage + 1;
		},

		destroy: function(){
			this.empty();
			return this;
		},

		drawPage: function (page) {
			var o = this.data('pagination');
			o.currentPage = page - 1;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		redraw: function(){
			methods._draw.call(this);
			return this;
		},

		disable: function(){
			var o = this.data('pagination');
			o.disabled = true;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		enable: function(){
			var o = this.data('pagination');
			o.disabled = false;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		updateItems: function (newItems) {
			var o = this.data('pagination');
			o.items = newItems;
			o.pages = methods._getPages(o);
			this.data('pagination', o);
			methods._draw.call(this);
		},

		updateItemsOnPage: function (itemsOnPage) {
			var o = this.data('pagination');
			o.itemsOnPage = itemsOnPage;
			o.pages = methods._getPages(o);
			this.data('pagination', o);
			methods._selectPage.call(this, 0);
			return this;
		},

		getItemsOnPage: function() {
			return this.data('pagination').itemsOnPage;
		},

		_draw: function() {
			var	o = this.data('pagination'),
				interval = methods._getInterval(o),
				i,
				tagName;

			methods.destroy.call(this);

			tagName = (typeof this.prop === 'function') ? this.prop('tagName') : this.attr('tagName');

			var $panel = tagName === 'UL' ? this : $('<ul' + (o.listStyle ? ' class="' + o.listStyle + '"' : '') + '></ul>').appendTo(this);

			// Generate Prev link
			if (o.prevText) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {text: o.prevText, classes: 'prev'});
			}

			// Generate Next link (if option set for at front)
			if (o.nextText && o.nextAtFront) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
			}

			// Generate start edges
			if (!o.invertPageOrder) {
				if (interval.start > 0 && o.edges > 0) {
					if(o.useStartEdge) {
						var end = Math.min(o.edges, interval.start);
						for (i = 0; i < end; i++) {
							methods._appendItem.call(this, i);
						}
					}
					if (o.edges < interval.start && (interval.start - o.edges != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (interval.start - o.edges == 1) {
						methods._appendItem.call(this, o.edges);
					}
				}
			} else {
				if (interval.end < o.pages && o.edges > 0) {
					if(o.useStartEdge) {
						var begin = Math.max(o.pages - o.edges, interval.end);
						for (i = o.pages - 1; i >= begin; i--) {
							methods._appendItem.call(this, i);
						}
					}

					if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (o.pages - o.edges - interval.end == 1) {
						methods._appendItem.call(this, interval.end);
					}
				}
			}

			// Generate interval links
			if (!o.invertPageOrder) {
				for (i = interval.start; i < interval.end; i++) {
					methods._appendItem.call(this, i);
				}
			} else {
				for (i = interval.end - 1; i >= interval.start; i--) {
					methods._appendItem.call(this, i);
				}
			}

			// Generate end edges
			if (!o.invertPageOrder) {
				if (interval.end < o.pages && o.edges > 0) {
					if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (o.pages - o.edges - interval.end == 1) {
						methods._appendItem.call(this, interval.end);
					}
					if(o.useEndEdge) {
						var begin = Math.max(o.pages - o.edges, interval.end);
						for (i = begin; i < o.pages; i++) {
							methods._appendItem.call(this, i);
						}
					}
				}
			} else {
				if (interval.start > 0 && o.edges > 0) {
					if (o.edges < interval.start && (interval.start - o.edges != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (interval.start - o.edges == 1) {
						methods._appendItem.call(this, o.edges);
					}

					if(o.useEndEdge) {
						var end = Math.min(o.edges, interval.start);
						for (i = end - 1; i >= 0; i--) {
							methods._appendItem.call(this, i);
						}
					}
				}
			}

			// Generate Next link (unless option is set for at front)
			if (o.nextText && !o.nextAtFront) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
			}

			if (o.ellipsePageSet && !o.disabled) {
				methods._ellipseClick.call(this, $panel);
			}

		},

		_getPages: function(o) {
			var pages = Math.ceil(o.items / o.itemsOnPage);
			return pages || 1;
		},

		_getInterval: function(o) {
			return {
				start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
				end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
			};
		},

		_appendItem: function(pageIndex, opts) {
			var self = this, options, $link, o = self.data('pagination'), $linkWrapper = $('<li></li>'), $ul = self.find('ul');

			pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

			options = {
				text: pageIndex + 1,
				classes: ''
			};

			if (o.labelMap.length && o.labelMap[pageIndex]) {
				options.text = o.labelMap[pageIndex];
			}

			options = $.extend(options, opts || {});

			if (pageIndex == o.currentPage || o.disabled) {
				if (o.disabled || options.classes === 'prev' || options.classes === 'next') {
					$linkWrapper.addClass('disabled');
				} else {
					$linkWrapper.addClass('active');
				}
				$link = $('<span class="current">' + (options.text) + '</span>');
			} else {
				$link = $('<a href="javascript:void(0)" class="page-link">' + (options.text) + '</a>');
				$link.click(function(event){
					return methods._selectPage.call(self, pageIndex, event);
				});
			}

			if (options.classes) {
				$link.addClass(options.classes);
			}

			$linkWrapper.append($link);

			if ($ul.length) {
				$ul.append($linkWrapper);
			} else {
				self.append($linkWrapper);
			}
		},

		_selectPage: function(pageIndex, event) {
			var o = this.data('pagination');
			o.currentPage = pageIndex;
			if (o.selectOnClick) {
				methods._draw.call(this);
			}
			return o.onPageClick(pageIndex + 1, event);
		},


		_ellipseClick: function($panel) {
			var self = this,
				o = this.data('pagination'),
				$ellip = $panel.find('.ellipse');
			$ellip.addClass('clickable').parent().removeClass('disabled');
			$ellip.click(function(event) {
				if (!o.disable) {
					var $this = $(this),
						val = (parseInt($this.parent().prev().text(), 10) || 0) + 1;
					$this
						.html('<input type="number" min="1" max="' + o.pages + '" step="1" value="' + val + '">')
						.find('input')
						.focus()
						.click(function(event) {
							// prevent input number arrows from bubbling a click event on $ellip
							event.stopPropagation();
						})
						.keyup(function(event) {
							var val = $(this).val();
							if (event.which === 13 && val !== '') {
								// enter to accept
								if ((val>0)&&(val<=o.pages))
								methods._selectPage.call(self, val - 1);
							} else if (event.which === 27) {
								// escape to cancel
								$ellip.empty().html(o.ellipseText);
							}
						})
						.bind('blur', function(event) {
							var val = $(this).val();
							if (val !== '') {
								methods._selectPage.call(self, val - 1);
							}
							$ellip.empty().html(o.ellipseText);
							return false;
						});
				}
				return false;
			});
		}

	};

	$.fn.pagination = function(method) {

		// Method calling logic
		if (methods[method] && method.charAt(0) != '_') {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.pagination');
		}

	};

})(jQuery);
