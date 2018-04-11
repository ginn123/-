class Start extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.OnAddToStage,this);
	}

	public startTitle:eui.Label;
	public startButton:eui.Button;
	private startAuthor:eui.Label;
	private bg1:eui.Rect;
	private bg2:eui.Rect;
	private bg3:eui.Rect;

	public gaming:gameLayer=new gameLayer();

	private OnAddToStage(e:egret.Event):void
	{

		//this.startTitle.text="飞机示例"

		this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);	
	}


	private tap(e:egret.TouchEvent):void
	{
		this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		var x=this.stage;
		this.stage.removeChildren();//？？？this.removeChildren();
		x.addChild(new gameLayer());
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