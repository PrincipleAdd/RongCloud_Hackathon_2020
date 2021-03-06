//--------------------------------------------------------------
// #Description: 仿QQ菜单
// #Creation Date: 2005年6月9日
// #Generator: EditPlus2.12
// #Author: wysl_8114@hotmail.com
//-------------------------------------------------------------------------------------------------------------------------------
//disabled	没有激活锁定
//enabled		已经激活锁定
//intWidth		快捷回复菜单的宽度
//xmlobj		数据对象
//rootnode	根结点
//intWidth		宽度
var arrid = new Array;//各个菜单项的id

function CreateBoard(xmlobj,xmlctrl,rootnode,intWidth,divobj)
	{
		//获取显示控制属性
		var methodnode=xmlctrl.selectSingleNode("//methods");
		var methodlist=new Array();
		for (var ci=0;ci<methodnode.childNodes.length;ci++)
		{
			methodlist[ci]=methodnode.childNodes(ci).text;
		}
		var stylenode=xmlctrl.selectSingleNode("//style");
		var s="//"+rootnode
		var arrContent	 = GetXmlNodeSC(xmlobj,s,1);
		var srrAttribute	 = GetXmlNodeSC(xmlobj,s,2);
		var strAll = '';			//全部的代码
		var strA = '';				//外层的div和表
		var strB = '';				//菜单项的标题项
		var strD = '';				//结束标记
		strA = strA + '<div id="bm" style="width:'+String(intWidth)+'px;border-bottom:0px solid #5B7DC3;padding:0px;">';
		strA = strA + '<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;background:#E8EEF8;">';
		strD = '</table></div>';

		for (var a=0;a<arrContent.length;a++)
		{
				strB = strB + '<tr onclick="controler(s'+srrAttribute[a][0]+')" style="cursor:hand;">';
				strB = strB + '<td style="width:8px;"><img src="'+stylenode.getAttribute("leftimg")+'"></td>';
				strB = strB + '<td align="center" style="background-image:url('+stylenode.getAttribute("background")+');"><span style="width:'+String(intWidth-20)+'px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><font title="'+srrAttribute[a][0]+'"  style="color:'+stylenode.getAttribute("fontcolor")+';font-size:'+stylenode.getAttribute("fontsize")+';">'+srrAttribute[a][0]+'</font></span></td>';
				strB = strB + '<td style="width:15px;background-image:url('+stylenode.getAttribute("background")+');"><img src="img/manage/shortcut/scroll.gif" onclick="changelock(this,this);" title="锁定"></td>';
				strB = strB + '<td style="width:8px;"><img src="'+stylenode.getAttribute("rightimg")+'"></td>';
				strB = strB + '</tr>';

				strB = strB + '<tr id="s'+srrAttribute[a][0]+'" class="disabled" style="display:none;">';
				strB = strB + '<td colspan="4">';
				//内容项
				strB = strB + '<div style="overflow-y:auto;width100%:;height:128px;border:1px solid #5B7DC3;border-top:0px solid #5B7DC3;border-bottom:0px solid #5B7DC3;">';
				strB = strB + '<table cellpadding="1" cellspacing="1" style="color:#330099;font-size:12px;border-left:0px solid #5B7DC3;border-right:0px solid #5B7DC3;">';
				//--------------------------------------------------
				for (var d=0;d<arrContent[a].length;d++)
				{
					strB = strB + '<tr style="color:'+stylenode.getAttribute("fontcolor")+';font-size:'+stylenode.getAttribute("fontsize")+';">';
					strB = strB + '<td style="padding-left:5px;"><div class="contentlist" style="width:'+String(intWidth-20)+'px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:hand;" title="'+arrContent[a][d]+'">'+arrContent[a][d]+'</div></td>';
					strB = strB + '</tr>';
				}
				//--------------------------------------------------
				strB = strB + '</table>';
				strB = strB + '</div>';

				strB = strB + '</td>';
				strB = strB + '</tr>';
		}
		//组合各个部分并生成html
		strAll = strA + strB + strD;
		//document.write(strAll);
		divobj.innerHTML=strAll;
		// 从属性数组中读取各个项的id
		for (var w=0;w<arrContent.length;w++)
		{
			eval("arrid["+String(w)+"] = "+String("s"+srrAttribute[w][0])+"");
		}
		//将单击和双击事件绑定到最外div
		bm.onclick=function()
		{
			var oElement=event.srcElement;
			if(oElement.className=='contentlist')
				setText(oElement.innerText);
		}
		
		bm.ondblclick=function()
		{
			var oElement=event.srcElement;
			if(oElement.className=='contentlist')
				sendText(oElement.innerText);
		}		
		//bm.attachEvent("onclick",Function(methodlist[0]));
		//bm.attachEvent("ondblclick",Function(methodlist[0]));
}
// 控制快捷项目的隐藏和显示
function controler(obj)
	{
		for (var i=0;i<arrid.length;i++ )
		{
			if (obj==arrid[i])
			{
				if (arrid[i].className=="disabled")
				{
					if(arrid[i].style.display=='none')
					{
						arrid[i].style.display='inline';
					}else
					{
						arrid[i].style.display='none';
					}
				}
			}else
			{
				if(arrid[i].className=="disabled")
				{
					arrid[i].style.display='none';		
				}
			}
		}
}
//控制锁定状态
function changelock(obj,img)
	{
		window.event.cancelBubble = true;
		//改变图标形状
		if (img.src.indexOf("scroll.gif")!=-1)
		{
			img.src="img/manage/shortcut/lock.gif";
			img.title = "解除锁定";
		}else
		{
			img.src="img/manage/shortcut/scroll.gif";
			img.title = "锁定";
		}
		//改变菜单的类名
		if (obj.parentElement.parentElement.nextSibling.className=="disabled")
		{
			obj.parentElement.parentElement.nextSibling.className="enabled";
		}else
		{
			obj.parentElement.parentElement.nextSibling.className="disabled";
		}
}
//获取指定节点的节点文本值，并保存在数组中调用。
//o	xml对象
//n	节点
//l		m==1,节点文本，m==2节点属性
function GetXmlNodeSC(o,n,m)
	{
	var ns = o.selectSingleNode(n).childNodes;
	var arrNodes =new Array();

	if (m==1)
	{
		for (var i=0;i<ns.length;i++)
		{
			arrNodes[i] = new Array();
			for (var k=0;k<ns(i).childNodes.length;k++)
			{
				arrNodes[i][k]=ns(i).childNodes(k).getAttribute("text");
			}
		}
	}else if (m==2)
	{
		for (var i=0;i<ns.length;i++)
		{
			arrNodes[i] = new Array();
			for (var k=0;k<ns(i).attributes.length;k++)
			{
				arrNodes[i][k]=ns(i).attributes(k).value;
//window.alert(i+" "+k+" "+ns(i).attributes(k).value);
			}
		}
	}
	return arrNodes;
}