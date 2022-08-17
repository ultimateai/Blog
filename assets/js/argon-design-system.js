---
layout: js_minifier
replace_names: false
---


var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

var $datepicker = $('.datepicker');
var $collapse = $('.navbar .collapse');
var $html = $('html');
var $tagsinput = $('.tagsinput');

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {

    $('.wrapper .login-page, .register-page, .card').perfectScrollbar();


    if ($('.tab-content .table-responsive').length != 0) {

      $('.table-responsive').each(function() {
        var ps2 = new PerfectScrollbar($(this)[0]);
      });
    }

    $html.addClass('perfect-scrollbar-on');
  } else {
    $html.addClass('perfect-scrollbar-off');
  }
})();

$(document).ready(function() {
  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    var $el = $(this);
    var $parent = $(this).offsetParent(".dropdown-menu");
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).closest("a").toggleClass('open');

    $(this).parents('a.dropdown-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-menu .show').removeClass("show");
    });

    if (!$parent.parent().hasClass('navbar-nav')) {
      $el.next().css({
        "top": $el[0].offsetTop,
        "left": $parent.outerWidth() - 4
      });
    }

    return false;
  });


  'use strict';

  var FormControl = (function() {


    var $input = $('.form-control');




    function init($this) {
      $this.on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus'));
      }).trigger('blur');
    }



    if ($input.length) {
      init($input);
    }

  })();



  if ($('.headroom')[0]) {
    var headroom = new Headroom(document.querySelector("#navbar-main"), {
      offset: 300,
      tolerance: {
        up: 30,
        down: 30
      },
    });
    headroom.init();
  }

  if ($('#choices-single-default')[0]) {

    new Choices('#choices-single-default', {
      search: false,
    });
  }
  if ($('#choices-multiple-default')[0]) {
    new Choices('#choices-multiple-default', {
      search: true,
      delimiter: ',',
      editItems: true,
      removeItemButton: true,
    });
  }

  if ($('#badges')[0]) {

    new Choices('#badges', {
      delimiter: ',',
      editItems: true,
      maxItems: 5,
      removeButton: true,
      removeItemButton: true,
    });
  }


  'use strict';

  var Popover = (function() {

    var $popover = $('[data-toggle="popover"]'),
      $popoverClass = '';

    function init($this) {
      if ($this.data('color')) {
        $popoverClass = 'popover-' + $this.data('color');
      }

      var options = {
        trigger: 'focus',
        template: '<div class="popover ' + $popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      };

      $this.popover(options);
    }

    if ($popover.length) {
      $popover.each(function() {
        init($(this));
      });
    }


  })();

  var btn = $('.back-to-top');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });

});

$(document).on('click', '.card-rotate .btn-rotate', function() {
  var $rotating_card_container = $(this).closest('.rotating-card-container');

  if ($rotating_card_container.hasClass('hover')) {
    $rotating_card_container.removeClass('hover');
  } else {
    $rotating_card_container.addClass('hover');
  }
});


function up(max) {
  document.getElementById("myNumber").value = parseInt(document.getElementById("myNumber").value) + 1;
  if (document.getElementById("myNumber").value >= parseInt(max)) {
    document.getElementById("myNumber").value = max;
  }
}

function down(min) {
  document.getElementById("myNumber").value = parseInt(document.getElementById("myNumber").value) - 1;
  if (document.getElementById("myNumber").value <= parseInt(min)) {
    document.getElementById("myNumber").value = min;
  }
}


var didScroll;

ArgonKit = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > scroll_distance) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),


  initSliders: function() {
    var slider = document.getElementById('sliderRegular');

    if (slider) {
      noUiSlider.create(slider, {
        start: 40,
        connect: [true, false],
        range: {
          min: 0,
          max: 100
        }
      });
    }

    var slider2 = document.getElementById('sliderDouble');

    if (slider) {
      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });
    }
  }
}
