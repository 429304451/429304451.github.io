
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

    "src/MainScene/hall.js", // 大厅入口
    "src/Shaders/10002WenYu.js",
    "src/Shaders/ShaderCommon.js",
    "src/Shaders/noiseCloud.js",

    "src/Imagination/10003BranchGrowth.js",

    "src/MainScene/try1.js",

];

if (typeof module != "undefined") {
    module.exports.jsListFramework = jsListFramework;
    module.exports.jsListGame = jsListGame;
};