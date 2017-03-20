<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<script type="text/javascript" language="javascript" >
//运行文本域代码
function Preview(obj) {
    var TestWin=window.open('','',''); //打开一个窗口并赋给变量TestWin。
    TestWin.opener = null // 防止代码对论谈页面修改
    TestWin.document.write(obj.value); //向这个打开的窗口中写入代码code，这样就实现了运行代码功能。
    TestWin.document.close();
}
</script>
</head>
<BODY leftMargin=0 marginwidth="0" >
<TEXTAREA id=code1 style="WIDTH: 560px; HEIGHT: 200px"> 这里是你想运行的代码区域</TEXTAREA>
<BR>
<BUTTON onclick=Preview(code1)>Run</BUTTON>
</body>
</html>
http://10.10.1.254
