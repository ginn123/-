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
var Start = (function (_super) {
    __extends(Start, _super);
    function Start() {
        var _this = _super.call(this) || this;
        _this.gaming = new gameLayer();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddToStage, _this);
        return _this;
    }
    Start.prototype.OnAddToStage = function (e) {
        //this.startTitle.text="飞机示例"
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    };
    Start.prototype.tap = function (e) {
        this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        var x = this.stage;
        this.stage.removeChildren(); //？？？this.removeChildren();
        x.addChild(new gameLayer());
    };
    Start.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Start.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Start;
}(eui.Component));
__reflect(Start.prototype, "Start", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Start.js.map