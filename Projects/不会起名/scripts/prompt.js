var pwin=null;

//消息构造   
function CLASS_MSN_MESSAGE(id,width,height,caption,title,message,target,action)   
{   
    this.id     = id;   
    this.title  = title;   
    this.caption= caption;   
    this.message= message;   
    this.target = target;   
    this.action = action;   
    this.width  = width?width:200;   
    this.height = height?height:120;   
    this.timeout= 3000;   
    this.speed  = 20;  
    this.step   = 1;  
  
    this.left   = 0;  
    this.right  = screen.availWidth -1;   
    this.top    = 0;  
    this.bottom = screen.availHeight;  
    this.autoHideTimeOut = 0; 
} 
//隐藏消息方法   
CLASS_MSN_MESSAGE.prototype.hide = function()   
{   
    if(this.onunload())       
    {   
        this.Pop.hide();   
        if(this.timer)   
        {   
            window.clearInterval(this.timer);   
        }   
    }   
}
//消息卸载事件，可以重写   
CLASS_MSN_MESSAGE.prototype.onunload = function()   
{   
    return true;   
}
//消息命令事件，要实现自己的连接，请重写它   
CLASS_MSN_MESSAGE.prototype.oncommand = function()   
{   
	window.focus();
    this.hide();   
}   
//消息显示方法   
CLASS_MSN_MESSAGE.prototype.show = function()   
{   
    var oPopup = window.createPopup(); //IE5.5+   
    this.Pop = oPopup;   

    var w = this.width;   
    var h = this.height;   
	var str = "";   
	str += "<div style='border-right:#455690 1px solid;border-top:#a6b4cf 1px solid;z-index:99999;left:0px;border-left:#a6b4cf 1px solid;width: " + w + "px;border-bottom: #455690 1px solid;position:absolute; top:0px;height: " + h + "px; background-color:#DBE2F7'>"   
	str += "<table style='border-top:#ffffff 1px solid;border-left:#ffffff 1px solid' cellspacing='0' cellpadding='0' width='100%' bgcolor='#E4EAFA' border='0'>"   
	str += "<tr>"   
	str += "<td style='font-size:12px;color:#0f2c8c;' width='30' height='24'></td>"   
	str += "<td style='padding-left:4px;font-weight:normal;font-size:12px;color:#1f336b;padding-top:4px;background-image:url(img/title.gif);' valign='center' width='100%'>" + this.caption + "</td>"   
	str += "<td style='padding-right:2px;padding-top:2px;background-image:url(img/title.gif);' valign='center' align='right' width='19'>"   
	str += "<span title='关闭' style='font-weight:bold;font-size:12px;cursor:hand;color:red;margin-right:4px' id='btsysclose'>×</span></td>"   
	str += "</tr>"   
	str += "<tr>"   
	str += "<td style='padding-right:1px;padding-bottom:1px;'colspan='3' height='" + (h-28) + "'>"   
	//str += "<div style='background-image:url(img/content.gif);border-right: #B9C9EF 1px solid;padding-right:8px;border-top:#728EB8 1px solid;padding-left:8px;font-size:12px;padding-bottom:8px; border-left:#728eb8 1px solid; width: 100%; color:#1f336b;padding-top:8px;border-bottom:#b9c9ef 1px solid;height:100%'>" + this.title + "<br><br>"   
	str += "<div style='word-break:break-all' align='left'><a href='javascript:void(0)' hidefocus='true' id='btcommand'><font color='#0000FF'>" + this.message + "</font></a></div>"   
	str += "</div>"   
	str += "</td>"   
	str += "</tr>"   
	str += "</table>"   
	str += "</div>"   
   
    oPopup.document.body.innerHTML = str;   
    var docWidth    = this.right;   
    var docHeight   = this.bottom-h;   
    var offset      = screen.height - screen.availHeight;   
    var me          = this;   
    var timer;   
    var fun = function()   
    {   
        oPopup.show(docWidth-w, docHeight + offset-10, w, h);     
        if(offset <= 0)
        {   
            window.clearInterval(timer);   
            if(me.autoHideTimeOut>0) 
            { 
                window.setTimeout(function(){me.hide()},me.autoHideTimeOut); 
            } 
        }   
        offset = offset - me.step;   
    }   
    if(typeof(this.speed)!="number"||this.speed<=0) 
    { 
        this.speed = 20; 
    } 

	timer = window.setInterval(fun,this.speed);
		
    var btClose = oPopup.document.getElementById("btSysClose");
    btClose.onclick = function()   
    {   
        me.hide();   
    }   
    var btCommand = oPopup.document.getElementById("btCommand");   
    btCommand.onclick = function()   
    {   
        me.oncommand();   
    }
    this.timer = timer;
} 

CLASS_MSN_MESSAGE.prototype.rect = function(left,right,top,bottom)  
{  
    try  
    {  
        this.left	= left?left:0;  
        this.right	= right?right:screen.availWidth -1;  
        this.top	= top?top:0;  
        this.bottom	= bottom?bottom:screen.availHeight;  
    }  
    catch(e)  
    {}
}  