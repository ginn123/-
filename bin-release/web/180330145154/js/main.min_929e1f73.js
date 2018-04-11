var __reflect=this&&this.__reflect||function(e,t,r){e.__class__=t,r?r.push(t):r=[t],e.__types__=e.__types__?r.concat(e.__types__):r},__extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);r.prototype=t.prototype,e.prototype=new r},__awaiter=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))(function(n,s){function o(e){try{h(i.next(e))}catch(t){s(t)}}function a(e){try{h(i["throw"](e))}catch(t){s(t)}}function h(e){e.done?n(e.value):new r(function(t){t(e.value)}).then(o,a)}h((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function r(e){return function(t){return i([e,t])}}function i(r){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,s&&(o=s[2&r[0]?"return":r[0]?"throw":"next"])&&!(o=o.call(s,r[1])).done)return o;switch(s=0,o&&(r=[0,o.value]),r[0]){case 0:case 1:o=r;break;case 4:return h.label++,{value:r[1],done:!1};case 5:h.label++,s=r[1],r=[0];continue;case 7:r=h.ops.pop(),h.trys.pop();continue;default:if(o=h.trys,!(o=o.length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){h=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){h.label=r[1];break}if(6===r[0]&&h.label<o[1]){h.label=o[1],o=r;break}if(o&&h.label<o[2]){h.label=o[2],h.ops.push(r);break}o[2]&&h.ops.pop(),h.trys.pop();continue}r=t.call(e,h)}catch(i){r=[6,i],s=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var n,s,o,a,h={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:r(0),"throw":r(1),"return":r(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,r){function i(i){t.call(r,i,e)}if(RES.hasRes(e)){var n=RES.getRes(e);n?i(n):RES.getResAsync(e,i,this)}else RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var endLayer=function(e){function t(t){var r=e.call(this)||this;return r.addEventListener(egret.Event.ADDED_TO_STAGE,r.OnAddToStage,r),r.count=t,r}return __extends(t,e),t.prototype.OnAddToStage=function(e){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this),this.bg.startTitle.text="Game Over!",this.bg.startTitle.textColor=16711680,this.bg.startButton.y+=150;var t=new eui.Label;t.text="得分："+this.count,t.width=640,t.y=300,t.x=200,t.size=50,this.addChild(t),this.bg.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this)},t.prototype.tap=function(){this.bg.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this),this.removeChildren(),this.bg.removeChildren(),this.addChild(this.bg.gaming)},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(endLayer.prototype,"endLayer",["eui.UIComponent","egret.DisplayObject"]);var enemy=function(e){function t(){var t=e.call(this)||this;return t.barriers=[],t.barrierBullets=[],t.dictplane=[],t.dictbullet=[],t.fireDelay=2e3,t.barrierDelay=2e3,t.createBarrierTimer=new egret.Timer(t.barrierDelay),t.fireTimer=new egret.Timer(t.fireDelay),t._lastTime=egret.getTimer(),t._PlastTime=egret.getTimer(),t.addEventListener(egret.Event.ADDED_TO_STAGE,t.OnAddToStage,t),t}return __extends(t,e),t.prototype.OnAddToStage=function(e){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this),this.removeChildren(),this.barriers=[],this.barrierBullets=[],this.dictplane=[],this.dictbullet=[],this.createBarrierTimer.addEventListener(egret.TimerEvent.TIMER,this.createBarrier,this),this.createBarrierTimer.start(),this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this),this.fireTimer.start()},t.prototype.createBarrier=function(e){var t;t=this.produceplane(),t.x=578*Math.random(),t.y=150+350*Math.random(),this.addChildAt(t,this.numChildren-1),this.barriers.push(t),this.addEventListener(egret.Event.ENTER_FRAME,this.barrierMove,this)},t.prototype.produceplane=function(){var e=new eui.Image;return this.dictplane.length>0?e=this.dictplane.pop():e.source="resource/assets/f2.png",e},t.prototype.reclaimplane=function(e){-1==this.dictplane.indexOf(e)&&this.dictplane.push(e)},t.prototype.barrierMove=function(e){var t=egret.getTimer(),r=1e3/(t-this._PlastTime);this._PlastTime=t;for(var i,n=60/r,s=0,o=this.barriers.length,a=[];o>s;s++)i=this.barriers[s],i.y+=.5*n,i.y+i.height>1136&&a.push(i);for(s=0;s<a.length;s++)i=a[s],this.removeChild(i),this.reclaimplane(i),this.barriers.splice(this.barriers.indexOf(i),1)},t.prototype.createBullet=function(e){for(var t,r,i=this.barriers.length,n=0;i>n;n++)t=this.barriers[n],r=this.produceBullet(),r.x=t.x+t.width/2-r.width/2,r.y=t.y+t.height,this.addChildAt(r,this.numChildren-1),this.barrierBullets.push(r);this.addEventListener(egret.Event.ENTER_FRAME,this.bulletMove,this)},t.prototype.produceBullet=function(){var e=new eui.Image;return this.dictbullet.length>0?e=this.dictbullet.pop():e.source="resource/assets/b2.png",e},t.prototype.reclaimBullet=function(e){-1==this.dictbullet.indexOf(e)&&this.dictbullet.push(e)},t.prototype.bulletMove=function(e){var t=egret.getTimer(),r=1e3/(t-this._lastTime);this._lastTime=t;for(var i,n=60/r,s=0,o=this.barrierBullets.length,a=[];o>s;s++)i=this.barrierBullets[s],i.y+=10*n,i.y>1136&&a.push(i);for(s=0;s<a.length;s++)i=a[s],this.getChildIndex(i)>0&&this.removeChild(i),this.reclaimBullet(i),this.barrierBullets.splice(this.barrierBullets.indexOf(i),1)},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(enemy.prototype,"enemy",["eui.UIComponent","egret.DisplayObject"]);var gameLayer=function(e){function t(){var t=e.call(this)||this;return t.count=0,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.OnAddToStage,t),t}return __extends(t,e),t.prototype.OnAddToStage=function(e){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this),this.addEventListener(egret.Event.ENTER_FRAME,this.changeScore,this),this.addEventListener(egret.Event.ENTER_FRAME,this.HitTest,this)},t.prototype.HitTest=function(e){var t,r,i,n,s,o=[];for(t=0;t<this.MyPlane.myBs.length;t++)for(i=this.MyPlane.myBs[t],r=0;r<this.enemy.barriers.length;r++)i.x>=this.enemy.barriers[r].x&&i.x<=this.enemy.barriers[r].x+this.enemy.barriers[r].width&&i.y>=this.enemy.barriers[r].y&&i.y<=this.enemy.barriers[r].y+this.enemy.barriers[r].height&&(this.enemy.getChildIndex(this.enemy.barriers[r])>=0&&(this.enemy.removeChild(this.enemy.barriers[r]),o.push(this.enemy.barriers[r])),this.count++,console.log("1111"));for(t=0;t<this.enemy.barrierBullets.length;t++)s=this.enemy.barrierBullets[t],s.x>this.MyPlane.myplane.x&&s.x<=this.MyPlane.myplane.x+this.MyPlane.myplane.width&&s.y+s.height>this.MyPlane.myplane.y&&s.y+s.height>this.MyPlane.myplane.y+this.MyPlane.myplane.height&&(console.log("2222"),console.log(this.MyPlane.x+"emmm"+this.MyPlane.y),this.gameover());for(t=0;t<o.length;t++){var a=o[t];this.enemy.reclaimplane(a),this.enemy.barriers.splice(this.enemy.barriers.indexOf(a),1)}for(t=0;t<this.enemy.barriers.length;t++)n=this.enemy.barriers[t],n.y+n.height>1e3&&(console.log("3333"),this.gameover())},t.prototype.gameover=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.HitTest,this),this.enemy.createBarrierTimer.stop(),this.enemy.fireTimer.stop(),this.enemy.fireTimer.stop(),this.enemy.removeEventListener(egret.Event.ENTER_FRAME,this.enemy.bulletMove,this),this.enemy.removeEventListener(egret.Event.ENTER_FRAME,this.enemy.barrierMove,this),this.MyPlane.removeEventListener(egret.Event.ENTER_FRAME,this.MyPlane.bulletMove,this),this.removeEventListener(egret.Event.ENTER_FRAME,this.changeScore,this),this.removeChildren();var e=new endLayer(this.count);this.addChild(e)},t.prototype.changeScore=function(e){console.log("count"+this.count),this.score.text="记分："+this.count},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(gameLayer.prototype,"gameLayer",["eui.UIComponent","egret.DisplayObject"]);var BgLayer=function(e){function t(){var t=e.call(this)||this;return t.bg1=new eui.Rect,t.bg2=new eui.Rect,t.bg3=new eui.Rect,t.bg4=new eui.Rect,t.bgArr=[],t.bgSpeed=3,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.OnAddToStage,t),t}return __extends(t,e),t.prototype.OnAddToStage=function(e){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this),this.bgArr.push(this.bg1),this.bgArr.push(this.bg2),this.bgArr.push(this.bg3),this.bgArr.push(this.bg4);for(var t=0;4>t;t++)this.addChild(this.bgArr[t]);this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},t.prototype.enterFrameHandler=function(e){for(var t=0;4>t;t++){var r=this.bgArr[t];r.y+=this.bgSpeed,r.y>1136&&(r.y=this.bgArr[0].y-this.bgArr[0].height,this.bgArr.pop(),this.bgArr.unshift(r))}},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(BgLayer.prototype,"BgLayer",["eui.UIComponent","egret.DisplayObject"]);var Main=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.startScene=new Start,t.gaming=new gameLayer,t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.loadResource()];case 1:return r.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=r.sent(),this.startAnimation(e),[4,platform.login()];case 3:return r.sent(),[4,platform.getUserInfo()];case 4:return t=r.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,this.loadTheme()];case 2:return r.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return r.sent(),this.stage.removeChild(e),[3,5];case 4:return t=r.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,r){var i=new eui.Theme("resource/default.thm.json",e.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){this.addChild(this.startScene)},t.prototype.startAnimation=function(e){},t}(eui.UILayer);__reflect(Main.prototype,"Main");var MyPlane=function(e){function t(){var t=e.call(this)||this;return t.myBs=[],t.dict=[],t.Bdelay=500,t.Btimer=new egret.Timer(t.Bdelay),t.offsetX=0,t.offsetY=0,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.OnAddToStage,t),t}return __extends(t,e),t.prototype.OnAddToStage=function(e){this.removeChildren(),this.myBs=[],this.dict=[],this._lastTime=egret.getTimer(),this.addChild(this.myplane),this.myplane.touchEnabled=!0,this.myplane.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this),this.addEventListener(egret.Event.ENTER_FRAME,this.bulletMove,this)},t.prototype.startMove=function(e){console.log("aaa"),this.offsetX=e.stageX-this.myplane.x,this.offsetX=e.stageY-this.myplane.y,this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onmove,this),this.Btimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this),this.Btimer.start()},t.prototype.stopMove=function(e){this.Btimer.stop()},t.prototype.onmove=function(e){console.log("onmove");var t=e.stageX-this.offsetX;0>t?this.myplane.x=0:(t=Math.min(e.stageX-this.offsetX,e.stageX-this.myplane.width),this.myplane.x=t)},t.prototype.createBullet=function(e){var t;t=this.produce(),t.x=this.myplane.x+(this.myplane.width/2-t.width/2),t.y=this.myplane.y-t.height/2,this.addChildAt(t,this.numChildren-1),this.myBs.push(t)},t.prototype.produce=function(){var e=new eui.Image;return this.dict.length>0?e=this.dict.pop():e.source="resource/assets/b1.png",e},t.prototype.reclaim=function(e){-1==this.dict.indexOf(e)&&this.dict.push(e)},t.prototype.bulletMove=function(e){var t=egret.getTimer(),r=1e3/(t-this._lastTime);this._lastTime=t;var i,n=60/r,s=0,o=[],a=this.myBs.length;for(s=0;a>s;s++)i=this.myBs[s],i.y-=12*n,i.y<0&&o.push(i);for(s=0;s<o.length;s++)i=o[s],this.getChildIndex(i)>0&&this.removeChild(i),this.reclaim(i),this.myBs.splice(this.myBs.indexOf(i),1)},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this),console.log("创建了子对象2")},t}(eui.Component);__reflect(MyPlane.prototype,"MyPlane",["eui.UIComponent","egret.DisplayObject"]);var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Start=function(e){function t(){var t=e.call(this)||this;return t.gaming=new gameLayer,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.OnAddToStage,t),t}return __extends(t,e),t.prototype.OnAddToStage=function(e){this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this)},t.prototype.tap=function(e){this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);var t=this.stage;this.stage.removeChildren(),t.addChild(new gameLayer)},t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(Start.prototype,"Start",["eui.UIComponent","egret.DisplayObject"]);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,r,i){function n(e){t.call(i,e)}function s(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),r.call(i))}"undefined"!=typeof generateEUI?egret.callLater(function(){t.call(i,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_TEXT))},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);