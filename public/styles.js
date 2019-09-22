// Most of this code was taken from https://github.com/amq-script-project/AMQ-Scripts/blob/master/design/amqBackground.user.js

let options = {
  images: [
	"https://images8.alphacoders.com/695/695848.png"
  ],
  video: {
	url: "https://desktophut-com.cdn.vidyome.com/videos/12-2018/kStWC5u7eyifonqthwFl.mp4", //another good one: "https://desktophut-com.cdn.vidyome.com/videos/04-2019/mySuBqs1CcijooCKJsOq.mp4"
	enabled: false, // no images with this
	filter: "none" // could be blur(3px) or "none" to deactivate
  },
  transparent: [
	{
	  selector: "div.lobbyAvatarImgContainer",
	  description: "dots in game lobby",
	  opacity: 0.7,
	  enabled: true
	},
	{
	  selector: "#mpDriveStatsContainer>.col-xs-6 .floatingContainer",
	  description: "avatar drive entries",
	  opacity: 0.5,
	  enabled: true,
	  css: `.mpDriveEntryName::after {
                      width: 0px;
                 }
                 .mpDriveEntry:nth-child(2n) {
                     background-color: rgba(27, 27, 27, 0.6) !important;
                 }
      `
	},
	{
	  selector: "#mpAvatarDriveContainer",
	  description: "dots in game lobby",
	  opacity: 0.5,
	  enabled: true
	},
	{
	  selector: ".qpAvatarImgContainer",
	  description: "backgound of avatar image in quiz",
	  enabled: true,
	  css: `.qpAvatarImgContainer {
                       box-shadow:none;
                   }`
	},
	{
	  selector: "#gameChatPage > .col-xs-9",
	  description: "quiz main screen",
	  enabled: true
	},
	{
      selector: "#gameChatContainer, .gcInputContainer, .gcList > li:nth-child(2n)",
	  description: "quiz chat",
	  enabled: true,
	  opacity: 0.5
	},
	{
      selector: ".rbRoom, .rbrRoomImageContainer",
	  description: "rooms to choose",
	  enabled: true,
	  opacity: 0.8,
	  css: `.rbrRoomImageContainer {
                      background-color: transparent !important;
                  }`
	},
	{
      selector: "#mainMenuSocailButton",
	  description: "friends/social button (bottom left)",
	  enabled: true
	},
	{
      selector: "#avatarUserImgContainer",
	  description: "avatar background (bottom right)",
	  enabled: true
	},
	{
      selector: ".topMenuBar",
	  description: "top menu",
	  enabled: true
	},
	{
	  selector: ".awSkinPreviewButtom, .awSkinPreview",
	  description: "unlock/change avatar preview",
	  enabled: true
	},
	{
	  selector: "#footerMenuBarBackground, #rightMenuBarPartContainer::before",
	  description: "bottom menu",
	  enabled: true
	},
	{
	  selector: "#mpPlayButton",
	  description: "play button main screen",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#mpExpandButton",
	  description: "expand button main screen",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#mpLeaderboardButton",
	  description: "leaderboard button main screen",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#mpAvatarDriveContainer, #mpAvatarDriveHeaderShadowHider .floatingContainer",
	  description: "avatar drive container main screen",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#mpDriveDonationContainer .button",
	  description: "avatar drive donate/faq buttons",
	  enabled: true
	},
	{
	  selector: "#mpDriveStatsContainer *",
	  description: "avatar drive entries",
	  enabled: false
	},
	{
	  selector: "#mpNewsContainer, #mpNewsTitleShadowHider div",
	  description: "news main menu",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#mpNewSocailTab .leftRightButtonTop, #mpPatreonContainer, .startPageSocailIcon",
	  description: "main menu black backgrounds near news",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#rbMajorFilters",
	  description: "game room top middle filters",
	  enabled: false
	},
	{
	  selector: "#roomBrowserHostButton",
	  description: "host room button",
	  enabled: false
	},
	{
	  selector: "#topMenuBack",
	  description: "top back button",
	  enabled: false
	},
	{
	  selector: "#qpAnimeContainer div:first-child .qpSideContainer",
	  description: "standings menu in quiz",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: ".qpAvatarInfoContainer > div, .qpAvatarAnswerContainer",
	  description: "name/guess near avatar image in quiz",
	  enabled: true,
	  opacity: 0.8,
	  css: `.qpAvatarInfoContainer > div {
                      box-shadow:none;
                  }`
	},
	{
	  selector: "#qpInfoHider, .col-xs-6 + .col-xs-3 .container.qpSideContainer.floatingContainer, .col-xs-3 .qpSingleRateContainer",
	  description: "song info in quiz",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#qpAnimeNameHider, .qpAnimeNameContainer, #qpCounter",
	  description: "anime name answer top menu in quiz",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#qpVideoHider, #qpVideoOverflowContainer",
	  description: "video counter/sound only background",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#socailTabFooter > .selected, #socialTab",
	  description: "friends online menu",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: ".lobbyAvatarTextContainer",
	  description: "username/level text lobby",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#startPageCenter",
	  description: "login screen",
	  enabled: true,
	  opacity: 0.5
	},
	{
	  selector: "#startPageLogoContainer",
	  description: "login screen logo",
	  enabled: true,
	  opacity: 0.5
	}
  ]
}

let transparents = options.transparent.filter(opt => opt.enabled);

let template = $(`<div id="custom-background"></div>`);

if (options.video.enabled) {
  template.append(`<video autoplay loop muted><source src="${options.video.url}"></video>`);
} else {
  images = [""]
}

$("#mainContainer").append(template);

let loggedIn = window.QuizInfoContainer != null;

const gameCss = document.createElement('script');
gameCss.src = chrome.runtime.getURL('gameCss.js');
gameCss.onload = function() { this.remove(); };
document.head.appendChild(gameCss);

const style = document.createElement('style');
style.innerHTML = `

:root {
  --url: url("${options.images[0]}");
}

${transparents.map(obj => `
  ${obj.selector} {
    background-color: rgba(${obj.color || "27, 27, 27"}, ${obj.opacity || 0}) !important;
    background-image: none !important;
  }
  ${obj.css || ''}
  `).join('\n')}


.leftShadowBorder, #currencyContainer, #menuBarOptionContainer, #awContentRow .rightShadowBorder {
    box-shadow:none;
}

#socialTab:not(.open), #optionsContainer:not(.open) {
    display:none;
}

#mainMenuSocailButton, #avatarUserImgContainer {
    border:none !important;
}

#optionsContainer li {
    background-color:#424242 !important;
}

#rbMajorFilters {
    background-color: #1b1b1b;
    padding-left: 10px;
}

#custom-background {
    position: absolute;
    left: 0%;
    top: 0%;
    /* The following will size the video to fit the full container. Not necessary, just nice.*/
    min-width: 100%;
    min-height: 100%;
    /*
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);*/
    z-index: ${loggedIn ? 5 : -1};
    filter: ${options.video.filter};
    will-change: contents;
    background-image: var(--url) !important;
    background-size: 100% auto !important;
    background-attachment: fixed !important;
    background-position: 0px !important;
}

#mainContainer > *, #awMainView, #avatarWindow, #startPage, #loadingScreen {
    background: none;
}
`;

document.head.appendChild(style)
