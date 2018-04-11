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
var MyPlane = (function (_super) {
    __extends(MyPlane, _super);
    function MyPlane() {
        var _this = _super.call(this) || this;
        _this.myBs = []; //子弹数组
        _this.dict = []; //生产回收数组
        _this.Bdelay = 500;
        _this.Btimer = new egret.Timer(_this.Bdelay);
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddToStage, _this);
        return _this;
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.OnAddToStage,this);
    }
    MyPlane.prototype.OnAddToStage = function (e) {
        this.removeChildren();
        this.myBs = [];
        this.dict = [];
        this._lastTime = egret.getTimer();
        //this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
        this.addChild(this.myplane);
        this.myplane.touchEnabled = true; //飞机可以触控
        this.myplane.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.bulletMove, this);
    };
    MyPlane.prototype.startMove = function (e) {
        console.log("aaa");
        this.offsetX = e.stageX - this.myplane.x;
        this.offsetX = e.stageY - this.myplane.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onmove, this);
        this.Btimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
        this.Btimer.start(); //手碰上了不移动，也可以发射子弹            
    };
    MyPlane.prototype.stopMove = function (e) {
        //this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onmove,this);
        this.Btimer.stop();
    };
    MyPlane.prototype.onmove = function (e) {
        console.log("onmove");
        var x = e.stageX - this.offsetX;
        if (x < 0) {
            this.myplane.x = 0;
        }
        else {
            x = Math.min(e.stageX - this.offsetX, e.stageX - this.myplane.width);
            this.myplane.x = x;
        }
    };
    MyPlane.prototype.createBullet = function (e) {
        var bullet;
        bullet = this.produce();
        bullet.x = this.myplane.x + (this.myplane.width / 2 - bullet.width / 2);
        bullet.y = this.myplane.y - bullet.height / 2;
        this.addChildAt(bullet, this.numChildren - 1); //子弹显示
        this.myBs.push(bullet);
        //每帧控制子弹动画,包括边界控制
    };
    MyPlane.prototype.produce = function () {
        var tmp = new eui.Image();
        if (this.dict.length > 0) {
            tmp = this.dict.pop(); //若存在则直接给
        }
        else {
            tmp.source = "resource/assets/b1.png";
        }
        return tmp;
    };
    MyPlane.prototype.reclaim = function (bullet) {
        if (this.dict.indexOf(bullet) == -1)
            this.dict.push(bullet);
    };
    MyPlane.prototype.bulletMove = function (e) {
        //？？？为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        var i = 0;
        var bullet;
        var delArr = [];
        var myBsLength = this.myBs.length;
        for (i = 0; i < myBsLength; i++) {
            bullet = this.myBs[i];
            bullet.y -= 12 * speedOffset;
            if (bullet.y < 0)
                delArr.push(bullet);
        }
        for (i = 0; i < delArr.length; i++) {
            bullet = delArr[i];
            if (this.getChildIndex(bullet) > 0)
                this.removeChild(bullet);
            this.reclaim(bullet);
            this.myBs.splice(this.myBs.indexOf(bullet), 1);
        }
    };
    MyPlane.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MyPlane.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        console.log("创建了子对象2");
    };
    return MyPlane;
}(eui.Component));
__reflect(MyPlane.prototype, "MyPlane", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MyPlane.js.map