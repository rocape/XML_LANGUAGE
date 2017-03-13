###4.3 XML DTD声明 
* 在XML中使用DTD有三种方式
 + 内部DTD（Internal Subset Declaration）：直接插入XML文档中和XML放在一起。
 + 外部DTD（External Subset Declaration）：使用外部独立的DTD文件。
 + 混合方式：同时使用上述两种方法，建立更为复杂的DTD。
* DTD声明以“<!DOCTYPE”开始，以“>”结束。

* 内部DTD qqDTD在XML文档的序言区域中定义时，使用内部的DTD声明
 +  <!DOCTYPE 根元素[元素描述]> 
 + 根元素指定DTD根元素名称，一个XML文档有且只有一个根元素
 + 如果XML文档中使用了DTD，则文档的根元素必须在DTD中指定` <?xml version=“1.0” ?>` `<!DOCTYPE 根元素[元素描述]> 文档数据区...... `

* 内部DTD 
 + 文档类型声明（DOCTYPE）通知解析器本XML文档需要与一个DTD文件一起使用
 + 在XML文档使用DTD时，DOCTYPE必须放在文档的开头，只允许XML声明语句在它前面
 + DOCTYPE声明语句的第一个字符必须是“!”
 + XML推荐标准规定，声明元素必须以“!”开头
 + 声明元素是DTD的一部分，不允许出现在XML主体内容中
 + 紧跟在DOCTYPE后面的是DTD定义的主体 

* 内部DTD 
 + 紧跟在DOCTYPE后面的是DTD定义的主体，声明元素、属性、实体和注释
 + 声明的元素组成了<name>文档的词汇
 + “]>”是DTD声明的结束符，结束DTD文档类型定义，XML文档紧接其后 
```
<!ELEMENT name (first, middle, last)>
<!ELEMENT first (#PCDATA)>
<!ELEMENT middle (#PCDATA)>
<!ELEMENT last (#PCDATA)>
```

```
<?xml version=“1.0”?>
<!DOCTYPE name [ <!ELEMENT name (first, middle, last)> <!ELEMENT first (#PCDATA)>
<!ELEMENT middle (#PCDATA)> 
<!ELEMENT last (#PCDATA)> ]>
    <name> 
        <first>John</first> 
        <middle>Fitzgerald Johansen</middle>
         <last>Doe</last>
    </name> 
```
```
<html>
 <body>
 <h3>This demonstrates a parser error:</h3>
 <script type="text/javascript">
 varxmlDoc= new ActiveXObject("Microsoft.XMLDOM")
 xmlDoc.async="false" xmlDoc.validateOnParse="true"
 xmlDoc.load("./name2.xml")
 document.write("<br/>Error Code: ")
 document.write(xmlDoc.parseError.errorCode)
 document.write("<br/>Error Reason: ")
 document.write(xmlDoc.parseError.reason)
 document.write("<br/>Error Line: ")
 document.write(xmlDoc.parseError.line)
 </script>
 </body>
</html>
```



