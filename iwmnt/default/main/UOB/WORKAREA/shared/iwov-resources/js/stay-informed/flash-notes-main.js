//Global variable
var itemDisplay = 10,
    yearArray = [],
    countryArray = [],
    monthArray = [],
	csvpath= "/wsm/stayinformed.do?path=";

$(document).ready(function() {
  $('body').addClass('stay-informed-flash-notes');
  $('.selectpicker').selectpicker();

  initDataCsv();
});
//
function handleCSVUrl(csvurl) {
    return window.location.origin + csvurl;
}

function loadDataCsv() {
  $('.selectpicker').on('change', function () {
    var el = $(this),
        country = '', month = '', year = '';

    if (el.hasClass('country-select')) {
      country = el.find('option:selected').val();
      month = $('select.month-select').val();
      year = $('select.year-select').val();
    } else if (el.hasClass('month-select')) {
      country = $('select.country-select').find('option:selected').val();
      month = el.val();
      year = $('select.year-select').val();
    } else if (el.hasClass('year-select')) {
      country = $('select.country-select option:first').val();
      month = $('select.month-select option:first').val();
      year = el.val();
    }
    //display items

	
    dataAjax(path, country, month, year);
  });
}

function initDataCsv() {
  var pagination = $('.pagination');
  //var rpath;
  var pagename=location.pathname.split(".").slice(-1);
  var rpath;
  if(pagename=="page"){rpath=handleCSVUrl(csvpath.concat(path));}else{rpath=path;}
   
  $.ajax({
    type: 'GET',
    url: rpath,
    dataType: 'text',
    success: function(data) {
      // hideLoading();
	
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          selectCountry = $('.selectpicker.country-select'),
          selectMonth = $('.selectpicker.month-select'),
          selectYear = $('.selectpicker.year-select');
      //Country Array
      fillOption(selectCountry, jsonParse);
      //Year Array
      fillOption(selectYear, jsonParse);
      //build template
      var build = buildTemplate(jsonParse, selectCountry.val(), selectMonth.val(), selectYear.val());
      if (build !== 'undefined' && build) {
        paginationItems(pagination, build);
      } else {
        paginationItems(pagination, noResultTemplate());
      }
    },
    error: function (error) {
      hideLoading();
      console.log(error);
    }
  });

  //handler click 
  loadDataCsv();
  
}

function buildTemplate(result, country, month, year) {
  var html = '', 
      countryData,monthData,yearData;

  for (var i = 0,len=result.length; i < len; i++) {
    var data = result[i],
        dateSplit = splitDate(data.date);

    (country !== 'all') ? countryData = data.report_type : countryData = 'all';
    (month !== 'all') ? monthData = dateSplit[1] : monthData = 'all';
    yearData = dateSplit[2];
    if (country === countryData && month === monthData && year === yearData) {
      html += '<tr>'
           +   '<td>' 
           +    '<p class="date-wrap">'+data.date+'</p>'
           +   '</td>'
           +   '<td>' 
           +    '<p>'+data.report_type+'</p>'
           +   '</td>'
           +   '<td>'
           +    '<p> <strong>'+data.report_title.split(':')[0]+':</strong> '+data.report_description+'</p>'
           +   '</td>'
           +   '<td><a href="'+data.report_url+'" title="View report" class="btn-1">View report</a></td>'
           +  '</tr>'
    }
  }
  return html;
}
function paginationItems(pagination, html) {
  var length = $(html).length;
  if (length > itemDisplay) {
    pagination.pagination({
      items: length,
      itemsOnPage: itemDisplay,
      displayedPages: isMobile.phone ? 3 : 5,
      cssStyle: '',
      prevText: ' ',
      nextText: ' ',
      onPageClick: function(pageNumber) { // this is where the magic happens
        // someone changed page, lets hide/show trs appropriately
        var showFrom = itemDisplay * (pageNumber - 1);
        var showTo = showFrom + itemDisplay;
        items.hide() // first hide everything, then show for the new page
         .slice(showFrom, showTo).fadeIn();
      }
    });
  } else {
    pagination.html('');
  }

  $('.flash-notes-table tbody').html(html);

  var items = $('.flash-notes-table tbody tr'),
      numItems = items.length,
      perPage = itemDisplay;
  // only show the first 2 (or "first per_page") items initially
  items.slice(itemDisplay).hide();
}


//show data items
function dataAjax(url, country, month, year) {
  if (!$('.loading').length) {
    $('body').append('<div class="loading"></div>');
  } else {
    showLoading();
  }
  var pagination = $('.pagination');
  var rpath;
  if(pagename=="page"){rpath=handleCSVUrl(csvpath.concat(url));}else{rpath=url;}
  $.ajax({
    type: 'GET',
    url: rpath,
    dataType: 'text',
    success: function(data) {
      hideLoading();
	
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          build = buildTemplate(jsonParse, country, month, year),
          selectCountry = $('.selectpicker.country-select'),
          selectMonth = $('.selectpicker.month-select'),
          selectYear = $('.selectpicker.year-select');
      //Country Array
      // fillOption(selectCountry, jsonParse);
      //Year Array
      // fillOption(selectYear, jsonParse);

      if (build !== 'undefined' && build) {
        paginationItems(pagination, build);
      } else {
        paginationItems(pagination, noResultTemplate());
      }
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
      var data = jsonParse[i],
          dataDate = splitDate(data.date),
          dataYear = dataDate[2];

      //Year Array
      if ($.inArray(dataYear, yearArray) <= -1 ) {
        yearArray.push(dataYear);
      }
    }
    // add value to select option
    if (select.hasClass('year-select')) {
      for(index in yearArray) {
        var yearValue = yearArray[index];
        select.append(new Option(yearValue, yearValue));
        select.addClass('has-value');
      }
      var yearNumber = select.val();
      fillOptionMonth($('.selectpicker.month-select'), jsonParse, yearNumber);
      fillOptionMonth($('.selectpicker.country-select'), jsonParse, yearNumber);
    }
    select.selectpicker('refresh');
  }
}
function fillOptionMonth(select, jsonParse, year) {
  //check if select null or have value from the begining
  if (select.val() === null || !select.hasClass('has-value')) {
    //set select empty value
    select.empty();
    for (var i = 0, len = jsonParse.length; i < len - 1; i ++) {
      var data = jsonParse[i],
          dataDate = splitDate(data.date),
          dataMonth = dataDate[1],
          dataYear = dataDate[2],
          dataCountry = data.report_type;

      if (dataYear === year) {
        if ($.inArray(dataMonth, monthArray) <= -1 ) {
          monthArray.push(dataMonth);
        }
        if ($.inArray(dataCountry, countryArray) <= -1 ) {
          countryArray.push(dataCountry);
        }
      }
    }
    //month Array Select
    if (select.hasClass('month-select')) {
      monthArray.reverse();
      select.append(new Option('All', 'all'));
      for(index in monthArray) {
        var monthValue = monthArray[index];
        select.append(new Option(monthValue, monthValue));
        select.addClass('has-value');
      }
    }
    //Country Array Select
    if (select.hasClass('country-select')) {
      countryArray.sort();
      select.append(new Option('All', 'all'));
      for(index in countryArray) {
        var countryValue = countryArray[index];
        select.append(new Option(countryValue, countryValue));
        select.addClass('has-value');
      }
    }
    select.selectpicker('refresh');

    $('.selectpicker.year-select').off('change.year').on('change.year', function () {
      var el = $(this),
          value = el.val(),
          monthSelect = $('.selectpicker.month-select'),
          countrySelect = $('.selectpicker.country-select');
      //reset select 
      monthSelect.empty();
      countrySelect.empty();
      //reset month array     
      monthArray = [];
      countryArray = [];
      for (var i = 0, len = jsonParse.length; i < len - 1; i++) {
        var data = jsonParse[i],
            dataDate = splitDate(data.date),
            dataMonth = dataDate[1],
            dataYear = dataDate[2],
            dataCountry = data.report_type;

        if (value === dataYear) {
          if ($.inArray(dataMonth, monthArray) <= -1) {
            monthArray.push(dataMonth);
          }
          if ($.inArray(dataCountry, countryArray) <= -1) {
            countryArray.push(dataCountry);
          }
        }
      }
      if (monthSelect.hasClass('month-select')) {
        monthArray.reverse();
        monthSelect.append(new Option('All', 'all'));
        for(index in monthArray) {
          var monthValue = monthArray[index];
          monthSelect.append(new Option(monthValue, monthValue));
        }
      }
      if (countrySelect.hasClass('country-select')) {
        countryArray.sort();
        countrySelect.append(new Option('All', 'all'));
        for(index in countryArray) {
          var countryValue = countryArray[index];
          countrySelect.append(new Option(countryValue, countryValue));
        }
      }
      monthSelect.selectpicker('refresh');
      countrySelect.selectpicker('refresh');
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
function splitDate(el) {
  var dateFormat;
  if (el.indexOf('-') !== -1) {
    dateFormat = el.split('-');
  } else if (el.indexOf('/') !== -1) {
    dateFormat = el.split('/');
  } else {
    dateFormat = el.split(' ');
  }
  return dateFormat;
}