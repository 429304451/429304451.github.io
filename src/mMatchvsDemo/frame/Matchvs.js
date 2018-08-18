// var engine;
// var response = {};
// var MsMatchInfo;
// var MsCreateRoomInfo;
// var MsRoomFilterEx;
// var LocalStore_Clear;
// try {
// 	console.log("load matchvs JSB  a ");
//     engine = Matchvs.MatchvsEngine.getInstance();
// 	console.log("load matchvs JSB  a1 ");
//     MsMatchInfo = Matchvs.MatchInfo;
// 	console.log("load matchvs JSB  a2 ");
//     MsCreateRoomInfo = Matchvs.CreateRoomInfo;
// 	console.log("load matchvs JSB  a3 ");
//     MsRoomFilterEx  = Matchvs.RoomFilterEx ;
// 	console.log("load matchvs JSB b ");
// } catch (e) {
// 	console.warn("load matchvs JSB fail,"+e.message);
//     try {
//         var jsMatchvs = require("matchvs.all");
//         engine = new jsMatchvs.MatchvsEngine();
//         response = new jsMatchvs.MatchvsResponse();
//         MsMatchInfo = jsMatchvs.MsMatchInfo;
//         MsCreateRoomInfo = jsMatchvs.MsCreateRoomInfo;
//         MsRoomFilterEx  = jsMatchvs.MsRoomFilterEx ;
//         LocalStore_Clear = jsMatchvs.LocalStore_Clear;
// 		console.log("load matchvs.all.js");
//     } catch (e) {
// 		console.warn("load matchvs.all.js fail,"+e.message);
//         var MatchVSEngine = require('MatchvsEngine');
// 		console.log("load matchvs test code");
//         engine = new MatchVSEngine();
//     }
// }
// module.exports = {
//     engine: engine,
//     response: response,
//     MsMatchInfo: MsMatchInfo,
//     MsCreateRoomInfo: MsCreateRoomInfo,
//     MsRoomFilterEx :MsRoomFilterEx ,
//     LocalStore_Clear:LocalStore_Clear,
// };

// var MatchvsEngine = window.MatchvsEngine;
// var MatchvsResponse = window.MatchvsResponse;
// var MsMatchInfo = window.MsMatchInfo;
// var MsCreateRoomInfo = window.MsCreateRoomInfo;
// var MsRoomFilterEx = window.MsRoomFilterEx;
// var LocalStore_Clear = window.LocalStore_Clear;

//定义了Matchvs网路事件
var matchvs_msg = {

    MATCHVS_INIT : "MATCHVS_INIT",
    MATCHVS_REGISTER_USER:"MATCHVS_REGISTER_USER",
    MATCHVS_LOGIN:"MATCHVS_LOGIN",
    MATCHVS_RE_CONNECT :"MATCHVS_RE_CONNECT",
    MATCHVS_ERROE_MSG : "MATCHVS_ERROE_MSG",
    MATCHVS_JOIN_ROOM_RSP : "MATCHVS_JOIN_ROOM_RSP",
    MATCHVS_JOIN_ROOM_NOTIFY:"MATCHVS_JOIN_ROOM_NOTIFY",
    MATCHVS_LEAVE_ROOM: "MATCHVS_LEAVE_ROOM",
    MATCHVS_LEAVE_ROOM_NOTIFY: "MATCHVS_LEAVE_ROOM_NOTIFY",
    MATCHVS_JOIN_OVER_RSP: "MATCHVS_JOIN_OVER_RSP",
    MATCHVS_JOIN_OVER_NOTIFY: "MATCHVS_JOIN_OVER_NOTIFY",
    MATCHVS_JOIN_OPEN_RSP: "MATCHVS_JOIN_OPEN_RSP",
    MATCHVS_JOIN_OPEN_NOTIFY: "MATCHVS_JOIN_OPEN_NOTIFY",
    MATCHVS_ROOM_LIST_EX: "MATCHVS_ROOM_LIST_EX",
    MATCHVS_CREATE_ROOM : "MATCHVS_CREATE_ROOM",
    MATCHVS_ROOM_DETAIL : "MATCHVS_ROOM_DETAIL",
    MATCHVS_KICK_PLAYER : "MATCHVS_KICK_PLAYER",
    MATCHVS_KICK_PLAYER_NOTIFY : "MATCHVS_KICK_PLAYER_NOTIFY",
    MATCHVS_SET_ROOM_PROPETY : "MATCHVS_SET_ROOM_PROPETY",
    MATCHVS_SET_ROOM_PROPETY_NOTIFY : "MATCHVS_SET_ROOM_PROPETY_NOTIFY",
    MATCHVS_SEND_EVENT_RSP : "MATCHVS_SEND_EVENT_RSP",
    MATCHVS_SEND_EVENT_NOTIFY : "MATCHVS_SEND_EVENT_NOTIFY",
    MATCHVS_FRAME_UPDATE : "MATCHVS_FRAME_UPDATE",
    MATCHVS_WX_BINDING: "MATCHVS_WX_BINDING",

    //对战类消息
    EVENT_GAME_START :"EVENT_GAME_START",
    NEW_STAR_POSITION : "NEW_STAR_POSITION",
    PLAYER_POSINTON : "PLAYER_POSINTON",
};




