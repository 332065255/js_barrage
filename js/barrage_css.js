var danmu_css=function(txt,index){
	this.text=txt;
	this.height=index*20;
	this.creatui();
};
danmu_css.prototype.move=function(){
//	this.left-=2;
//	this.dom.css('transform','translateX('+this.left+'px)')
};
danmu_css.prototype.x=function(){
	return this.left;
};
danmu_css.prototype.width=function(){
	return this.dom.width();
};
danmu_css.prototype.canDes=function(){
	if(Math.abs(this.left)-this.dom.width()-$('#'+danmuku._divid).width()>0){
		return true;
	}
	else{
		return false;
	}
}
danmu_css.prototype.creatui=function(){
	this.dom=$('<div style="white-space:pre;position:absolute;left:'+$('#'+danmuku._divid).width()+'px;top:'+this.height+'px;color:white;text-shadow: #000000;text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;">'+this.text+'</div>');
	this.dom.css('transform','translateX(0%)')
	this.dom.css('left','100%')
	this.dom.css('animation','animations 10s linear')
	this.left=0;
	$('#'+danmuku._divid).append(this.dom)
};
danmu_css.prototype.destory=function(){
	this.dom.remove();
};
(function(){
	var DanMuKu_Css={
		tempDanMu:[],
		channel:[],
		_divid:'',
		intervalId:-1,
		_this:null,
		locTemp:'',
		addDanMu:function(txt){
			_this.tempDanMu.push(txt);
		},
		start:function(){
			
		},
		init:function(divid){
			_this=this;
			this._divid=divid;
//			$('#'+this._divId)
			console.log($('#'+this._divid).height());
			for(let i=0;i<$('#'+this._divid).height()/25;i++){
				this.channel.push([]);
			}
			_this.intervalId=setInterval(_this.animation,24);
		},
		animation:function(){
			let txt2=null;
			if(_this.channel==null)return;
			for(let i=0;i<_this.channel.length;i++)
			{
				let arr2=_this.channel[i];
				if(arr2.length>0)
				{
					//trace(i+"轨迹有"+arr2.length+"个字幕")
					for(let j=0;j<arr2.length;j++)
					{
						txt2=arr2[j];
//						txt2.move();
					}
					for(j=0;j<arr2.length;j++)
					{
						txt2=arr2[j];
						if(txt2.canDes())
						{
							txt2.destory();
							arr2.splice(j,1);
							txt2=null;
						}
					}
				}
				if(_this.tempDanMu.length>0)
				{
					_this.locTemp=_this.hasLocation2(arr2,i)
					if(_this.locTemp.f)
					{
						_this.setValue2(_this.tempDanMu.shift());
					}
				}
				
			}
		},
		setValue2:function(txt){
			let txt2=new danmu_css(txt,_this.locTemp.index);
			_this.locTemp.arr.push(txt2);
		},
		width:function(){
			
		},
		hasLocation2:function(arr,i){
			let loc={};
			let isOk=false;
			let index=i;
			let txt3=null;
			if(arr.length==0)
			{
				isOk=true;
			}
			else
			{
				txt3=arr[arr.length-1];
				if((txt3.x()+txt3.width()+15)<0)
				{
					isOk=true;
				}
			}
				
			
			if(isOk)
			{
				loc.arr=arr;
				loc.index=index;
				loc.f=true;
				return loc;
			}
			return {f:false};
		},
		clear:function(){
			clearInterval(_this.intervalId);
			tempDanMu=[];
			channel=[];
			$('#'+danmuku._divid).empty();
		}
	}
	window.danmuku_css=DanMuKu_Css;
})()
