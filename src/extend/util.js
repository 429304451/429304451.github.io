//工具类
var util = {};

// 找到两个不同节点的相对相差位置 
util.moveToOtherWordPoint = function(mNode, toNode) {
	// var oPos = cc.p(toNode:getPositionX(), toNode:getPositionY())
	var oPos = toNode.getPosition();
    oPos = toNode.getParent().convertToWorldSpace(oPos);
    // ### 两者相差
    var sPos = mNode.getParent().convertToNodeSpace(oPos);
    return sPos;
}