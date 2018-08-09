var isChangweiTest = true
//设计分辨率
var ScreenContentSize = {
	width: 1280,
	height: 720
};
// 黑体 宋体 Arial
var GFontDef = {
    fontName: "黑体",
    fontSize: 31,
    // fillStyle: cc.color(66, 209, 244, 255)
};
var WIN_SIZE   = cc.director.getWinSize();
var WIN_Width  = WIN_SIZE.width;
var WIN_Height = WIN_SIZE.height;
var WIN_center = cc.p(WIN_Width/2, WIN_Height/2);
var WIN_left   = cc.p(0, WIN_Height/2);
var WIN_right  = cc.p(WIN_Width, WIN_Height/2);
var WIN_top    = cc.p(WIN_Width/2, WIN_Height);
var WIN_down   = cc.p(WIN_Width/2, 0);
var mRatio = WIN_Width/WIN_Height;

var V = {
    w: 1280,
    h: WIN_Height
};
// 全屏适配 只考虑 1.2-2.2范围之间
var _gm = {}
_gm.bgScaleH = WIN_Height/ScreenContentSize.height;

var SceneInCare = {};
SceneInCare[10000] = ["HelloWorldScene", "Hey 哈喽-我是你的第一个场景"]; // 第一个场景 helloWorld
SceneInCare[10001] = ["Wenyu",           "文煜的多页选框选择效果"];
SceneInCare[10002] = ["Try1_Scene",      "测试模板1"];


