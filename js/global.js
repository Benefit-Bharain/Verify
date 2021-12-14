$(document).ready(function () {
    var g = new Benefitis();
    g.init();
});
var Benefitis = function () {
    this.init = function () {
        this.NewsLletterSubscription();
        this.hoverImageUserFulLinks();
    },
    this.NewsLletterSubscription = function () {
        $('#btnSubscribe').click(function (e) {
            e.preventDefault()
            if ($(this).attr("data-loaded") == "false") {
                var sEmail = $('#TxtSignUpEmail');
                if (sEmail.val() == "") {
                    sEmail.focus();
                    $(this).attr("data-loaded", "false");
                    MessageDialog("Newletter", "Please enter valid email address");
                    e.preventDefault();
                } else {
                    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var demail = sEmail.val();
                    if (!regex.test(demail)) {
                        sEmail.focus();
                        $(this).attr("data-loaded", "false");
                        MessageDialog("Newletter", "You must enter a valid e-mail address")
                        return false;
                    } else {
                        var g1 = new Benefitis();
                        $(this).attr("data-loaded", "true");
                        $('#btnSubscribe').attr({ 'disabled': true }).addClass("newsLetter-disable");
                        MessageDialog("Newletter", "Newsletter has been Subscribed Successfully");
                        $('#btnSubscribe').removeAttr('disabled').removeClass('newsLetter-disable');
                        $('#btnSubscribe').attr("data-loaded", "false");
                        g1.NewsLetter_Action(demail);
                        sEmail.val("");
                        return false;
                    }
                }
            }
        });
    },
    this.hoverImageUserFulLinks = function () {
        $(".useful-links-block").hover(function () {
            var _hoverchangeimage = $(this).find(".useful-links-image").find("img")
            _hoverchangeimage.attr("src", _hoverchangeimage.attr("hover-image"));
            $(this).find(".useful-links-txt a").addClass("useful-links-txt-hover");
        }, function () {
            var _hoverchangeimage = $(this).find(".useful-links-image").find("img")
            _hoverchangeimage.attr("src", _hoverchangeimage.attr("default-image"));
            $(this).find(".useful-links-txt a").removeClass("useful-links-txt-hover");
        });
    },
      this.NewsLetter_Action = function (nEmail) {
          var N_Email = JSON.stringify({
              newsLetterE: nEmail
          });
          $.ajax({
              type: "POST",
              contentType: "application/json; charset=utf-8",
              url: "/Templates/others.aspx/NewsLetterSubscription",
              data: N_Email,
              dataType: "json",
              success: function (response) {
                  var data = response.d;
                  //  $('#btnSubscribe').removeAttr('disabled').removeClass('newsLetter-disable');
                  //  $('#btnSubscribe').attr("data-loaded", "false");
              },
              error: function () {
                  //  $('#btnSubscribe').removeAttr('disabled').removeClass('newsLetter-disable');
                  // $('#btnSubscribe').attr("data-loaded", "false");
              }
          });
      }
}