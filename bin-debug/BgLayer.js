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
var BgLayer = (function (_super) {
    __extends(BgLayer, _super);
    function BgLayer() {
        var _this = _super.call(this) || this;
        _this.bg1 = new eui.Rect();
        _this.bg2 = new eui.Rect();
        _this.bg3 = new eui.Rect();
        _this.bg4 = new eui.Rect();
        _this.bgArr = [];
        _this.bgSpeed = 3;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddToStage, _this);
        return _this;
    }
    BgLayer.prototype.OnAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddToStage, this);
        this.bgArr.push(this.bg1);
        this.bgArr.push(this.bg2);
        this.bgArr.push(this.bg3);
        this.bgArr.push(this.bg4);
        for (var i = 0; i < 4; i++) {
            this.addChild(this.bgArr[i]);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    BgLayer.prototype.enterFrameHandler = function (e) {
        for (var i = 0; i < 4; i++) {
            var shp = this.bgArr[i];
            shp.y += this.bgSpeed; //超出屏幕之后放入数组开头
            if (shp.y > 1136) {
                shp.y = this.bgArr[0].y - this.bgArr[0].height;
                this.bgArr.pop();
                this.bgArr.unshift(shp);
            }
        }
    };
    BgLayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BgLayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return BgLayer;
}(eui.Component));
__reflect(BgLayer.prototype, "BgLayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BgLayer.js.map