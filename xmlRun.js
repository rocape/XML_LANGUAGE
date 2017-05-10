function Preview(obj) {
 var TestWin=window.open('','',''); //打开一个窗口并赋给变量TestWin。
 TestWin.opener = null // 防止代码对论谈页面修改
 TestWin.document.write(obj.value); //向这个打开的窗口中写入代码code，这样就实现了运行代码功能。
 TestWin.document.close();
}
