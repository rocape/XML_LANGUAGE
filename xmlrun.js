function Preview(obj)
{
	var TestWin=window.open('','Test',''); //打开一个窗口并赋给变量TestWin。
	TestWin.opener = null // 防止代码对论谈页面修改
	var str1='<?xml version="1.0" encoding="UTF-8"?>';
	var str2='<?xml-stylesheet type="text/css" href="student.css"?>';
	var str3=str1+'\n'+str2+'\n'+obj.value;
	TestWin.document.write(str3); 
	TestWin.document.close();
}
