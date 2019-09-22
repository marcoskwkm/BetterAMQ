// Code taken from https://github.com/amq-script-project/AMQ-Scripts/blob/master/design/amqBackground.user.js

function extend (func, method, ext) {
  let old = (func.fn ? func.fn : func.prototype)[method];
  func.prototype[method] = function () {
	let result = old.apply(this, Array.from(arguments));
	ext.apply(this, Array.from(arguments));
	return result;
  }
}

if (window.QuizInfoContainer != null) {//we are logged in

  extend(QuizInfoContainer, "showContent", function () {
	$("#qpInfoHider").prevAll().css("visibility", "visible");
	$("#qpAnimeNameContainer").css("visibility", "visible");
  });

  extend(QuizInfoContainer, "hideContent", function () {
	$("#qpInfoHider").prevAll().css("visibility", "hidden");
	$("#qpAnimeNameContainer").css("visibility", "hidden");
  });

  extend(VideoOverlay, "show", function () {
	this.$hider.siblings().css("visibility", "hidden");
  });

  extend(VideoOverlay, "hide", function () {
	this.$hider.siblings().css("visibility", "visible");
  });


  extend(VideoOverlay, "showWaitingBuffering", function () {
	this.$bufferingScreen.siblings().css("visibility", "hidden");
  });

  extend(VideoOverlay, "hideWaitingBuffering", function () {
	this.$bufferingScreen.siblings().css("visibility", "visible");
  });

  extend(AvatarWindow, "closeWindow", function () {
	$("#custom-background").css("z-index", -1);
	$("#avatarWindow").css("z-index", -1);
  });

  extend(AvatarWindow, "showWindow", function () {
	$("#custom-background").css("z-index", 10);
	$("#avatarWindow").css("z-index", 11);
  });

  let loadingScreenStateChange = function () {
	if ($(this).attr("id") == "loadingScreen") {
	  if ($(this).hasClass("hidden")) {
		$("#custom-background").css("z-index", -1);
	  } else {
		$("#custom-background").css("z-index", 10);
	  }
	}
  }

  extend($, "addClass", loadingScreenStateChange);
  extend($, "removeClass", loadingScreenStateChange);
}
