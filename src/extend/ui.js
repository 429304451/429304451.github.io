//工具类
var ui = {};

ui.printCsError = function(path) {
	trace("-----------------------------------------------")
	trace("----------------!!!!!!!!!!!!!!!----------------")
	trace("  ")
	trace("Cs Create Error!!!!!! Cs File Not Found ："+path)
// 	if not postedLog[path] then
// 		postedLog[path] = true
// 		util.postLogToServer("Cs Create Error!!!!!! Cs File Not Found ："..path)
// 	end
	trace("  ")
	trace("----------------!!!!!!!!!!!!!!!----------------")
	trace("-----------------------------------------------")
};
	
ui.loadCS = function(path) {
	return ccs.load(path, "");
};
