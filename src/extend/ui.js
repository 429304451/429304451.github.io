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
	// return ccs.load(path, "");
	return ccs.load(path, "").node;
};

ui.setNodeMap = function(node, tbl) {
	if (node == null) {
		return;
	};
	var childCount = node.getChildrenCount();
	if (childCount < 1) {
		return;
	};
	var children = node.getChildren();

	for (var i = 0; i < childCount; i++) {
		if (typeof children == "object") {
			tbl[children[i]._name] = children[i]
			ui.setNodeMap(children[i], tbl)
		}
	};

};
