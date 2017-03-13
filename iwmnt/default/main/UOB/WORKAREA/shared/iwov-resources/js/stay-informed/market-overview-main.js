
var csvpath= "/wsm/stayinformed.do?path=";
var pagename=location.pathname.split(".").slice(-1);

$(document).ready(function() {
  $('body').addClass('stay-informed-foreign-exchange');
  $('.selectpicker').selectpicker();
  
  initDataCsv();
});

var itemDisplay = 5,
    yearArray = [],
    monthArray = [];
  
function handleCSVUrl(csvurl) {
    return window.location.origin + csvurl;
}

function loadDataCsv() {
  $('.selectpicker').on('change', function () {
    var el = $(this),
        year = '', month = '';
    if (el.hasClass('year-select')) {
      year = el.val();
      month = $('select.month-select option:first').val();
    } else if (el.hasClass('month-select')) {
      month = el.val();
      year = $('select.year-select').find('option:selected').val();
    }
    //display items
    dataAjax(path, month, year);
  });
}

function initDataCsv() {
  var pagination = $('.pagination');
  var rpath;
  if(pagename=="page"){rpath=handleCSVUrl(csvpath.concat(path));}else{rpath=path;}
  $.ajax({
    type: 'GET',
    //url: path,
  url: rpath,
    dataType: 'text',
    success: function(data) {
      // hideLoading();
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          selectMonth = $('.selectpicker.month-select'),
          selectYear = $('.selectpicker.year-select');
          
      //Year Array
      fillOption(selectYear, jsonParse);
      //build template
      var build = buildTemplate(jsonParse, selectMonth.val(), selectYear.val());
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
  // var month = $('select.month-select').val(),
  //     year = $('select.year-select').val();

  // dataAjax(path, month, year);
  //handler click
  loadDataCsv();
}

function buildTemplate(result, month, year) {
  var html = '',
      monthData,yearData;
  for (var i = 0, len = result.length; i < len; i++) {
    var dataResult = result[i],
        dataDateResult = splitDate(dataResult.date);
    if (month !== 'all') {
      monthData = dataDateResult[1];
    } else {
      monthData = 'all';
    }
    yearData = dataDateResult[2];
    if (month === monthData && year === yearData) {
      html += '<tr><td><p class="date-wrap">'+dataResult.date+'</p>'
           + '</td>'
           + '<td>'
            + '<p> <strong>'+dataResult.report_title+'</strong>'+dataResult.report_description+'</p>'
          + '</td>'
          +' <td><a href="'+dataResult.report_url+'" title="View report" class="btn-1">View report</a></td>'
           +'</tr>'
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
  
  $('.responsive-table tbody').html(html);

  var items = $('.responsive-table tbody tr'),
      numItems = items.length,
      perPage = itemDisplay;
  // only show the first 2 (or "first per_page") items initially
  items.slice(itemDisplay).hide();
}

function dataAjax(url, month, year) {
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
    //url: url,
  url: rpath,
    dataType: 'text',
    success: function(data) {
      hideLoading();
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          build = buildTemplate(jsonParse, month, year),
          selectYear = $('.selectpicker.year-select');

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
          dataYear = dataDate[2];

      if (dataYear === year) {
        if ($.inArray(dataMonth, monthArray) <= -1 ) {
          monthArray.push(dataMonth);
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

    select.selectpicker('refresh');

    $('.selectpicker.year-select').off('change.year').on('change.year', function () {
      var el = $(this),
          value = el.val(),
          monthSelect = $('.selectpicker.month-select');
      //reset select 
      monthSelect.empty();
      //reset month array     
      monthArray = [];
      for (var i = 0, len = jsonParse.length; i < len - 1; i++) {
        var data = jsonParse[i],
            dataDate = splitDate(data.date),
            dataMonth = dataDate[1],
            dataYear = dataDate[2];

        if (value === dataYear) {
          if ($.inArray(dataMonth, monthArray) <= -1) {
            monthArray.push(dataMonth);
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
      monthSelect.selectpicker('refresh');
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
