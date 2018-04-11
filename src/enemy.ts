class enemy extends eui.Component implements  eui.UIComponent {

	public constructor() {
		super();
		this._lastTime = egret.getTimer();
        this._PlastTime = egret.getTimer();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
	}


	public barriers:eui.Image[]=[]; //敌机数组
	public barrierBullets:eui.Image[]=[];  //敌机子弹数组
	private dictplane:eui.Image[]=[];
	private dictbullet:eui.Image[]=[]; //子弹和飞机的生产回收数组

    private fireDelay:number=2000; //创建子弹间隔
    private barrierDelay:number=2000; //创建飞机间隔

    public createBarrierTimer:egret.Timer=new egret.Timer(this.barrierDelay); //创建敌机的间隔
    public fireTimer:egret.Timer=new egret.Timer(this.fireDelay); //创建子弹间隔	
    private _PlastTime:number; //飞机子弹的下落速度计算
    private _lastTime:number;  



	private OnAddToStage(e:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);

		this.removeChildren();
        this.barriers=[];
        this.barrierBullets=[];
        this.dictplane=[];
        this.dictbullet=[];

		this.createBarrierTimer.addEventListener(egret.TimerEvent.TIMER,this.createBarrier,this);
        this.createBarrierTimer.start();  //根据创建敌机的时间间隔，监听并建立飞机

        this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
        this.fireTimer.start()

	}	

	private createBarrier(e:egret.TimerEvent):void  //创建随机位置的飞机
    {
        var plane:eui.Image;
        plane=this.produceplane();
        plane.x=Math.random()*(640-62);
        plane.y=150+Math.random()*350; 
        this.addChildAt(plane,this.numChildren-1); //显示
        this.barriers.push(plane); //飞机数组，便于运动和删除        
        this.addEventListener(egret.Event.ENTER_FRAME,this.barrierMove,this);
    }

	public  produceplane():eui.Image   //生产飞机对象
    {
   
		var tmp:eui.Image=new eui.Image();
        if(this.dictplane.length>0)
        {
            tmp=this.dictplane.pop();
        }
        else
        {
			tmp.source="resource/assets/f2.png";
        }
        return tmp;

    }

    public  reclaimplane(barrier:eui.Image):void  //回收飞机对象
    {
        if(this.dictplane.indexOf(barrier)==-1)
            this.dictplane.push(barrier);
    }

	public barrierMove(e:egret.Event):void  //飞机按时下落机制
    {

        
        var nowTime:number=egret.getTimer();
        var fps:number = 1000/(nowTime-this._PlastTime);
        this._PlastTime = nowTime;
        var speedOffset:number = 60/fps;

        var i:number=0;
        var plane:eui.Image;
        var myBarriersCount:number=this.barriers.length;
        var delArr:any[]=[];

        for(;i<myBarriersCount;i++)
        {
            plane=this.barriers[i];
            plane.y += 0.5*speedOffset;   
            if(plane.y+plane.height>1136)
                delArr.push(plane);
        }
        for(i=0;i<delArr.length;i++)
        {
            plane=delArr[i];
            this.removeChild(plane);
            this.reclaimplane(plane);
            this.barriers.splice(this.barriers.indexOf(plane),1);
        }

    }

private createBullet(e:egret.TimerEvent):void  //每有一个新飞机，都要有对应的 子弹组
{
     
    var enemyplane:eui.Image;
	var bullet:eui.Image;
    var barrierCount:number=this.barriers.length;

    for(var i:number=0;i<barrierCount;i++)
    {
        enemyplane=this.barriers[i];
        bullet=this.produceBullet(); 
        bullet.x=enemyplane.x+enemyplane.width/2-bullet.width/2;
        bullet.y=enemyplane.y+enemyplane.height;      
        this.addChildAt(bullet,this.numChildren-1);
        this.barrierBullets.push(bullet);
    }

    this.addEventListener(egret.Event.ENTER_FRAME,this.bulletMove,this);
}

public  produceBullet():eui.Image   //生产子弹对象
    {
    
		var tmp:eui.Image=new eui.Image();
        if(this.dictbullet.length>0)
        {
            tmp=this.dictbullet.pop();
        }
        else
        {
            tmp.source="resource/assets/b2.png";
        }
        return tmp;

    }

public  reclaimBullet(bullet:eui.Image):void  //回收子弹对象
{
    if(this.dictbullet.indexOf(bullet)==-1)
        this.dictbullet.push(bullet);
}

public bulletMove(e:egret.Event):void
{
	var nowTime:number=egret.getTimer();
    var fps:number = 1000/(nowTime-this._lastTime);
    this._lastTime = nowTime;
    var speedOffset:number = 60/fps;

    var i:number=0;
    var bullet:eui.Image;
    var myBulletsCount:number=this.barrierBullets.length;
    var delArr:any[]=[];

    for(;i<myBulletsCount;i++)
    {
        bullet=this.barrierBullets[i];
        bullet.y += 10*speedOffset;
        if(bullet.y>1136)
        {
            delArr.push(bullet);
        }
                
    }

    for(i=0;i<delArr.length;i++)
    {
        bullet=delArr[i];
        if(this.getChildIndex(bullet)>0)
        	this.removeChild(bullet);
        this.reclaimBullet(bullet);
        this.barrierBullets.splice(this.barrierBullets.indexOf(bullet),1);
    }
}


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}