//Global variable
var dataArrayXml = [],
    yearArray = [],
    quarterArray = [],
    sourceData = '/templatedata/stay-informed/global-outlook/data/',
    yearInit = '';
	var csvpath= "/wsm/stayinformed.do?path=",
	dcrpath= "/wsm/stayinformed.do?dcrpath=";
	var pagename=location.pathname.split(".").slice(-1);

$(document).ready(function() {
  $('body').addClass('stay-informed-quarter-page');

  $('.selectpicker').selectpicker();

  initDataCsv();
});

function handleCSVUrl(csvurl) {
    return window.location.origin + csvurl;
}

function initDataCsv() {
  var quarter = $('select.quarter-select').val();
  var rpath;
  if(pagename=="page"){rpath=handleCSVUrl(csvpath.concat(path));}else{rpath=path;}
  $.ajax({
    type: 'GET',
    //url: path,
	url: rpath,
    dataType: 'text',
    success: function(data) {
      hideLoading();
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          yearSelect = $('.selectpicker.year-select'),
          quarterSelect = $('.selectpicker.quarter-select');

      fillOption(yearSelect, jsonParse);

      yearInit = yearSelect.val();
      //show report items
      var quarterValue = quarterSelect.val();
      showItems(jsonParse, quarterValue, yearInit);
      var urlXML = sourceData + yearInit
      //xml to object
      xmltoObject(urlXML, quarterValue);
    },
    error: function (error) {
      hideLoading();
      console.log(error);
    }
  });
  // handler click
  loadDataCsv();
}

function loadDataCsv() {
  $('.selectpicker').on('change', function () {
    var el = $(this),
        quarter = '', year = '';

    if (el.hasClass('quarter-select')) {
      quarter = el.val();
      year = $('select.year-select').val();
    } else if (el.hasClass('year-select')) {
      quarter = $('select.quarter-select option:first').val();
      year = el.val();
    }
    var urlXML = sourceData + year;
    //display items extra
    dataAjax(path, quarter, year);
    
  });
}

//get links Items
function showItems(result, quarter, year) {
  var html = '',
      quarterData, yearData;
  $('[data-extra] a').attr({
    'title': 'No reports found',
    'href': 'javascript:void(0)'
  }).text('No reports found');
  for (var i = 0, len = result.length; i < len; i++) {
    var data = result[i],
        quarterSplit = data.quarter.split(' ');
        quarterData = quarterSplit[0];
        yearData = quarterSplit[1];

    if (quarterData === quarter && yearData === year) {
      if (data.link_title) {
        var titleLower = data.link_title.replace(/\s+/g, '').toLowerCase();
        $('[data-extra="'+data.section+'"]').find('a').attr('href', data.link_url).text(data.link_title);
        if (data.section === '3') {
          html += '<div class="col-md-4 col-sm-4 col-xs-12">'
                    +'<div class="text-link">'
                        +'<h5>'+data.link_title+':</h5><a href="'+data.link_url+'" title="'+data.link_description+'">'+data.link_description+'</a>'
                    +'</div>'
                +'</div>';
        }
      }
    }
  }
  $('.desc-report').html(html);
}

function buildTemplate(result, quarter) {
  var html = '',
      quarterData,yearData,
      quarterValue = 'quarter' + quarter.split('')[0];

  for (var i = 0, len = result.length; i < len; i++) {
    var data = result[i];
    html += '<div class="col-xs-6 col-sm-4">'
            +'<div class="report-item">'
              +'<div class="img"><img src="'+data.logo+'" alt="'+data.logo_alt_text+'"></div>'
              +'<div class="text">'
                +'<label class="caption">'+data.name+'</label><a href="'+data[quarterValue]+'" title="'+data.name+'" class="btn-1">'+data.CTA_Label+'</a>'
              +'</div>'
              +'</div>'
            +'</div>';
  }
  return html;
}
function xmltoObject(url, quarter) {
  var dataXml = {},
      countryBlock = $('.country-block');

  if (!$('.loading').length) {
    $('body').append('<div class="loading"></div>');
  } else {
    showLoading();
  }
  var rpath;
  if(pagename=="page"){rpath=handleCSVUrl(dcrpath.concat(url));}else{rpath=url;}
  $.ajax({
    type: 'GET',
    //url: url,
	url: rpath,
    dataType: 'xml',
    success: function(result) {
      hideLoading();
      var oXML = $(result).find('country_details');
      //reset data array xml
      dataArrayXml = [];
      oXML.each(function(){
        var el = $(this);
        if (el.children().length) {
          var name = el.find('name').text(),
            logo = el.find('logo').text(),
            logo_alt_text = el.find('logo_alt_text').text(),
            CTA_Label = el.find('CTA_Label').text(),
            quarter1 = el.find('quater1').text(),
            quarter2 = el.find('quater2').text(),
            quarter3 = el.find('quater3').text(),
            quarter4 = el.find('quater4').text(),

            dataXml = {
            name: name,
            logo: logo,
            logo_alt_text: logo_alt_text,
            CTA_Label: CTA_Label,
            quarter1: quarter1,
            quarter2: quarter2,
            quarter3: quarter3,
            quarter4: quarter4,
            countryCode : getCountryCode(name).toLowerCase()
          };

          dataArrayXml.push(dataXml);
        }
      });
      var build = buildTemplate(dataArrayXml, quarter);
          
      if (build !== 'undefined' && build) {
        countryBlock.html(build);
      } else {
        countryBlock.html(noResultTemplate());
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      hideLoading();
      countryBlock.html(noResultTemplate());
    }
  });
}
function dataAjax(url, quarter, year) {
	var rpath;
  if(pagename=="page"){rpath=handleCSVUrl(csvpath.concat(url));}else{rpath=url;}
  $.ajax({
    type: 'GET',
    //url: url,
	url: rpath,
    dataType: 'text',
    success: function(data) {
      hideLoading();
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          select = $('.selectpicker.year-select');

      fillOption(select, jsonParse);

      yearInit = select.val();
      //show report items
      showItems(jsonParse, quarter, yearInit);
      var urlXML = sourceData + yearInit
      //xml to object
      xmltoObject(urlXML, quarter);
    },
    error: function (error) {
      hideLoading();
      console.log(error);
    }
  });
}
function fillOption(select, jsonParse) {
  //check if select null or have value from the begining
  if (select.val() === null || !select.hasClass('has-value')) {
    //set select empty value
    select.empty();
    for (var i = 0, len = jsonParse.length; i < len - 1; i ++) {
      var dataResult = jsonParse[i],
          dataYear = dataResult.quarter.split(' ')[1];
      if ($.inArray(dataYear, yearArray) <= -1 ) {
        yearArray.push(dataYear);
      }   
    }
    //add value to select option
    for(index in yearArray) {
      var yearValue = yearArray[index];
      select.append(new Option(yearValue, yearValue));
      select.addClass('has-value');
    }
    var yearNumber = select.val();
    fillOptionQuarter($('.selectpicker.quarter-select'), jsonParse, yearNumber);
    //refresh selectpicker
    select.selectpicker('refresh');
  }
}
function fillOptionQuarter(select, jsonParse, year) {
  //check if select null or have value from the begining
  if (select.val() === null || !select.hasClass('has-value')) {
    //set select empty value
    select.empty();
    quarterArray = [];
    for (var i = 0, len = jsonParse.length; i < len - 1; i ++) {
      var data = jsonParse[i],
          dataDate = data.quarter.split(' '),
          dataQuarter = dataDate[0],
          dataYear = dataDate[1];

      if (dataYear === year) {
        if ($.inArray(dataQuarter, quarterArray) <= -1 ) {
          quarterArray.push(dataQuarter);
        }
      }
    }
    //month Array Select
    if (select.hasClass('quarter-select')) {
      quarterArray.reverse();
      for(index in quarterArray) {
        var quarterValue = quarterArray[index];
        select.append(new Option(quarterValue, quarterValue));
        select.addClass('has-value');
      }
    }

    select.selectpicker('refresh');

    $('.selectpicker.year-select').off('change.year').on('change.year', function () {
      var el = $(this),
          value = el.val(),
          quarterSelect = $('.selectpicker.quarter-select');
      //reset select 
      quarterSelect.empty();
      //reset month array     
      quarterArray = [];
      for (var i = 0, len = jsonParse.length; i < len - 1; i++) {
        var data = jsonParse[i],
            dataDate = data.quarter.split(' '),
            dataQuarter = dataDate[0],
            dataYear = dataDate[1];

        if (dataYear === value) {
          if ($.inArray(dataQuarter, quarterArray) <= -1 ) {
            quarterArray.push(dataQuarter);
          }
        }
      }
      if (quarterSelect.hasClass('quarter-select')) {
        quarterArray.reverse();
        for(index in quarterArray) {
          var quarterValue = quarterArray[index];
          quarterSelect.append(new Option(quarterValue, quarterValue));
        }
      }
      quarterSelect.selectpicker('refresh');
    });
  }
}
function noResultTemplate() {
  return $('<div class="no-result">No reports found</div>');
}
function hideLoading() {
  $('.loading').fadeOut();
}
function showLoading() {
  $('.loading').fadeIn();
}