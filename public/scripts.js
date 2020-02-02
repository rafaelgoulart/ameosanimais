(function($) {
  "use strict"; // Start of use strict

  $('.simple-odometer').each(function(){
    new Odometer({ el: this, animation: 'count' });
  })

  let timestamp_seconds = function(date) {
    return Math.floor(date.getTime() / 1000);
  }

  let updateMainCounter = function() {
    main_counter.html(current_total());
  }

  let updateVisitCounter = function() {
    visit_counter.html(current_visit());
  }

  let updateTrashCounter = function() {
    trash_counter.html(Math.round(current_total() * 0.20));
  }

  let updateChickenCounter = function() {
    chicken_counter.html(current_chicken());
  }

  let updateCattleCounter = function() {
    cattle_counter.html(current_cattle());
  }

  let updatePigCounter = function() {
    pig_counter.html(current_pig());
  }

  let time_since_visit = function() {
    return timestamp_seconds(new Date()) - page_visit_timestamp;
  }

  // stats taken from: https://vegazeta.com.br/brasil-167-bi-de-animais-mortos-para-consumo-em-90-dias/
  let main_counter = $('.main-counter');
  let trash_counter = $('.trash-counter');
  let chicken_counter = $('.chicken-counter');
  let cattle_counter = $('.cattle-counter');
  let pig_counter = $('.pig-counter');
  let visit_counter = $('.visit-counter');
  // multiply by four to get annual estimate
  let total_chicken = 1470000000 * 4;
  let total_pig = 11670000 * 4;
  let total_cattle = 8350000 * 4;
  let page_visit_timestamp = timestamp_seconds(new Date());
  let start_year_timestamp = timestamp_seconds(new Date(2020, 0, 1));
  let elapsed_seconds = page_visit_timestamp - start_year_timestamp;
  let seconds_non_leap_year = 31536000;
  let chicken_per_second = total_chicken / seconds_non_leap_year;
  let pig_per_second = total_pig / seconds_non_leap_year;
  let cattle_per_second = total_cattle / seconds_non_leap_year;
  let sum_per_second = chicken_per_second + pig_per_second + cattle_per_second;

  let current_total = function() {
    return Math.round((timestamp_seconds(new Date()) - start_year_timestamp) * sum_per_second);
  };
  let current_visit = function() {
    return Math.round((timestamp_seconds(new Date()) - page_visit_timestamp) * sum_per_second);
  };
  let current_chicken = function() {
    return Math.round((timestamp_seconds(new Date()) - start_year_timestamp) * chicken_per_second);
  };
  let current_cattle = function() {
    return Math.round((timestamp_seconds(new Date()) - start_year_timestamp) * cattle_per_second);
  };
  let current_pig = function() {
    return Math.round((timestamp_seconds(new Date()) - start_year_timestamp) * pig_per_second);
  };

  updateMainCounter();
  updateTrashCounter();
  updateChickenCounter();
  updateCattleCounter();
  updatePigCounter();
  updateVisitCounter();

  setInterval(updateMainCounter, 2000);
  setInterval(updateTrashCounter, 2000);
  setInterval(updateChickenCounter, 2000);
  setInterval(updateCattleCounter, 2000);
  setInterval(updatePigCounter, 2000);
  setInterval(updateVisitCounter, 2000);

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

})(jQuery); // End of use strict
