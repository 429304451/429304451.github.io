var cRes = {
	btnClick: "res/audio/Common_Panel_Dialog_Pop_Sound.mp3",
	bg1: "res/img2/desk/1.jpg",
	bg2: "res/img2/desk/2.jpg",
};
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    // 文煜的效果
    wen1: "res/img2/gpu/pangxie.png",
    wen2: "res/img2/gpu/Shaders/wenYu.fsh",
    wen3: "res/img2/gpu/Shaders/wenYu.vsh",
    wen4: "res/img2/gpu/frozen.png",
    wen5: "res/audio/kaka.mp3",
};




var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in cRes) {
    g_resources.push(cRes[i]);
}