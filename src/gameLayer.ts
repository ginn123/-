class gameLayer extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
	}

	private BgLayer:BgLayer;
	private score:eui.Label;
	private MyPlane:MyPlane;
	public count:number=0;
	private enemy:enemy;
	
	private OnAddToStage(e:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
		this.addEventListener(egret.Event.ENTER_FRAME,this.changeScore,this);
		this.addEventListener(egret.Event.ENTER_FRAME,this.HitTest,this);	
	}

public HitTest(e:egret.Event):void  //游戏碰撞检测
{
    var i:number,j:number;
    var mypplane:eui.Image;
    var myBullet:eui.Image;
    var enemyPlane:eui.Image;
    var enemyBullet:eui.Image;


    var delBullets:eui.Image[]=[];
    var delPlanes:eui.Image[]=[];

 	//我方子弹与敌方飞机相撞，游戏可以继续
    //回收敌方飞机和子弹,在数组中删除，在显示列表中remove
    for(i=0;i<this.MyPlane.myBs.length;i++)
    {
        myBullet=this.MyPlane.myBs[i];
  
        for(j=0;j<this.enemy.barriers.length;j++)
        {
        
            if((myBullet.x >= this.enemy.barriers[j].x) && (myBullet.x <= this.enemy.barriers[j].x+this.enemy.barriers[j].width) && (myBullet.y>=this.enemy.barriers[j].y) && (myBullet.y<=this.enemy.barriers[j].y+this.enemy.barriers[j].height))
            {
                if(this.enemy.getChildIndex(this.enemy.barriers[j])>=0)
                {
                    this.enemy.removeChild(this.enemy.barriers[j]); //在显示列表中删除飞机
                    delPlanes.push(this.enemy.barriers[j]);
                }
                this.count++;
				console.log("1111");

            }
        }
    }

    //敌方子弹碰到我方飞机，游戏结束
    for(i=0;i<this.enemy.barrierBullets.length;i++)
    {
       
        enemyBullet=this.enemy.barrierBullets[i];

        if((enemyBullet.x>this.MyPlane.myplane.x)&&(enemyBullet.x<=this.MyPlane.myplane.x+this.MyPlane.myplane.width)&&(enemyBullet.y+enemyBullet.height>this.MyPlane.myplane.y)&&(enemyBullet.y+enemyBullet.height>this.MyPlane.myplane.y+this.MyPlane.myplane.height))
        {
            console.log("2222");
			console.log(this.MyPlane.x+"emmm"+this.MyPlane.y);
			this.gameover();
        }

    }

    for(i=0;i<delPlanes.length;i++)  //在数组中删除飞机,回收
    {
        
        var tmp:eui.Image=delPlanes[i];
        this.enemy.reclaimplane(tmp); //回收飞机
        this.enemy.barriers.splice(this.enemy.barriers.indexOf(tmp),1);
    }

    //敌方飞机碰到边界，游戏结束
    for(i=0;i<this.enemy.barriers.length;i++)
    {
        enemyPlane=this.enemy.barriers[i];
        if(enemyPlane.y+enemyPlane.height>1000)
        {
            console.log("3333");
			this.gameover();
        }
    }
}//end HitTest

public gameover():void
{
	var i:number=0;

	this.removeEventListener(egret.Event.ENTER_FRAME,this.HitTest,this);
	this.enemy.createBarrierTimer.stop();
    this.enemy.fireTimer.stop();
    this.enemy.fireTimer.stop();
	this.enemy.removeEventListener(egret.Event.ENTER_FRAME,this.enemy.bulletMove,this);
    this.enemy.removeEventListener(egret.Event.ENTER_FRAME,this.enemy.barrierMove,this);
    this.MyPlane.removeEventListener(egret.Event.ENTER_FRAME,this.MyPlane.bulletMove,this);
	
    this.removeEventListener(egret.Event.ENTER_FRAME,this.changeScore,this);

	this.removeChildren();

	var abc:endLayer=new endLayer(this.count);

	this.addChild(abc);
}

	private changeScore(e:egret.Event):void
	{
		console.log("count"+this.count);
		this.score.text="记分："+this.count;
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