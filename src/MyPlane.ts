class MyPlane extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
		// this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.OnAddToStage,this);
	}

	public myplane:eui.Image;
	public myBs:eui.Image[]=[];//子弹数组
	private dict:eui.Image[]=[];//生产回收数组
	private Bdelay:number=500;
	private Btimer:egret.Timer=new egret.Timer(this.Bdelay);
	private _lastTime:number;
	public offsetX:number=0;
    public offsetY:number=0;

	private OnAddToStage(e:egret.Event):void
	{
		this.removeChildren();
		this.myBs=[];
		this.dict=[];
		this._lastTime = egret.getTimer();
		
		//this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
		
		this.addChild(this.myplane);  
		this.myplane.touchEnabled=true; //飞机可以触控
		this.myplane.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);

		this.addEventListener(egret.Event.ENTER_FRAME,this.bulletMove,this); 

	}

	private startMove(e:egret.TouchEvent):void   //检测触摸
    {
      
		console.log("aaa");
        this.offsetX=e.stageX-this.myplane.x;
        this.offsetX=e.stageY-this.myplane.y;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onmove,this);

        this.Btimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
        this.Btimer.start();    //手碰上了不移动，也可以发射子弹            
    }

	private stopMove(e:egret.TouchEvent):void //移动停止，手指离开
    {
		 //this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onmove,this);
         this.Btimer.stop();
    }

    private onmove(e:egret.TouchEvent):void  //手指移动
    {
        console.log("onmove");
		var x=e.stageX-this.offsetX;
    	if(x<0)
        {
            this.myplane.x=0;
        }
        else
        {
            x=Math.min(e.stageX-this.offsetX,e.stageX-this.myplane.width)
            this.myplane.x=x;
        }
           
	}

	private createBullet(e:egret.TimerEvent):void
	{
		var bullet:eui.Image;
		bullet=this.produce();
		bullet.x=this.myplane.x+(this.myplane.width/2-bullet.width/2);
        bullet.y=this.myplane.y-bullet.height/2;

		this.addChildAt(bullet,this.numChildren-1);  //子弹显示
        this.myBs.push(bullet);

		//每帧控制子弹动画,包括边界控制
	}

	 public produce():eui.Image  //生产
    {
           
		var tmp:eui.Image=new eui.Image();
        if(this.dict.length>0)
        {
            tmp=this.dict.pop(); //若存在则直接给
        }
        else
        {
            tmp.source="resource/assets/b1.png";
        }
        return tmp;
    }

    public reclaim(bullet:eui.Image):void  //回收
    {
        if(this.dict.indexOf(bullet)==-1)
        	this.dict.push(bullet);
    }

	 public bulletMove(e:egret.Event)
    {
           //？？？为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime:number=egret.getTimer();
        var fps:number = 1000/(nowTime-this._lastTime);
        this._lastTime = nowTime;
        var speedOffset:number = 60/fps;

		var i:number=0;
		var bullet:eui.Image;
		var delArr:any[]=[];
		var myBsLength:number=this.myBs.length;

		for(i=0;i<myBsLength;i++)
		{
			bullet=this.myBs[i];
			bullet.y -= 12*speedOffset;
			if(bullet.y < 0)
				delArr.push(bullet);
		}

		for(i=0;i<delArr.length;i++)
		{
			bullet=delArr[i];
            if(this.getChildIndex(bullet)>0)
                this.removeChild(bullet);
            this.reclaim(bullet);
            this.myBs.splice(this.myBs.indexOf(bullet),1);
		}
	}
	

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		console.log("创建了子对象2");

	}

	// protected createChildren(){
	// 	super.createChildren();
	// 	console.log("创建了子对象");
	// 	this.myplane.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this);
	// }
	
}