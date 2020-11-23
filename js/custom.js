(function ($) {
  "use strict";

  $('.popup-youtube, .popup-vimeo').magnificPopup({
    // disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $(document).ready(function () {
    $('select').niceSelect();
  });
  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });

  $(document).ready(function () {
    $('select').niceSelect();
  });

  var review = $('.client_review_part');
  if (review.length) {
    review.owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
      smartSpeed: 2000,
    });
  }
  var client = $('.client_logo');
  if (client.length) {
    client.owlCarousel({
      items: 6,
      loop: true,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
      smartSpeed: 2000,
      margin: 20,
      responsive: {
        0: {
          items: 3
        },
        577: {
          items: 3,
        },
        991: {
          items: 5,
        },
        1200: {
          items: 6,
        }
      },
    });
  }
  //counter up
  $('.count').counterUp({
    delay: 10,
    time: 2000
  });

  //------- Mailchimp js --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();

  //------ login form ----- //
  $("#login-form").submit(function (event) {
    var email = $("input[name=EMAIL]").val();
    if (email.includes('charity')) {
      window.location.href = 'charity-dashboard.html';

    } else if ((email.includes('provider'))) {
      window.location.href = 'foodprovider-dashboard.html';
    }
    event.preventDefault();
  });

  //----- Registeration forms -------//

  // ------ Food Providers ----- //
  $("#fp-register-form").submit(function (event) {

    let endpoint = "https://rowsgglqfxax29p-neevirarmoede.adb.uk-london-1.oraclecloudapps.com/ords/mhords/nva/v1/food_providers";
    var email = $("input[name=EMAIL]").val();
    var name = $("input[name=name]").val();
    var categories = $("input[name=categories]").val();
    var lat = $("input[name=latitude]").val();
    var long = $("input[name=longitude]").val();
    var province = $("input[name=province]").val();
    var country = $("input[name=country]").val();
    var city = $("input[name=city]").val();
    var website = $("input[name=website]").val();

    var header = {
      "Accept": "*/*",
      "NAME": name,
      "CATEGORIES": categories,
      "LATITUDE": lat,
      "LONGITUDE": long,
      "PROVINCE": province,
      "COUNTRY": country,
      "CITY": city,
      "WEBSITE": website
    };
    $.ajax({
      url: endpoint,
      type: "POST",
      headers: header,
      data: "",
      success: function (result) {
        window.location.href = 'foodprovider-dashboard.html';

      }
      ,
      error: function (result) {
        console.log("Failed");
      }
    })
    event.preventDefault();

  });

  // ------ Food Providers ----- //
  $("#c-register-form").submit(function (event) {

    let endpoint = "https://rowsgglqfxax29p-neevirarmoede.adb.uk-london-1.oraclecloudapps.com/ords/mhords/nva/v1/charities";
    var email = $("input[name=EMAIL]").val();
    var name = $("input[name=name]").val();
    var province = $("input[name=province]").val();
    var country = $("input[name=country]").val();
    var city = $("input[name=city]").val();
    var website = $("input[name=website]").val();
    var phone = $("input[name=phone]").val();

    var header = {
      "Accept": "*/*",
      "AGENCY": name,
      "AGENCY_STATE": province,
      "AGENCY_COUNTRY": country,
      "AGENCY_CITY": city,
      "WEBSITE": website,
      "PHONE": phone
    };
    $.ajax({
      url: endpoint,
      type: "POST",
      headers: header,
      data: "",
      success: function (result) {
        window.location.href = 'charity-dashboard.html';

      }
      ,
      error: function (result) {
        console.log("Failed");
      }
    })
    event.preventDefault();
  });


  // ----- Get Data --- //

  $("#get-unclaimed-meals").click(function () {

    let endpoint = "https://rowsgglqfxax29p-neevirarmoede.adb.uk-london-1.oraclecloudapps.com/ords/mhords/nva/v1/available_meals/not_claimed";

    $.ajax({
      url: endpoint,
      type: "GET",
      data: "",
      success: function (result) {
        var available_meals = result.items
        var wrapper = '<section class="feature_part"><div class="container"></div></section>'
        var header = '<div class="row justify-content-center"><div class="col-xl-8"><div class="section_tittle text-center"><h2>Available Meals</h2></div></div></div>'
        $('#meals-results').append(header);
        var available_meals_count = 0; 
        var meals_list = '<div class="row justify-content-center">'
        for (var index in available_meals) {

          var meal = available_meals[index];

          var id = meal['id'];
          var quantity = meal['quantity'];
          var description = meal['description'];
          var name = meal['name'];

          available_meals_count += quantity;
          var card_content = '<div class="d-flex align-items-center"><img src="img/icon/feature_2.svg" alt=""><h4>' + name + '</h4></div><small>Quantity: ' + quantity + '</small><p>' + description + '  <a href="#" onClick="claim();" class="d-flex genric-btn success circle">Claim</a></p>'
          var card = '<div class="col-lg-3 col-sm-6"><div class="single_feature"><div class="single_feature_part">' + card_content + '</div></div></div>'
          meals_list+=card;
        }
        meals_list+='</div>';
        $('#meals-results').append(meals_list);
        $('#meals-results').wrap(wrapper);
      }
      ,
      error: function (result) {
        console.log("Failed");
      }
    })
  });

  $('.claimmeal').click(function () {
    alert('You have claimed the meals. It will be delivered shortly');
});


// ----- Add meals ---///


$("#add-meals-form").submit(function () {

  let endpoint = 'https://rowsgglqfxax29p-neevirarmoede.adb.uk-london-1.oraclecloudapps.com/ords/mhords/nva/v1/available_meals';

  var quantity = $("input[name=quantity]").val();
    var description = $("input[name=description]").val();
    var expiry_date = $("input[name=expiry_date]").val();


    var header = {
      "Accept": "*/*",
      "QUANTITY": quantity,
      "DESCRIPTION": description,
      "EXPIREY_DATE": "2021-12-21 12:01:30",
      "PROVIDER_ID": 20032
    };
    $.ajax({
      url: endpoint,
      type: "POST",
      headers: header,
      data: "",
      success: function (result) {
       $('#am-message').show();
       $('#add-meals-form').trigger("reset");
      }
      ,
      error: function (result) {
        console.log("Failed");
      }
    })
    event.preventDefault();



});


}(jQuery));