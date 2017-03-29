###DOM简介
####了解DOM 
* DOM是Document Object Model的缩写，即文档对象模型。W3C已于2000年11月13日推出了DOM level 2规范。DOM是HTML和XML文档的编程接口规范，它与平台和语言是无关的，因而可以用各种语言和在各种平台上实现。该模型定义了HTML和XML文件在内存中文档结构，提供了对HTML和XML文件的访问、存取方法。利用DOM规范，可以实现DOM文档和XML之间的相互转换，对相应DOM文档的内容进行遍历或其他操作。如果要自由的操纵XML文件，就要用到DOM规范。DOM的原理简单的说，就是通过解析XML文档，为XML文档在逻辑上建立一个树模型，树的节点是一个个对象。我们通过存取这些对象就能够操作XML文档中的内容了。

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
<body leftMargin=0 marginwidth="0" >
<textarea id=code1 style="WIDTH: 560px; height: 200px"> 请输入代码</textarea>
<br/>
<button onclick=Preview(code1)>Run</button>
</body>



http://10.10.1.254





