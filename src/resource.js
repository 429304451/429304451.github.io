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

    gpu1: "res/img2/gpu/Shaders/default.fsh",
    gpu2: "res/img2/gpu/Shaders/default.vsh",
    gpu_wo: "res/img2/gpu/wo.png",

    heart1: "res/img2/gpu/Shaders/example_Heart.fsh",
    heart2: "res/img2/gpu/Shaders/example_Heart.vsh",

    tree1: "res/img2/gameplay/magicball3.png",
    s_fire: "res/img2/gameplay/fire.png",
    bar: "res/img2/bar.png",
    // cocosui
    cocosui_green_edit: "res/img2/cocosui/green_edit.png",
    cocosui_scrollviewbg: "res/img2/cocosui/scrollviewbg.png",
    cocosui_b1: "res/img2/cocosui/UITest/b1.png",
    cocosui_f1: "res/img2/cocosui/UITest/f1.png",
    cocosui_r1: "res/img2/cocosui/UITest/r1.png",
    cocosui_sliderProgress: "res/img2/cocosui/sliderProgress.png",
    cocosui_sliderTrack: "res/img2/cocosui/sliderTrack.png",
    cocosui_sliderThumb: "res/img2/cocosui/sliderThumb.png",

    // bomb
    bomb_anniu1: "res/img2/puchengBomb/btn/anniu1.png",
    bomb_green: "res/img2/puchengBomb/btn/green.png",
    bomb_lan: "res/img2/puchengBomb/btn/lan.png",
    bomb_red: "res/img2/puchengBomb/btn/red.png",
    bomb_tuichu: "res/img2/puchengBomb/btn/tuichu.png",
    bomb_liebiao: "res/img2/puchengBomb/btn/liebiao.png",
    // noiseCloud
    gpu_noiseCloud1: "res/img2/gpu/Shaders/noiseCloud.fsh",
    gpu_noiseCloud2: "res/img2/gpu/Shaders/noiseCloud.vsh",

    noise_256: "res/img2/gpu/noise_256.png",
    noise_512: "res/img2/gpu/noise_512.png",
    noise_1024: "res/img2/gpu/noise_1024.png",
    // simple
    gpu_simple1: "res/img2/gpu/simple/simple1.fsh",
    gpu_simple2: "res/img2/gpu/simple/simple2.fsh",
    gpu_simple3: "res/img2/gpu/simple/simple3.fsh",
    gpu_bin1: "res/img2/gpu/bin/bin1.fsh",
    gpu_bin2: "res/img2/gpu/bin/bin2.fsh",
    // gp
    gp_grossini: "res/img2/gpu/grossini.png",

    json1: "res/csb/mMatch/match1_center.json",
};

var jsListDump = [
    "Default/Button_Disable.png",
    "res/csb/grabredlords_game/wangzha.json",
    "res/csb/mMatch/match1_center.json",
    "res/csb/SingleGame/tongbiniuniu.json",
    "res/img2/btn/gouxuan.png",
    "res/img2/btn/xuanzhongkuang.png",
    "res/img2/desk/1.jpg",
    "res/img2/font/MSYH.TTF",
    "res/img2/niuniu/bg.jpg",
    "res/img2/niuniu/cell_frame.png",
    "res/img2/niuniu/clock.png",
    "res/img2/niuniu/face_frame_h.png",
    "res/img2/niuniu/face_frame_v.png",
    "res/img2/niuniu/rule_h.png",
    "res/img2/niuniu/rule_n.png",
    "res/img2/playerInfo/_0008_wenben.png",
    "res/img2/playerInfo/_0022_diban.png",
    "res/img2/puchengBomb/btn/green.png",
    "res/img2/puchengBomb/btn/lan.png",
    "res/img2/puchengBomb/btn/red.png",
];
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in cRes) {
    g_resources.push(cRes[i]);
}
for (var i in jsListDump) {
    g_resources.push(jsListDump[i]);
}

