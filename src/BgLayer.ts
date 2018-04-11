class BgLayer extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
	}

	private bg1:eui.Rect=new eui.Rect();
	private bg2:eui.Rect=new eui.Rect();
	private bg3:eui.Rect=new eui.Rect();
	private bg4:eui.Rect=new eui.Rect();
	private bgArr:eui.Rect[]=[];
	private bgSpeed=3;

	private OnAddToStage(e:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
		this.bgArr.push(this.bg1);
		this.bgArr.push(this.bg2);
		this.bgArr.push(this.bg3);
		this.bgArr.push(this.bg4);
		for(var i:number=0;i<4;i++)
		{
			this.addChild(this.bgArr[i]);
		}

		this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}

	private enterFrameHandler(e:egret.Event):void
	{
		for(var i:number=0;i<4;i++)
        {
            var shp:eui.Rect=this.bgArr[i];  
            shp.y+=this.bgSpeed; //超出屏幕之后放入数组开头
            if(shp.y>1136)
            {
                shp.y=this.bgArr[0].y-this.bgArr[0].height;
                this.bgArr.pop();
                this.bgArr.unshift(shp);
            }
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