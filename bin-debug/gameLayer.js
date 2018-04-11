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
var gameLayer = (function (_super) {
    __extends(gameLayer, _super);
    function gameLayer() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnAddToStage, _this);
        return _this;
    }
    gameLayer.prototype.OnAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.OnAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.changeScore, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.HitTest, this);
    };
    gameLayer.prototype.HitTest = function (e) {
        var i, j;
        var mypplane;
        var myBullet;
        var enemyPlane;
        var enemyBullet;
        var delBullets = [];
        var delPlanes = [];
        //我方子弹与敌方飞机相撞，游戏可以继续
        //回收敌方飞机和子弹,在数组中删除，在显示列表中remove
        for (i = 0; i < this.MyPlane.myBs.length; i++) {
            myBullet = this.MyPlane.myBs[i];
            for (j = 0; j < this.enemy.barriers.length; j++) {
                if ((myBullet.x >= this.enemy.barriers[j].x) && (myBullet.x <= this.enemy.barriers[j].x + this.enemy.barriers[j].width) && (myBullet.y >= this.enemy.barriers[j].y) && (myBullet.y <= this.enemy.barriers[j].y + this.enemy.barriers[j].height)) {
                    if (this.enemy.getChildIndex(this.enemy.barriers[j]) >= 0) {
                        this.enemy.removeChild(this.enemy.barriers[j]); //在显示列表中删除飞机
                        delPlanes.push(this.enemy.barriers[j]);
                    }
                    this.count++;
                    console.log("1111");
                }
            }
        }
        //敌方子弹碰到我方飞机，游戏结束
        for (i = 0; i < this.enemy.barrierBullets.length; i++) {
            enemyBullet = this.enemy.barrierBullets[i];
            if ((enemyBullet.x > this.MyPlane.myplane.x) && (enemyBullet.x <= this.MyPlane.myplane.x + this.MyPlane.myplane.width) && (enemyBullet.y + enemyBullet.height > this.MyPlane.myplane.y) && (enemyBullet.y + enemyBullet.height > this.MyPlane.myplane.y + this.MyPlane.myplane.height)) {
                console.log("2222");
                console.log(this.MyPlane.x + "emmm" + this.MyPlane.y);
                this.gameover();
            }
        }
        for (i = 0; i < delPlanes.length; i++) {
            var tmp = delPlanes[i];
            this.enemy.reclaimplane(tmp); //回收飞机
            this.enemy.barriers.splice(this.enemy.barriers.indexOf(tmp), 1);
        }
        //敌方飞机碰到边界，游戏结束
        for (i = 0; i < this.enemy.barriers.length; i++) {
            enemyPlane = this.enemy.barriers[i];
            if (enemyPlane.y + enemyPlane.height > 1000) {
                console.log("3333");
                this.gameover();
            }
        }
    }; //end HitTest
    gameLayer.prototype.gameover = function () {
        var i = 0;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.HitTest, this);
        this.enemy.createBarrierTimer.stop();
        this.enemy.fireTimer.stop();
        this.enemy.fireTimer.stop();
        this.enemy.removeEventListener(egret.Event.ENTER_FRAME, this.enemy.bulletMove, this);
        this.enemy.removeEventListener(egret.Event.ENTER_FRAME, this.enemy.barrierMove, this);
        this.MyPlane.removeEventListener(egret.Event.ENTER_FRAME, this.MyPlane.bulletMove, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.changeScore, this);
        this.removeChildren();
        var abc = new endLayer(this.count);
        this.addChild(abc);
    };
    gameLayer.prototype.changeScore = function (e) {
        console.log("count" + this.count);
        this.score.text = "记分：" + this.count;
    };
    gameLayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    gameLayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return gameLayer;
}(eui.Component));
__reflect(gameLayer.prototype, "gameLayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=gameLayer.js.map