class endLayer extends eui.Component implements  eui.UIComponent {
	public constructor(count:number) {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
		this.count=count;
	}
	private bg:Start;
	private count:number;
	private OnAddToStage(e:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
		this.bg.startTitle.text="Game Over!";
		this.bg.startTitle.textColor=0xff0000;
		this.bg.startButton.y+=150;
 
		var txt:eui.Label=new eui.Label();
		txt.text="得分："+this.count;
		txt.width=640;
		txt.y=300;
		txt.x=200;
		txt.size=50;
		this.addChild(txt);

		this.bg.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
	}

	private tap():void
	{
		this.bg.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		this.removeChildren();
		this.bg.removeChildren();
		this.addChild(this.bg.gaming);
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