<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*"%>
<html>
<head>
<title>文件上传</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="Css/google20.css" rel="stylesheet" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">

  <table width="420" border="1" cellspacing="0" cellpadding="5" align="center" bordercolordark="#CCCCCC" bordercolorlight="#000000">
  <form name="form1" method="post" action="upfile.jsp" enctype="multipart/form-data" >
    <input type="hidden" name="act" value="upload">
	<input type="hidden" name="id" value="<%=request.getParameter("id")%>">
	<input type="hidden" name="editname" value="<%=request.getParameter("editname")%>">
	<input type="hidden" name="formname" value="<%=request.getParameter("formname")%>">
	<tr bgcolor="#CCCCCC"> 
      <th height="20" align="left" valign="middle" bgcolor="#E4F2FF" class="trYello">自定义头像上传</th>
    </tr>
    <tr align="center" valign="middle"> 
      <td height="33" align="left" id="upid">图片: 
      <input type="file" name="file1" size="30" class="tx1" value=""></td>
    </tr>
    <tr align="center" valign="middle"> 
      <td height="20"> 
        <input type="submit" name="Submit" value="· 提交 ·" >
        <input type="reset" name="Submit2" value="· 重置 ·" >      </td>
    </tr>
	</form>
</table>
</body>
</html>