//Global variable
var objPath = {},
    yearArray = [],
    monthArray = [],
    itemDisplay = 5,
    windowWidth,
    windowHeight;

$(document).ready(function() {
  $('body').addClass('stay-informed-foreign-exchange');
  $('.selectpicker').selectpicker();

  //handler click 
  initDataCsv();
  
});

function loadDataCsv() {
  $('.selectpicker').on('change', function () {
    var el = $(this),
        tabPane = el.closest('.tab-pane'),
        url = (typeof objPath ==='object') ? objPath[tabPane.data('tabbed')] : '',
        year = '', month = '';
    if (el.hasClass('year-select')) {
      year = el.val();
      month = tabPane.find('select.month-select option:first').val();
    } else if (el.hasClass('month-select')) {
      month = el.val();
      year = tabPane.find('select.year-select').val();
    }
    //display items
    if (url.length) {
      dataAjax(url, tabPane, month, year);
    }
  });
}

function initDataCsv() {
  //get path url
  path.forEach(function (data) {
    objPath[data[0]] = data[1];
  });
  // get text to tabs
  $('.nav-tabs').find('li').each(function (i, e) {
    var el = $(this),
        text = $(path[i])[0];

    el.find('a').text(text).attr('title', text);
  });

  $('.tab-pane').each(function (i, e) {
    var el = $(this),
        yearSelect = el.find('select.year-select').val();
    //set value to data tabbed
    el.data('tabbed', $(path[i])[0]);
    //get url 
    var url = objPath[el.data('tabbed')];
    //display items
    if (url.length) {
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        success: function(data) {
          var output_json = CSV2JSON(data),
              jsonParse = JSON.parse(output_json),
              pagination = el.find('.pagination'),
              monthSelect = el.find('select.month-select'),
              yearSelect = el.find('select.year-select');

          //Year Array
          fillOption(yearSelect, jsonParse);    
          var build = buildTemplate(jsonParse, monthSelect.val(), yearSelect.val());

          if (build !== 'undefined' && build) {
            paginationItems(pagination, el, build);
          } else {
            paginationItems(pagination, el, noResultTemplate());
          }
        },
        error: function (error) {
          hideLoading();
          console.log(error);
        }
      });
    }
  });
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
function pageOne() {
    var page_1 = "#page-5";
    $('.selection').hide();
    $(page_1).show();
}
function paginationItems(pagination, element, html) {
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
  
  element.find('tbody').html(html);

  var items = element.find('.responsive-table tbody tr'),
      numItems = items.length,
      perPage = itemDisplay;
  // only show the first 2 (or "first per_page") items initially
  items.slice(itemDisplay).hide();
}

function dataAjax(url, el, month, year) {
  if (!$('.loading').length) {
    $('body').append('<div class="loading"></div>');
  } else {
    showLoading();
  }
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'text',
    success: function(data) {
      hideLoading();
      var output_json = CSV2JSON(data),
          jsonParse = JSON.parse(output_json),
          build = buildTemplate(jsonParse, month, year),
          pagination = el.find('.pagination'),
          selectYear = el.find('.selectpicker.year-select');
      //Year Array
      // fillOption(selectYear, jsonParse);
      if (build !== 'undefined' && build) {
        paginationItems(pagination, el, build);
      } else {
        paginationItems(pagination, el, noResultTemplate());
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
    yearArray = [];
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
      fillOptionMonth(select.closest('.tab-pane').find('.selectpicker.month-select'), jsonParse, yearNumber);
    }
    select.selectpicker('refresh');
  }
}
function fillOptionMonth(select, jsonParse, year) {
  //check if select null or have value from the begining
  if (select.val() === null || !select.hasClass('has-value')) {
    //set select empty value
    select.empty();
    monthArray = [];
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
          monthSelect = el.closest('.tab-pane').find('.selectpicker.month-select');
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