 <html>
 <head>
 <meta http-equiv="Content-Type" content="text/html; charset=gb2312">

 <title>网页中运行代码的实现方法 </title>

 <script type="text/javascript" language="javascript" >

 //运行文本域代码

 function Preview(obj) {

 var TestWin=window.open('','',''); //打开一个窗口并赋给变量TestWin。

 TestWin.opener = null // 防止代码对论谈页面修改

 TestWin.document.write(obj.value); //向这个打开的窗口中写入代码code，这样就实现了运行代码功能。

 TestWin.document.close();

 }

 //复制文本域代码

 function copyCode(obj) {

 var rng = document.body.createTextRange();

 rng.moveToElementText(obj);

 rng.scrollIntoView();

 rng.select();

 rng.execCommand("Copy");

 rng.collapse(false);

 }

 //另存文本域代码

 function saveCode(obj) {

 var winname = window.open('', '_blank', 'top=10000');

 winname.document.open('text/html', 'replace');

 winname.document.writeln(obj.value);

 winname.document.execCommand('saveas','','启步网,网络、IT(挨踢)职业游民学习娱乐之家.htm');

 winname.close();

 }

 //收藏本页代码

 function addBookmark(title,url) {

 if (window.sidebar) {

 window.sidebar.addPanel(title, url,"");

 } else if( document.all ) {

 window.external.AddFavorite(url,title);

 } else if( window.opera && window.print ) {

 return true;

 }

 }

 </script>

 </head>

 <BODY leftMargin=0 marginwidth="0" >

 <TEXTAREA id=code1 style="WIDTH: 560px; HEIGHT: 200px">

 这里是你想运行的代码区域

 </TEXTAREA>

 <BR><BUTTON onclick=Preview(code1)>运行代码</BUTTON><BUTTON

 onclick=copyCode(code1)>复制代码</BUTTON><BUTTON

 onclick=saveCode(code1)>另存代码</BUTTON><BUTTON

 onclick=addBookmark(document.title,location.href)>收藏本页</BUTTON>

 </body>

 </html>
