
var jsListFramework = [
    "src/extend/define.js",
	"src/extend/Storage.js",
    "src/extend/CCNodeExtend.js",
    "src/extend/Sound.js",

    "src/extend/Toast.js",
    "src/extend/Utils.js",

    "src/extend/core/ClientKernel.js",
];

var jsListGame = [
    "src/resource.js",
    "src/app.js",

    "src/Shaders/10002WenYu.js"
];

if (typeof module != "undefined") {
    module.exports.jsListFramework = jsListFramework;
    module.exports.jsListGame = jsListGame;
};