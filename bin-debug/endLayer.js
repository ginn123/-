var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var endLayer = (function (_super) {
    __extends(endLayer, _super);
    function endLayer(count) {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddToStage, _this);
        _this.count = count;
        return _this;
    }
    endLayer.prototype.OnAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddToStage, this);
        this.bg.startTitle.text = "Game Over!";
        this.bg.startTitle.textColor = 0xff0000;
        this.bg.startButton.y += 150;
        var txt = new eui.Label();
        txt.text = "得分：" + this.count;
        txt.width = 640;
        txt.y = 300;
        txt.x = 200;
        txt.size = 50;
        this.addChild(txt);
        this.bg.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    };
    endLayer.prototype.tap = function () {
        this.bg.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        this.removeChildren();
        this.bg.removeChildren();
        this.addChild(this.bg.gaming);
    };
    endLayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    endLayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return endLayer;
}(eui.Component));
__reflect(endLayer.prototype, "endLayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=endLayer.js.map