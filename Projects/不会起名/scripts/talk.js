   var oPopup ;
   var keyview=false,LastTime;
   var xmlDoc = null;//new ActiveXObject("Microsoft.XMLDOM");
try{xmlDoc = new ActiveXObject("Microsoft.XMLDOM");}catch(e){xmlDoc = document.implementation.createDocument("","",null);  }
   var readtimer; 
   var lastsoundtime=null;
   var crcIds=""; //用来返回给服务器以校验短信息获取与否
   var isConnected=true; //网络是否连接		
   var lastMsg=null; //最后一次发送消息的url
   var inputTextLen=0; //length of input text

   function SelectLangauge(lanid)
   {
	  var surl=document.URL;
	  var ni=surl.indexOf("&lancode");
	  if(ni!=-1)
		surl=surl.substring(0,ni);
	  var slan="";
	  if(lanid==0)
		slan="";
      else if(lanid==1)
        slan="en/";
      else if(lanid==2)
        slan="bg/";
      else if(lanid==3)
        slan="jp/"; 
      SaveResult();
      detachEvent("onunload",SaveResult);
	  detachEvent("onbeforeunload",ConfirmOut);
//window.alert(surl+"&lancode="+slan);	  
	  document.URL=surl+"&lancode="+slan;
      return false;
   }
   
      
	function tw(s)
	{
		s=s.toString();
		return (s.length==1)?"0"+s:s;			
	}

	function showhideobj(id,type)
	{
		var sobj;
		try
		{
			if(id==0)//短信
			{
				if(type==0)
				{
					document.getElementById("smsDiv").style.display="none";
					document.getElementById("MM").checked=false;
				}
				else
					document.getElementById("smsDiv").style.display="inline";			
			}
			else if(id==1)//电话
			{
				if(type==0)
					document.getElementById("voip").style.display="none";
				else
					document.getElementById("voip").style.display="inline";
			}
		}
		catch(e)
		{}
	}


	function setflash()
	{
		if(icon!="")
		{
			rightpanelup.style.height=90;
			rightpanelup.vAlign="middle";
			UserImg.innerHTML="<img src="+icon+" style='width:105;height=90;' border='0'>";
			rightpaneldown.vAlign="bottom";
			
			//名片
			var mpStr="<table width='100%' height='50' cellspacing='0' cellpadding='0' style='table-layout:fixed;' align='top'>";
			mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;width=30\"> 姓名:</td><td style=\"color:#000;font-size:12px;text-align:left;padding:0;\">"+username+"</td></tr>";
			//mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;width=30\">公司:</td><td style=\"color:#000;font-size:12px;text-align:left;padding:0;\">"+companyName+"</td></tr>";
			mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;width=30\"> 部门:</td><td style=\"color:#000;font-size:12px;text-align:left;padding:0;\">"+type+"</td></tr>";
			mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;\"> 电话:</td><td style=\"color:#000;font-size:11px;text-align:left;padding:0;\">"+workphone+"</td></tr>";
			mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;\">手机:</td><td style=\"color:#000;font-size:11px;text-align:left;padding:0;\">"+mobilephone+"</td></tr>";
			//mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;\">QQ:</td><td style=\"color:#000;font-size:11px;text-align:left;padding:0;\">"+qq+"</td></tr>";
			//mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;\">MSN:</td><td style=\"color:#000;font-size:12px;text-align:left;padding:0;\">"+msn+"</td></tr>";
			//mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;\">邮件:</td><td style=\"color:#000;font-size:12px;text-align:left;padding:0;\">"+emailAdd+"</td></tr>";
			//mpStr +="<tr><td valign='top' style=\"color:#000;font-size:12px;text-align:left;padding:0;\">地址:</td><td style=\"color:#000;font-size:12px;text-align:left;padding:0;\">"+address+"</td></tr>";
			mpStr +="</table>";
			userInfo.innerHTML=mpStr;
 
		}
		else
		{
			rightpanelup.style.height=0;
			UserImg.innerHTML="";rightpaneldown.vAlign="middle";rightpanelup.style.border="";
		}
	    
	    if(flash!="")
	    	{
			var html="";
			if(flash.indexOf(".swf")!=-1)//flash
			{
				if(icon!="")
					html="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width=\"110\" height=\"180\"><param name=\"movie\" value=\"##1\"><param name=\"quality\" value=\"high\"><param name=\"wmode\" value=\"opaque\"><embed src=\"##1\" quality=\"high\" pluginspage=\"https://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"110\" height=\"180\"></embed></object>";
				else
					html="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width=\"110\" height=\"270\"><param name=\"movie\" value=\"##1\"><param name=\"quality\" value=\"high\"><param name=\"wmode\" value=\"opaque\"><embed src=\"##1\" quality=\"high\" pluginspage=\"https://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"110\" height=\"270\"></embed></object>";
				html=html.replace("##1",flash).replace("##1",flash);				
			}
			else
			{
				if(icon!="")
					html="<img border=0 width=110 height=180 src="+flash+">";
				else
					html="<img border=0 width=110 height=270 src="+flash+">";
			}
			UserImgb.innerHTML=html;
		}
	}
	
	function doAction(mode,sP2)
	{
		window.focus();
		msg.focus();
		if(mode==0)//set color
			document.execCommand("ForeColor",false,sP2);
		else if(mode==1)
		{
			document.execCommand("InsertImage",false,sP2);
			document.selection.empty();		
			document.body.createTextRange().collapse();						
		}
		window.focus();
		msg.focus();
	}   
   
   function toolbarAction(tid)
   {
	    switch(tid)
	    {
			case 10://字体颜色
			case 20://
				var att="status=off;help=off;dialogLeft="+window.event.screenX+";dialogTop=",url="",t="";
				switch(tid)
				{
					case 10://color
						url="colors.htm";
						att+=window.event.screenY-120+";dialogWidth=130px;dialogHeight=110px;";
						break;
					case 20:
						url="emotions.htm";
						att+=window.event.screenY-240+";dialogWidth=260px;dialogHeight=230px;";
						break;
				}
				var x=window.showModelessDialog(url,null,att);
				x.opener=window;
				x.focus();
				break;
			case 30://保存
			case 35://打印
				try
				{
					var s=HistoryList.innerHTML;
					var win= window.open('about:blank','_blank','top=10000');
					win.document.open();
					win.document.write(s);
					win.document.close();
					if(tid==30)//save
						win.document.execCommand('saveas','','对话记录.htm');
					else if(tid==35)//print
						win.document.execCommand('print','',null);			
					win.close();
				}
				catch(e)
				{}				
				break;
			case 36://发送Email
				var mailfrm=document.getElementById("emailform");
				if(mailfrm!=null)
				{
					mailfrm.style.display="inline";
					//email.focus();
				}
				break;
			case 38://voip请求
				//if(tid==36)
				//{
				//	var mailfrm=document.getElementById("emailform");
				//	if(mailfrm!=null)
				//	{
				//		mailfrm.style.display="inline";
				//		email.focus();
				//	}
				//}				
				//else
				{
					//hwnd=window.showModelessDialog("voip.htm",null,"status:false;dialogWidth:420px;dialogHeight:160px");
					var vpfrm=document.getElementById("voipform");
					if(vpfrm!=null)
					{
						vpfrm.style.display="inline";
						//areacode.focus();
					}
				}
				break;
			case 40://清楚
				msg.innerText="";
				break;
			case 50://上传文件:
				if(userstate!="ONLINE"&&userstate!="TALKING")
				{
					alert("只有用户在线时才能发送文件");
					return;
				}
				var uform=document.getElementById("uploadform");
				if(uform.style.display=="none")
				{
					document.frames("uploadframe").document.URL="upload.jsp?id="+vid+"&toid="+toid;
					uform.style.display="inline";
				}
				break;			
	    }
   }
   
   function ShowVoip()
   {
	
   
   }
   
   function closeUpload()
   {
		uploadtd.innerHTML='<iframe src=_blank border=0 name=uploadframe style=width:100%;height:100%></iframe>';
		uploadform.style.display='none';   
   }
   
   function ShowStatus(sname,status)
   {
     titlebar.innerText="与"+sname+"通话中,状态"+status
   }

   function checkkey()
   {
		//if(!keyview&&userstate!="OFFLINE")
		if(userstate!="OFFLINE") //continously be sending viewer input
		{
			//keyview=true;
			try{SendKeyInfo(true);}catch(e){}
		}
		LastTime=new Date();
   }   

	function SendMessage(msg)
	{
		var bResult=false;
		document.getElementById("talkstatus").innerHTML="";
		if(objsend.object!=null)
		{
			if((((new Date())-objsend.time)/1000)>=30)
			{
				objsend.object.abort();
				objsend.object=null;
				//insertMsg("",3,formatdate(),"发送超时,上次消息发送未成功。");	
				document.getElementById("talkstatus").innerHTML="发送超时,上次消息发送未成功。";
				isConnected=false;
				document.getElementById("netStatus").innerHTML="网络:<font color='red'>连接....</font>";		
			}
			else
			   document.getElementById("talkstatus").innerHTML="上次消息发送尚未完成,请稍后再发。";
			   //insertMsg("",3,formatdate(),"上次消息发送尚未完成,请稍后再发。");
		   return bResult;
		}
		//insertMsg("",3,formatdate(),objsend+" "+msgSent);
		if(objsend.object==null && !msgSent)//如果上次没有发送成功
		{
			//insertMsg("",3,formatdate(),"发送超时,上次消息发送失败。<br>");
			document.getElementById("talkstatus").innerHTML="发送超时,上次消息发送失败。<br>"; 
			
			isConnected=false;
			document.getElementById("netStatus").innerHTML="网络:<font color='red'>连接....</font>";
			return false;			 		 
		}
		lastMsg=msg;
		msg="msgManager.jsp?msg="+escape(msg)+"&vid="+vid+"&a=2&&toid="+toid;
		if(MM.checked)
			msg+="&mm=true";//手机信息
		if(!msgsend(msg,true,objsend,null))
			document.getElementById("talkstatus").innerHTML="发送超时,发送未成功,请稍后再发。";
			//insertMsg("",3,formatdate(),"发送超时,发送未成功,请稍后再发。");
		else		 
			bResult=true;		 
		return bResult;
	}   
   
   function SendMsg()
   {	
		if(event.keyCode!=0)
			if(!(event.keyCode==13&&!event.shiftKey))
				return true;
	if(!isConnected)
	{			 
		//insertMsg("",3,formatdate(),"<font color=red>网络不通</font>, 请稍候再发。<br>");	
		document.getElementById("talkstatus").innerHTML="<font color=red>网络不通</font>, 请稍候再发。<br>";
		return;
	}
		if(readtimer==null)
		{
			alert("对话已终止");
			return ;
		}
		
		keyview=false;
				
		event.keyCode=0;

		if(msg.innerHTML=="")
		{
			alert("不能发送空信息");
			return;
		}
		   
        var bResult=false;
        if(!MM.checked)
        {
			if(bResult=SendMessage(msg.innerHTML))
			   insertMsg("您",0,formatdate(),msg.innerHTML);
		}
		else
		{
			if(bResult=SendMessage(msg.innerText))
				insertMsg("您",0,formatdate(),"<font color=red>[短信已发送]</font>"+msg.innerHTML);
		}
		if(bResult)
			msg.innerHTML="";
		msg.focus();
		
		return false;		
   }
   
	function translateState(s)
	{
		switch(s)
		{
			case "ONLINE":
				s="在线";
				break;
			case "OFFLINE":
				s="离线";
				break;
			case "TALKING":
				s="在线";
				break;		
			case "BUSY":
				s="繁忙";
				break;
			case "LEFT":
				s="离开";
				break;
			case "ONPHONE":
				s="通话";
				break;				
		}
		return s;
	}   

	function ProcessMsg(s)
	{
//window.alert(s);
		//如果连接状态为断开，显示为连接
		if(isConnected==false)
		{
			//insertMsg("",3,formatdate(),"<font color=green>系统已经成功恢复连接。</font><br>");
			document.getElementById("netStatus").innerHTML="网络:<font color='green'>正常</font>";
			if(lastMsg != null && lastMsg != "null" && !msgSent)
			{				
				insertMsg("",3,formatdate(),"重发消息["+lastMsg+"]<br>");
				//document.getElementById("talkstatus").innerHTML="重发消息:"+lastMsg;
				msgSent=true;	
				SendMessage(lastMsg);
				lastMsg=null;								
			}
			else
				document.getElementById("talkstatus").innerHTML="";		 
			isConnected=true;						
		}	
		var msgtype,frmid,thetoid,Msg,state;
		xmlDoc.loadXML(s);
		var nodelist=xmlDoc.selectNodes("//M");
		var node;
		//var messageIds=""; //已经读取到本地的短信息id
		crcIds="";
		for(var ni=0;ni<nodelist.length;ni++)
		{
			node=nodelist.item(ni);
			//messageIds +=node.getAttribute("id")+",";//多个已经读取到本地的短信息id
			crcIds +=node.getAttribute("id")+",";//多个已经读取到本地的短信息id
			msgtype=node.getAttribute("tp");frmid=node.getAttribute("f");thetoid=node.getAttribute("t");
			Msg=unescape(node.getAttribute("m"));time=node.getAttribute("tm");
			mm=node.getAttribute("mm");
//window.alert(msgtype+" "+Msg);
			switch(msgtype)
			{
				case "STATECHANGE"://状态变化，包括online,offline
					userstate=Msg;
					state=translateState(Msg);
					insertMsg("",3,time,username+"现在状态为:<font color=red>"+state+"</font>("+time+")");
					document.getElementById("talker").innerHTML=username+" 目前状态:<font color=red>"+state+"</font>";
					if(Msg=="ONLINE"||Msg=="TALKING")
					{
						if(mbhide)
							showhideobj(0,0);			
						if(voiphide)
							showhideobj(1,0);									
					}
					else
					{
						showhideobj(0,1);
						showhideobj(1,1);								
					}
					break;
				case "TALKMSG":
					if(mm=="true")
						Msg="<font color=red>[短信回复]</font>"+Msg;
					insertMsg(username,1,time,Msg);
					scrolltobottom();
					window.focus();
					msg.focus();
					playSound(0);
					document.getElementById("talkstatus").innerHTML="";
					break;
				case "ADVERT":  //
					document.getElementById("advert").src="http://"+Msg;
					window.focus();
					break;
				case "ADVERTBOTTOM":  //
					document.getElementById("advertBottom").src="http://"+Msg;
					window.focus();
					break;
				case "KEYSTATUS":
					var obj=document.getElementById("talkstatus");
					if(Msg=="1")//显示
						obj.innerHTML="<img src=img/status/typing.gif width=12 height=12> "+username+"正在输入信息...";
					else
						obj.innerHTML="";
					break;
				case "SMSFAIL":
					MM.disabled=true;MM.title=SMSReason(Msg);
					insertMsg("",2,time,"<font color=red>未能发送短信</font>，原因如下:"+SMSReason(Msg));
					if(MM.checked)
					{
						MM.checked=false;
						ShowMMAlert();
					}
					break;
				case "VOIPSTATUS":
					if(Msg=="1")//超额
					{
						document.getElementById("voip").disabled=true;
						document.getElementById("voip").title="您已达到呼叫限额";
						insertMsg("",2,time,"<font color=red>您已达到免费电话服务限额</font>");					
					}
					else if(Msg=="2")//呼叫中
						insertMsg("",2,time,"电话呼叫中...");
					else if(Msg=="3")//对话中
						insertMsg("",2,time,"成功建立电话通话...");
					else if(Msg=="4")//失败
						insertMsg("",2,time,"电话呼叫失败，请稍后再试...");
					break;
				case "TERMINATE"://对话已结束
					window.clearInterval(readtimer);
					readtimer=null;
					insertMsg("",2,time,"对话已结束");
					break;
				case "TRANSFER"://转接对话
					var nj=Msg.indexOf(",");
					var frmid=Msg.substring(0,nj),frmname=Msg.substring(nj+1);
					insertMsg("",2,formatdate(),"对话已被转移至:"+frmname);
					toid=frmid;username=frmname;userstate="ONLINE";
					document.getElementById("talker").innerHTML=username+" 目前状态:<font color=red>"+translateState(userstate)+"</font>";
					break;
				case "SYSNOTIFY":
					insertMsg("",2,time,Msg);
					break;
				ShowInvitation(frmid,msg);
			}
		}
		//crcIds=messageIds;
	}		
   
   function SMSReason(type)
   {
      var s="";
      switch(type)
      {
		case "0":
			s="短信服务不可用";
			break;
		case "1":
			s="对方无有效手机号码";
			break;
		case "2":
			s="对方短信已到达最大接收额度";
			break;
		case "3":
			s="您已超过可发送短信数量";
			break;				
      }
      return s;
   }
   
   
   function insertMsg(mname,mtype,time,str)
   {
   	  if(mtype==0)//自己
   	    str="<p style=\"margin-top: 0; margin-bottom: 0.5em\"><font color=red>"+mname+" 说:</font><font color=green>("+time+"</font>)<br>"+str+"</p>"; 
   	  else if(mtype==1)
		str="<p style=\"margin-top: 0; margin-bottom: 10px\"><font color=blue>"+mname+" 说:</font><font color=green>("+time+"</font>)<br>"+str+"</p>"; 
	  else if(mtype==2)//系统
	  {
		if(time!=null)
			str="<p style=\"margin-top: 0; margin-bottom: 10px\"><font color=green>系统提示:"+str+"("+time+")</font></p>";
		else
			str="<p style=\"margin-top: 0; margin-bottom: 10px\"><font color=green>系统提示:"+str+"</font></p>";
	  }
	  else if(mtype==3)//无抬头
		str="<p style=\"margin-top: 0; margin-bottom: 10px\"><font color=green>"+str+"</font></p>";
	  
	  //return str;
	  HistoryList.innerHTML+=str;
	  scrolltobottom();
   }
   
   function scrolltobottom()
   {
	  HistoryList.scrollTop=32000;   
   }
	
	function SendKeyInfo(bOn)
	{		
		if( (msg.innerText).length - inputTextLen < 0 )
			inputTextLen=0;
		//发送浏览者输入信息，增加字符数多于3个才发送
		if( bOn && (msg.innerText).length - inputTextLen < 3)
			return;	
		if( (msg.innerText).length > 30)//如果内容太长(30)就放弃发送
			return;			
		inputTextLen=(msg.innerText).length;
		if(!bOn)
			inputTextLen=0;		 
		var url="msgManager.jsp?a=19&vid="+vid+"&toid="+toid+"&msg="+((bOn)?escape(msg.innerHTML):"0");	 
		var bResult=false;
		if(objkey.object==null)
		{
			if(!msgread(url,true,objkey,null))
				;//insertMsg("",3,time,"无法收发信息,请检查网络及对方网站是否可用");
			else
				bResult=true;
		}
		else if((((new Date())-objkey.time)/1000)>=30)
		{
			objkey.object.abort();
			objkey.object=null;
			//insertMsg("",3,time,"无法收发信息,请检查网络及对方网站是否可用");
		}
		
		return bResult;
	}
	
	var counter=0;	
	function ReadMessage()
	{	
if (document.all) { 
	 
} 
else {
alert("netscape");
}
		if(objread.object==null)
		{
			counter=counter+1;
			var url="msgManager.jsp?a=11&toid="+toid+"&vid="+vid+"&crcIds="+crcIds+"&counter="+counter;
			if(counter>=15)
				url="msgManager.jsp?a=11&toid="+toid+"&vid="+vid+"&url="+curUrl+"&crcIds="+crcIds+"&counter="+counter;
			if(!msgread(url,true,objread,ProcessMsg))
			{
				//insertMsg("",3,formatdate(),"<font color=red>网络不通,</font>正在重新连接...<br>");
				document.getElementById("netStatus").innerHTML="网络:<font color='red'>连接...</font>";
				//isConnected=false; //不能将isConnected=false,因为msgread()返回时，可能请求正在进行		
				//window.clearInterval(readtimer);
				//readtimer=null;
			}
			else
				crcIds=""; //清空消息id
			if(counter>=15)
				counter=0;
		}
		else if((((new Date())-objread.time)/1000)>=30)
		{
			objread.object.abort();
			objread.object=null;
			//insertMsg("",3,formatdate(),"<font color=red>网络不通,</font>正在重新连接....<br>");
			document.getElementById("netStatus").innerHTML="网络:<font color='red'>连接....</font>";
			//window.clearInterval(readtimer);
			//readtimer=null;	
			isConnected=false;			
		}
		if(keyview)
		{
			d=(new Date())-LastTime;
			if((d/1000)>5)
			{
				SendKeyInfo(false);
				keyview=false;
			}
		}
		//check for sound
		if(lastsoundtime!=null)
		{
			var n=(new Date()).getSeconds()-lastsoundtime.getSeconds();
			if(Math.abs(n)>5)
			{
				lastsoundtime=null;
				soundeffect.src="";
			}
		}					
	}
	
	
	function getStatus(state)
	{
		var stu="";
		switch(state)
		{
			case "OFFLINE":
				stu="离线";
				break;
			default:
				stu="在线";
				break;				
		}
		return stu;
	}
	
	function chkOnLoad(e)
	{
		if (!e) e = window.event;

//初始化对象
//window.alert("chkonload");
		var path=document.URL;
		var ni=path.lastIndexOf("/");
		path=path.substring(0,ni);
//window.alert(path);
		var xml=path+"/xml/talk.xml";
		createtalk(xmltalk,0,path);
	//window.alert(path+"/img/talk/menu/");
		createmenu(xmlmenu,document.getElementById("sendtoolbar"),path+"/img/talk/menu/");
		//设置初始化信息
		if(!mbenabled&&!shortbar)
		{
			document.getElementById("MM").disabled=true;
			document.getElementById("MM").title="客服人员未开通商务短信功能,或短信功能暂时不可用,不能发送短信";
		}
		if(!voipenabled&&!shortbar)
		{
			document.getElementById("voip").disabled=true;
			document.getElementById("voip").title="客服人员未开通电话功能,不能发送呼叫";
			document.getElementById("voip").onclick=null;
		}		
		
		var message="";
		
		if(userstate=="OFFLINE")
		{
			if(offlinecomment=="null"||offlinecomment=="")
			{
				message="欢迎您的光临,用户不在线,您可以:<BR>";
				if(voipenabled)
					message+="*选择<font color=red>免费电话</font>,输入号码,系统会自动连通我<BR>";
				if(mbenabled)
					message+="*选择<font color=red>发送短信</font>,向我发送短信，我可以直接回复<BR>";
				message+="*在此留言,我将尽快答复您<BR>";
				message+="请务必留下<font color=red>详细</font>联系方式,以便于我们联系您,谢谢";
			}
			else
				message=offlinecomment;
		}
		///////////////////////////////
		else if(userstate=="LEFT")
		{
			if(leftcomment=="null"||leftcomment=="")
			{
				message="欢迎您的光临,用户暂时离开,您可以:<BR>";
				if(voipenabled)
					message+="*选择<font color=red>免费电话</font>,输入号码,系统会自动连通我<BR>";
				if(mbenabled)
					message+="*选择<font color=red>发送短信</font>,向我发送短信，我可以直接回复<BR>";
				message+="*在此留言,我将尽快答复您<BR>";
				message+="请务必留下<font color=red>详细</font>联系方式,以便于我们联系您,谢谢";
			}
			else
				message=leftcomment;
		}
		else if(onlinecomment=="null"||onlinecomment=="")
			message="欢迎您的光临,有什么可以帮到您?";
		else
			message=onlinecomment;
			

		if(!shortbar)
		{
			if(userstate=="ONLINE"||userstate=="TALKING")
			{
				if(mbhide)
					showhideobj(0,0);			
				if(voiphide)
					showhideobj(1,0);				
			}
			else
			{
				showhideobj(0,1);
				showhideobj(1,1);			
			}
		}
		
		document.getElementById("talker").innerHTML=username+" 目前状态:<font color=red>"+translateState(userstate)+"</font>";
		insertMsg("",3,"",message)
			
		initTransfer2();
		
//设置flash
		if(centerxml=="")
			setflash(flash);
		else
			setcenter(centerxml);
					
		//document.title="您的ID:"+vid+" Powered by uniscom.";
		readtimer=window.setInterval("ReadMessage()",3000); 
		window.focus();

		document.getElementById("tran").style.display="inline";
		
		window.document.getElementById("msg").focus();
	}
	
	
	function ShowHistory()
	{
		var win = window.open();
		win.document.open ("html","utf-8");
		win.document.write(GetPreData());
	}
	
	function ClearHistory()
	{
		if(confirm("是否删除与"+toid+"的通话历史记录?"))
		{
			msg.removeAttribute("content");
			msg.save("ydh"+toid);
		}
	}
	
	
	function SaveResult()
	{
		//发送退出对话消息
		//domainSynSendMsg("msgManager.jsp?a=6&vid="+vid+"&toid="+toid);
		try
		{
			window.clearInterval(readtimer);
			readtimer=null;
			msgread("msgManager.jsp?a=6&vid="+vid+"&toid="+toid+"&url="+curUrl+"&centerid="+centerid,false,null,null);
			msg.innerText="";msg.contentEditable=false;
			HistoryList.innerText="";HistoryList.contentEditable=false;
			if(objread.object!=null)
				objread.object.abort();
			objread=null;
			if(objsend.object!=null)
				objsend.object.abort();
			objsend=null;
			if(objkey.object!=null)
				objkey.object.abort();
			objkey=null;
		}
		catch(e)
		{}
	}	

	function doSearch(key)
	{
		window.open("search.aspx?key="+key,"sw");
	}
	
	function buttonSearch()
	{
		var key=document.selection.createRange().text;
		if(key=="")
			key=msg.innerText;
		doSearch(key);
	}

	function ShowMMAlert()
	{
		if(MM.checked)
		{
			insertMsg(null,2,formatdate(),"进入短信模式，您的文字被限制在70个汉字以内;用户可能用手机回复您的提问,速度会稍慢");
			document.getElementById("msg").maxlength=70;
		}
		else
		{
			insertMsg(null,2,formatdate(),"进入正常文字模式");
			document.getElementById("msg").maxlength=null;
		}
		msg.focus();
	}
	
	window.onresize=scrolltobottom;
	//attachEvent("onload",chkOnLoad);
	//window.attachEvent("onunload",SaveResult);
	//window.attachEvent("onbeforeunload",ConfirmOut); 
if (document.all) { 
	attachEvent("onload",chkOnLoad);
	window.attachEvent("onunload",SaveResult);
	window.attachEvent("onbeforeunload",ConfirmOut);
} 
else {
	window.addEventListener("onload", chkOnLoad, false); 
	window.addEventListener('onunload', SaveResult, false); 
	window.addEventListener('onbeforeunload', ConfirmOut, false); 
} 		
	function ConfirmOut()
	{
		event.returnValue="关闭本窗口将结束对话，是否关闭?";
	}	
	
//--------------------------------------------------------------
// #Description: 生成浮动框
// #Creation Date: 2005年5月31日
// #Generator: EditPlus2.12
// #Author: wysl_8114@hotmail.com
//-------------------------------------------------------------------------------------------------------------------------------
//n:判断是否是重新加载xml还是第一次加载，1为重新加载，要先删除原先的浮动框。
	function createtalk(xmlfile,n,path)
	{
//alert("ttttt");
		var strMain	= "";
		var strShow	= "";
		var strEdit	= "";
		var strRight	= "";
        //var lanstr="<a href=# onclick=return(SelectLangauge(0))>中文版</a>&nbsp;<a href=# onclick=return(SelectLangauge(1))>English</a>&nbsp;<a href=# onclick=return(SelectLangauge(2))>繁體版</a>&nbsp;<a href=# onclick=return(SelectLangauge(3))>日本語の版</a>&nbsp;";
	var lanstr="<center><font color='blue'>"+companyName+"</font></center>";       
		var xmlobj	= null;//new ActiveXObject("Microsoft.XMLDOM");
//try{xmlobj = document.implementation.createDocument("","",null);}catch(e){ xmlobj = new ActiveXObject("Microsoft.XMLDOM"); }
		//xmlobj.async="false";
		//xmlobj.loadXML(xmlfile);
if (document.all) { 
	xmlobj = new ActiveXObject("Microsoft.XMLDOM");
	xmlobj.async="false";
	xmlobj.loadXML(xmlfile);
} 
else {
	var dp = new DOMParser();
	xmlobj = dp.parseFromString(xmlfile, "text/xml");
	//xmlobj=xmldom.documentElement; 
} 


		if(xmlobj.documentElement.attributes(0).value=="")
		{
			if(n==1)
			{
				base.removeNode(true);
			}
			var arrText		= GetXmlNode(xmlobj,"//style/textlist",4);				//对话框所有文字及其属性
			var arrImage	= GetXmlNode(xmlobj,"//style/imagelist",3);			//对话框所有图片及其属性
			var arrWidth	 	= GetXmlNode(xmlobj,"//style/widthlist",1);			//对话框所有宽度属性值
			var arrHeight	= GetXmlNode(xmlobj,"//style/heightlist",1);			//对话框所有高度属性值
			var arrSetting	= GetXmlNode(xmlobj,"//style/defaultsetting",3);	//对话框缺省属性值
			
			if(arrImage!=null)
				for(var ni=0;ni<arrImage.length;ni++)
					if(path!=null)
						arrImage[ni][0]="img/talk/"+arrImage[ni][0];	

			strEdit	= strEdit + "<table width='100%' height='100%' cellspacing='0' cellpadding='0' style='BORDER-COLLAPSE:collapse' border='1' bordercolor='#97D5F6'>";
			strEdit	= strEdit + "<tr>";
			//strEdit	= strEdit + "<td id='sendtopleft' style='width:"+arrWidth[5][0]+"px;height:"+arrHeight[6][0]+"px;'><img src='"+arrImage[33][0]+"'></td>";
			strEdit	= strEdit + "<td id='sendtopmiddle' style='background:url("+arrImage[14][0]+");'><table cellpadding='0' cellspacing='0'><tr><td><div id='sendtoolbar' style='border:0px solid;'></div></td><td>";
			if(!shortbar)
				strEdit+="<span id='smsDIV' style='display:inline'><input type='checkbox' id='MM' onclick='ShowMMAlert();' title='发送短信'><label for='MM'><nobr><font style='color:"+arrText[3][1]+";font-size:"+arrText[3][2]+"px;'>"+arrText[3][0]+"</font></nobr></label></span>&nbsp;<span id='voip'  style='display:inline;cursor:hand' class='a_effect' onclick='toolbarAction(38);'><font style='color:red;font-size:14px'>免费电话</font></span>";
			else
				strEdit+="<span id='smsDIV' style='display:none'><input type='checkbox' id='MM' onclick='ShowMMAlert();' title='发送短信'><label for='MM'><nobr><font style='color:"+arrText[3][1]+";font-size:"+arrText[3][2]+"px;'>"+arrText[3][0]+"</font></nobr></label></span>&nbsp;<span id='voip'  style='display:none;cursor:hand' class='a_effect' onclick='toolbarAction(38);'><font style='color:red;font-size:14px'>免费电话</font></span>";			
			strEdit+="</td></tr></table></td>";
			//strEdit	= strEdit + "<td id='sendtopright' style='width:"+arrWidth[6][0]+"px;background:url("+arrImage[15][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strEdit	= strEdit + "</tr>";
			strEdit	= strEdit + "<tr>";
			
			strEdit	= strEdit + "<td id='sendedit' valign='top'  style='border:1px solid #4A659A;border-top:0xp solid;border-bottom:0xp solid;'>";
			strEdit	= strEdit + "<table width='100%' cellspacing='0' cellpadding='0' bgcolor=#FFFFFF><tr><td>";
			strEdit	= strEdit + "<div id='msg' contenteditable valign='top' onkeypress='SendMsg();' onkeyup='checkkey();' style='width:100%;height:88px;border:0px solid;color:"+arrSetting[1][0]+";font-size:"+arrSetting[1][1]+";font-family:"+arrSetting[1][2]+";padding-right:5px; padding-left:5px;overflow:auto; width:100%;padding-top:5px;background-color:#FFFFFF;'></div>";
			strEdit	= strEdit + "</td>";
			strEdit	= strEdit + "<td width='80'>";
			strEdit	= strEdit + "<table bgcolor=ivory>";
			strEdit	= strEdit + "<tr><td><img src='"+arrImage[34][0]+"'  style='cursor:hand ' onclick='"+arrImage[34][2]+"'/></td></tr>";
			//strEdit	= strEdit + "<tr><td><img src='"+arrImage[35][0]+"' style='cursor:hand ' onclick='"+arrImage[35][2]+"'/></td></tr>";
			strEdit	= strEdit + "</table>";
			strEdit	= strEdit + "</td></tr></table>";
			strEdit	= strEdit + "</td>";
			strEdit	= strEdit + "</tr>";
			strEdit	= strEdit + "<tr>";
			//strEdit	= strEdit + "<td id='sendbottomleft' style='height:"+arrHeight[7][0]+";background:url("+arrImage[18][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strEdit	= strEdit + "<td id='sendbottommiddle' style='height:"+arrHeight[7][0]+";'><div id='talkstatus' style='color:gray;font-size:"+arrSetting[2][1]+";'></div></td>";
			//strEdit	= strEdit + "<td id='sendbottomright' style='background:url("+arrImage[20][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strEdit	= strEdit + "</tr>";
			strEdit	= strEdit + "</table>";

			strShow = strShow + "<table width='100%' height='100%' cellspacing='0' cellpadding='0' style='BORDER-COLLAPSE:collapse' border='1' bordercolor='#97D5F6' bgcolor='#E0F2FC' style='table-layout:fixed'>";
			strShow = strShow + "<tr>";
			//strShow = strShow + "<td id='showtopleft' style='width:"+arrWidth[3][0]+"px;height:"+arrHeight[3][0]+"px;background:url("+arrImage[5][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strShow = strShow + "<td id='showtopmiddle' style='height:"+arrHeight[3][0]+"px;'>";
			strShow = strShow + "<table cellpadding='1' cellspacing='0'><tr><td width='80'><font style='color:"+arrText[1][1]+";font-size:"+arrText[1][2]+";px'>"+arrText[1][0]+"</font></td><td width='280'><div id='talker' style='font-size:12px'></div></td><td width='110' id='netStatus' style='padding-top:2px;font-size:12px;'>网络:<font color='green'>正常</font></td></tr></table>";
			strShow = strShow + "</td>";			
			//strShow = strShow + "<td id='showtopright' style='width:"+arrWidth[4][0]+"px;background:url("+arrImage[7][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strShow = strShow + "</tr>";
			strShow = strShow + "<tr>";
			strShow = strShow + "<td id='showcontent'  style=' solid #4A659A;border-top:0px solid;' valign=top>";
			strShow = strShow + "<div id='HistoryList' style='color:"+arrSetting[0][0]+";font-size:"+arrSetting[0][1]+";font-family:"+arrSetting[0][2]+";OVERFLOW:auto;LEFT:0px;WIDTH:100%;HEIGHT:100%;padding-top:3px;padding-left:3px;background-color:#FFFFFF;'>";
			strShow = strShow + "</div>";
			strShow = strShow + "</td>";
			strShow = strShow + "</tr>";
			strShow = strShow + "</table>";

			strRight = strRight + "<table align='right' width='100%' height='100%' cellpadding='0' cellspacing='0' >";
			 
			strRight = strRight + "<tr>";
			//strRight = strRight + "<td id='adleftborder' style='background:url("+arrImage[28][0]+");'></td>";
			strRight = strRight + "<td id='adcontent' height='124'>";
			strRight = strRight + "<table style='BORDER-COLLAPSE:collapse' border='1' bordercolor='#97D5F6'><tr><td>";			 
			strRight = strRight + "<table width='100%' height='124' cellspacing='0' cellpadding='0' style='table-layout:fixed;'>";			
			strRight = strRight + "<tr><td height='3' bgcolor='#ffffff'></td></tr>";
			strRight = strRight + "<tr><td align='center' bgcolor='#ffffff'>";
			strRight = strRight + "<table style='BORDER-COLLAPSE:collapse' border='1' bordercolor='#CCCCCC' width='112' height='97'>";
			strRight = strRight + "<tr><td id='rightpanelup' style='height:"+arrHeight[2][0]+"px;' align='center' valign='middle'><div id='UserImg'></div></td></tr>";
			strRight = strRight + "</table>";
			strRight = strRight + "</td></tr>";
			////////////
			strRight = strRight + "<tr><td align='center' bgcolor='#ffffff'><table width='100%'><tr>";
			strRight = strRight + "<td id='userInfo' align='center' valign='top' height='58' bgcolor='#ffffff'>名片</td></tr></table></td>";
			strRight = strRight + "</tr>";
			
			strRight = strRight + "</table></td></tr></table>";
			strRight = strRight + "</td>";
			//strRight = strRight + "<td id='adrightborder' style='background:url("+arrImage[29][0]+");'></td>";
			strRight = strRight + "</tr>";

			strRight = strRight + "<tr><td height='5'></td></tr>"; //上下空行
			 		
			////////////////
			 
			//名片下面
			strRight = strRight + "<tr>";
			//strRight = strRight + "<td id='adleftborder1' style='background:url("+arrImage[28][0]+");'></td>";
			strRight = strRight + "<td id='adcontent1'>";
			strRight = strRight + "<table width='100%' height='100%' cellspacing='0' cellpadding='0' style='table-layout:fixed;BORDER-COLLAPSE:collapse' border='1' bordercolor='#97D5F6'>";
			strRight = strRight + "<tr>";
			strRight = strRight + "<td id='rightpaneldown'  valign='middle'><div style='overflow:auto;'><iframe id='advert' width='100%' height='100%' scrolling='no' frameborder='0' src='"+unescape(advert)+"'></iframe></div></td>";
			strRight = strRight + "</tr>";		 
			strRight = strRight + "</table>";
			strRight = strRight + "</td>";
			//strRight = strRight + "<td id='adrightborder1' style='background:url("+arrImage[29][0]+");'></td>";
			strRight = strRight + "</tr>";

			 
			strRight = strRight + "</table>";
			//start---对话窗
			strMain	 = strMain + "<div id='base' oncontextmenu='return false;'>";
			strMain	 = strMain + "<table id='main' width='100%' height='100%' cellpadding='0' cellspacing='0' style='background:url("+arrImage[24][0]+");'>";
				//start---标题行
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td id='titleleft' style='width:"+arrWidth[0][0]+"px;height:"+arrHeight[0][0]+"px;background:url("+arrImage[0][0]+");'></td>";
			strMain	 = strMain + "<td colspan='3' id='titlemiddle' style='background:url("+arrImage[1][0]+");'>";
			if(talkLogo!=null)
				strMain	 = strMain + "<table><tr><td><img src='http://"+talkLogo+"'></td><td width='300' align='center'><font style='color:"+arrText[0][1]+";font-size:"+arrText[0][2]+"px;'>"+lanstr+"</font></td><td width='20%' align='right'><a href='http://"+talkBbsLink+"' target='_blank' style='text-decoration:none;'><font size='2'>"+talkBbsTxt+"</font></a></td></tr></table></td>";
			else
				strMain	 = strMain + "<table><tr><td><img src='"+arrImage[36][0]+"'></td><td width='300' align='center'><font style='color:"+arrText[0][1]+";font-size:"+arrText[0][2]+"px;'>"+lanstr+"</font></td><td width='20%' align='right'><a href='http://"+talkBbsLink+"' target='_blank' style='text-decoration:none;'><font size='2'>"+talkBbsTxt+"</font></a></td></tr></table></td>";
			strMain	 = strMain + "<td id='titleright' style='width:"+arrWidth[1][0]+"px;background:url("+arrImage[2][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strMain	 = strMain + "</tr>";
				//end---标题行
			strMain	 = strMain + "<tr><td colspan='5' height='8'></td></tr>"; //标题行和主体行之间的空行
			        //start---主体行
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td width='7'></td>"; //主体左边空边
			strMain	 = strMain + "<td id='talk'>";
			strMain	 = strMain + "<table align='center' width='100%' height='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'>";
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td width='100%'>";
						//start---左边主体
			strMain	 = strMain + "<table width='100%' height='100%' id='talkmain' cellpadding='0' cellspacing='0'>";
							
			//strMain	 = strMain + "<tr>";
			//strMain	 = strMain + "<td id='menu' style='height:"+arrHeight[1][0]+"px;'></td>";
			//strMain	 = strMain + "</tr>";
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td id='show' style='background:#FFFFFF;' align='right'>";
			strMain	 = strMain + strShow;  //对话内容显示部分(包括对话者状态显示)
			strMain	 = strMain + "</td>";
			strMain	 = strMain + "</tr>";
			strMain	 = strMain + "<tr><td height='8'></td></tr>"; //对话内容显示部分和输入对话部分的空行
			//strMain	 = strMain + "<tr>";
			//strMain	 = strMain + "<td height='8'><img src='"+arrImage[33][0]+"'></td>";
			//strMain	 = strMain + "</tr>";
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td id='send' style='background:#FFFFFF;height:"+arrHeight[5][0]+"px;'>";
			strMain	 = strMain + strEdit;  //输入对话部分(包括菜单)
			strMain	 = strMain + "</td>";
			strMain	 = strMain + "</tr>";
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td height='5'><img src='"+arrImage[33][0]+"'></td>";
			strMain	 = strMain + "</tr>";
			strMain	 = strMain + "</table>";
						//end---左边主体
			strMain	 = strMain + "</td>";
			strMain	 = strMain + "<td width='7' ></td>"; //主体中间空边
			strMain	 = strMain + "<td width='"+arrWidth[2][0]+"' style='padding-top:"+arrHeight[1][0]+"px;padding-bottom:5px;'>";
			strMain	 = strMain + "<div id='Right'>";
			strMain	 = strMain + strRight;  //右边主体
			strMain	 = strMain + "</div>";
			strMain	 = strMain + "</td>";
			strMain	 = strMain + "</tr>";
			strMain	 = strMain + "</table>";						
			strMain	 = strMain + "</td>";
					
			strMain	 = strMain + "<td width='2'></td>";//主体右边空边
			strMain	 = strMain + "</tr> <form>";
				 //end---主体行
			//strMain	 = strMain + "<tr><td colspan='5' height='2'></td></tr>"; //主体行和最下面广告行之间的空行
				 //start---最下面广告行
			strMain	 = strMain + "<tr>";
			strMain	 = strMain + "<td width='5'></td>";
			strMain	 = strMain + "<td id='footmiddle' colspan='4' style='font-size:11;' valign='bottom'><div  style='overflow:auto;'><iframe id='advertBottom' width='100%' height='20px' scrolling='no' frameborder='0' src='"+unescape(advertBottom)+"'></iframe></div>";
			//strMain	 = strMain + "<label><input type='radio' name='rb1' value='rb1' />English</label>&nbsp;<label><input type='radio' name='rb2' value='rb2' />简体中文</label>&nbsp;<label><input type='radio' name='rb3' value='rb3' />繁体中文</label>&nbsp;";			
			//strMain	 = strMain + "<div id='foottitle' align='right' style='color:"+arrText[2][1]+";font-size:"+arrText[2][2]+";' onclick='"+arrText[2][3]+"'>"+unescape(arrText[2][0])+"</div>";
			strMain	 = strMain + "</td>";
			//strMain	 = strMain + "<td id='footright' style='background:url("+arrImage[23][0]+");'><img src='"+arrImage[33][0]+"'></td>";
			strMain	 = strMain + "</tr></form>";
				//end---最下面广告行
			strMain	 = strMain + "</table>";
			strMain	 = strMain + "</div>";



			var div = document.createElement("div");
			div.id = "tran";div.style.display="none";
			div.innerHTML = strMain;
			document.body.appendChild(div);
		}
		else
		{//加载样式表
			document.createStyleSheet(String(xmlobj.documentElement.attributes(0).value));
		}
	}

//获取指定节点的节点文本值，并保存在数组中调用。
//保存方式按实际形状的 左上至右下的顺序排列
//o	xml对象
//n	节点
//l		节点下子节点的长度
	function GetXmlNode(o,n,l)
	{
		var ns = o.selectSingleNode(n).childNodes;
		var arrNodes =new Array();
		for (var i=0;i<ns.length;i++)
		{
			arrNodes[i] = new Array();
			for (var k=0;k<l;k++)
			{
				arrNodes[i][k]=ns(i).childNodes(k).text;
			}
		}
		return arrNodes;
	}
//生成图像标签
	function getImage(obj,alttext)
	{
		var strImg = '';
		if(obj!='')
		{
				strImg = '<img src="'+obj+'" alt="'+alttext+'">';
				return strImg;
		}
		else
		{
			return strImg;
		}
	}	
	
	function sendmail()
	{
		if(email.value=="" || email.value==null)
		{
			alert("必须输入接收信息的邮件地址");
			return;
		}
		emailform.style.display="none";		 
		var url="msgManager.jsp?a=100&vid="+vid+"&to="+escape(email.value)+"&title="+escape("淘客通话记录")+"&content="+escape(HistoryList.innerHTML);
		msgread(url,true,objsend,null);
		insertMsg("",2,formatdate(),"对话记录已发送至:"+email.value);
	}

	function sendvoip()
	{
		//if(areacode.value!=""&&phone.value.length==11)
		//{
		//	alert("手机号码前请勿加区号或零");
		//	return;
		//}
		//else if(areacode.value==""&&phone.value.length<11)
		//{
		//	alert("固定电话或小灵通请输入区号");
		//	return;			
		//}
		
		var targetnum=phone.value;
		if(ext.value!="")
			targetnum+=":"+ext.value;
		if(targetnum=="")
		{
			alert("必须输入有效电话号码");
			return;
		}
		areacode.value="";phone.value="";ext.value="";
		voipform.style.display="none";
		var url="msgManager.jsp?a=200&vid="+vid+"&toid="+toid+"&phone="+escape(targetnum);
		msgread(url,true,objsend,null);
		insertMsg("",2,formatdate(),"电话请求已发送,请等待...");
	}
	
//new 
	function creatGroupTitle(gn,div)
	{
		var str="";
		str = str + "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:2px;margin-bottom:5px;\"><tr>";
		str = str + "<td style=\"width:3px;height:19px;background-image:url('img/float/images1/groupleft.gif');\"></td>";
		str = str + "<td title=\""+gn+"\"valign=baseline style=\"color:#000;font-size:12px;text-align:center;padding:0;width:90px;background-image:url('img/float/images1/groupcenter.gif');\"><div style=\"width:90;overflow:hidden;white-Space:nowrap;text-Overflow:ellipsis\">"+gn+"</td>";
		str = str + "<td style=\"width:3px;background-image:url('img/float/images1/groupright.gif');\"></td>";
		str = str + "</tr></table>";		
		var gdiv = document.createElement("DIV");
		gdiv.innerHTML = str;
		div.appendChild(gdiv);
	}
	
	function HOST(node)
	{
		this.id=node.getAttribute("id");this.name=node.getAttribute("name");
		this.state=node.getAttribute("state");this.mbenabled=node.getAttribute("mbenabled");
		this.voipenabled=node.getAttribute("voipenabled");
		
		
		this.Create=function(div)
		{
			yidu_a=document.createElement("a");
			yidu_a.style.cursor="hand";yidu_a.href="#";yidu_a.style.color="#000";yidu_a.style.fontSize="12px";
			yidu_a.style.textDecoration="none";

			ydimg=document.createElement("img");
			ydimg.border=0;
			ydimg.src=this.getImage(this.state,this.mbenabled,this.voipenabled);
			ydimg.width=12;ydimg.height=12;
			ydimg.style.marginLeft='0.2mm';
			yidu_a.appendChild(ydimg);
			this.stateimg=ydimg;

			label=document.createElement("label");
			label.innerText=this.name;label.style.marginLeft='0.8mm';
			yidu_a.appendChild(label);

			label=document.createElement("label");
			label.id=yidu_a.id;

			this.statelabel=label;
			
			this.SetState(this.state,this.mbenabled,this.voipenabled);
												
			yidu_a.appendChild(label);
			
			yidu_a.onclick=function()
			{
				talkto(node.getAttribute("id"));
			}
			
			br=document.createElement("BR");
			yidu_a.appendChild(br);
			
			this.div=yidu_a;
			
			yidu_a.style.display="inline";
							
			div.appendChild(yidu_a);
		}
		
		this.getImage=function(state,mbenabled,voipenabled)
		{
			var ydimg="img/status/";
			state=state.toString().toUpperCase();
			mbenabled=mbenabled.toString().toUpperCase();
			voipenabled=voipenabled.toString().toUpperCase();
			switch(state)
			{
				case "OFFLINE":
					if(voipenabled=="TRUE")
						ydimg+="phone.gif";
					else if(mbenabled=="TRUE")
						ydimg+="offline_mobilephone.gif";
					else
						ydimg+="offline.gif";
					break;
				default:
					ydimg+=state+".gif";
					break;
			}
			return ydimg;
		}
		
		this.getStateName=function(state,mbenabled,voipenabled)
		{
			var s="[";
			switch(state)
			{
				case "OFFLINE":
					if(voipenabled=="TRUE")
						s+="<font color=blue>电话</font>";
					else
						s+=(mbenabled=="TRUE")?"短信":"留言";
					break;
				case "ONLINE":
				case "TALKING":
					s+="在线";
					break;
				case "BUSY":
					s+="繁忙";
					break;
				case "LEFT":
					s+="离开";
					break;
				case "ONPHONE":
					s+="通话";
					break;																					
			}
			return s+"]";
		}
		
		this.SetState=function(state,mbenabled,voipenabled)
		{
			this.state=state;
			mbenabled=mbenabled.toString().toUpperCase();
			voipenabled=voipenabled.toString().toUpperCase();
			this.statelabel.innerHTML=this.getStateName(state,mbenabled,voipenabled);
			switch(this.state.toString().toUpperCase())
			{
				case "OFFLINE":
					if(voipenabled=="TRUE")
						this.statelabel.title="用户不在线,但可使用免费电话通话或留言";						
					else if(mbenabled=="TRUE")
						this.statelabel.title="用户不在线,但可留言或发短信";
					else
						this.statelabel.title="用户不在线,但可直接留言";						
					this.statelabel.style.color="gray";						
					break;
				default:
					this.statelabel.style.color="red";
					this.statelabel.title="";						
					break;
			}
			this.stateimg.src=this.getImage(this.state,this.mbenabled,this.voipenabled);
		}
		
		return this;
	}	
	
	function setcenter(cxml)
	{//设置中心内
		var divobj;
		if(centerlogo!="")
		{
			rightpanelup.style.height=90;
			rightpanelup.vAlign="top";
			rightpaneldown.vAlign="top";rightpaneldown.align="left";
			UserImg.innerHTML="<img src="+centerlogo+" border=0>";
			divobj=UserImgb;
		}
		else
		{
			rightpanelup.style.height=0;
			UserImg.innerHTML="";
			rightpanelup.style.border="";
			adcontent.vAlign="top";
			adcontent.innerHTML="";
			divobj=adcontent;
		}
		var doctmp = null;//new ActiveXObject("Microsoft.XMLDOM");
try{doctmp = new ActiveXObject("Microsoft.XMLDOM"); }catch(e){doctmp = document.implementation.createDocument("","",null); }			
		cxml="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+cxml;
		doctmp.loadXML(cxml);
		node=doctmp.selectSingleNode("//Center");	

		var div = document.createElement("div");		
		div.style.overflow='auto';div.style.width='100%';div.style.height='100%';
		creatGroupTitle(node.getAttribute("name"),div);
		nodelist=doctmp.selectNodes("//Host");
		for(var ni=0;ni<nodelist.length;ni++)
		{
			node=nodelist.item(ni);
			host=new HOST(node);
			host.Create(div);
		}
		divobj.appendChild(div);		
	}
	
	function talkto(tid)
	{
	  var surl=document.URL;
	  var ni=surl.indexOf("&rst");
	  if(ni!=-1)
		surl=surl.substring(0,ni);
	  surl+="&rst="+tid;
      SaveResult();
      detachEvent("onunload",SaveResult);
	  detachEvent("onbeforeunload",ConfirmOut);
	  
	  document.URL=surl;
	}
		