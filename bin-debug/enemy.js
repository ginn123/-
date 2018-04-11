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
var enemy = (function (_super) {
    __extends(enemy, _super);
    function enemy() {
        var _this = _super.call(this) || this;
        _this.barriers = []; //敌机数组
        _this.barrierBullets = []; //敌机子弹数组
        _this.dictplane = [];
        _this.dictbullet = []; //子弹和飞机的生产回收数组
        _this.fireDelay = 2000; //创建子弹间隔
        _this.barrierDelay = 2000; //创建飞机间隔
        _this.createBarrierTimer = new egret.Timer(_this.barrierDelay); //创建敌机的间隔
        _this.fireTimer = new egret.Timer(_this.fireDelay); //创建子弹间隔	
        _this._lastTime = egret.getTimer();
        _this._PlastTime = egret.getTimer();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddToStage, _this);
        return _this;
    }
    enemy.prototype.OnAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddToStage, this);
        this.removeChildren();
        this.barriers = [];
        this.barrierBullets = [];
        this.dictplane = [];
        this.dictbullet = [];
        this.createBarrierTimer.addEventListener(egret.TimerEvent.TIMER, this.createBarrier, this);
        this.createBarrierTimer.start(); //根据创建敌机的时间间隔，监听并建立飞机
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
        this.fireTimer.start();
    };
    enemy.prototype.createBarrier = function (e) {
        var plane;
        plane = this.produceplane();
        plane.x = Math.random() * (640 - 62);
        plane.y = 150 + Math.random() * 350;
        this.addChildAt(plane, this.numChildren - 1); //显示
        this.barriers.push(plane); //飞机数组，便于运动和删除        
        this.addEventListener(egret.Event.ENTER_FRAME, this.barrierMove, this);
    };
    enemy.prototype.produceplane = function () {
        var tmp = new eui.Image();
        if (this.dictplane.length > 0) {
            tmp = this.dictplane.pop();
        }
        else {
            tmp.source = "resource/assets/f2.png";
        }
        return tmp;
    };
    enemy.prototype.reclaimplane = function (barrier) {
        if (this.dictplane.indexOf(barrier) == -1)
            this.dictplane.push(barrier);
    };
    enemy.prototype.barrierMove = function (e) {
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._PlastTime);
        this._PlastTime = nowTime;
        var speedOffset = 60 / fps;
        var i = 0;
        var plane;
        var myBarriersCount = this.barriers.length;
        var delArr = [];
        for (; i < myBarriersCount; i++) {
            plane = this.barriers[i];
            plane.y += 0.5 * speedOffset;
            if (plane.y + plane.height > 1136)
                delArr.push(plane);
        }
        for (i = 0; i < delArr.length; i++) {
            plane = delArr[i];
            this.removeChild(plane);
            this.reclaimplane(plane);
            this.barriers.splice(this.barriers.indexOf(plane), 1);
        }
    };
    enemy.prototype.createBullet = function (e) {
        var enemyplane;
        var bullet;
        var barrierCount = this.barriers.length;
        for (var i = 0; i < barrierCount; i++) {
            enemyplane = this.barriers[i];
            bullet = this.produceBullet();
            bullet.x = enemyplane.x + enemyplane.width / 2 - bullet.width / 2;
            bullet.y = enemyplane.y + enemyplane.height;
            this.addChildAt(bullet, this.numChildren - 1);
            this.barrierBullets.push(bullet);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.bulletMove, this);
    };
    enemy.prototype.produceBullet = function () {
        var tmp = new eui.Image();
        if (this.dictbullet.length > 0) {
            tmp = this.dictbullet.pop();
        }
        else {
            tmp.source = "resource/assets/b2.png";
        }
        return tmp;
    };
    enemy.prototype.reclaimBullet = function (bullet) {
        if (this.dictbullet.indexOf(bullet) == -1)
            this.dictbullet.push(bullet);
    };
    enemy.prototype.bulletMove = function (e) {
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        var i = 0;
        var bullet;
        var myBulletsCount = this.barrierBullets.length;
        var delArr = [];
        for (; i < myBulletsCount; i++) {
            bullet = this.barrierBullets[i];
            bullet.y += 10 * speedOffset;
            if (bullet.y > 1136) {
                delArr.push(bullet);
            }
        }
        for (i = 0; i < delArr.length; i++) {
            bullet = delArr[i];
            if (this.getChildIndex(bullet) > 0)
                this.removeChild(bullet);
            this.reclaimBullet(bullet);
            this.barrierBullets.splice(this.barrierBullets.indexOf(bullet), 1);
        }
    };
    enemy.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    enemy.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return enemy;
}(eui.Component));
__reflect(enemy.prototype, "enemy", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=enemy.js.map