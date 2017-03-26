###9.1 DOM的概念和组成 
* DOM-Document Object Model，文档对象模型，应用程序标准接口，类似于数据库的ODBC/JDBC接口规范，编写应用程序只针对接口，无须考虑是什么数据库（ORACLE、SYBASE、DB2、SQL等）
* DOM功能：
 + 用来表示、操作文档的接口；
 + 接口具有规定的方法和属性；
 + 应用程序可以通过接口访问整个XML文档。
 + 利用DOM，开发人员可以:动态地创建文档；遍历文档结构；添加、修改、删除文档内容；改变文档的显示方式等。
* DOM的优缺点 
 + DOM的优势主要表现在：易用性强，使用DOM时，将把所有的XML文档信息都存于内存中，并且遍历简单，支持XPath，增强了易用性。
 + DOM的缺点主要表现在：效率低，解析速度慢，内存占用量过高，对于大文件来说几乎不可能使用。另外效率低还表现在大量的消耗时间，因为使用DOM进行解析时，将为文档的每个element、attribute、processing-instrUCtion和comment都创建一个对象，这样在DOM机制中所运用的大量对象的创建和销毁无疑会影响其效率。
* 文档模型
 + Java中的可用文档模型数一直在增加。除了DOM外，还有以下几种：


|JDOM|JDOM的目的是成为Java特定文档模型，JDOM仅使用具体类而不使用接口，并大量使用了集合类|
|-|-|
|dom4j|是JDOM的一种智能分支，包括集成的XPath支持、Schema支持以及用于大文档或流化文档的基于事件的处理|
|Electric XML（EXML）|是支持分布式计算的商业项目的附属产物，只能适当地支持XML文档的子集，它没有为验证提供任何支持并且有更严格的许可证|
|XML Pull Parser (XPP）|XPP只能适当支持XML文档的子集，并且不支持对文档提供验证|
####DOM的四个基本接口介绍
* Document接口
 + Document接口表示整个HTML或XML文档。它不仅指文档的根，并提供对文档数据的基本访问。Document接口是对文档进行操作的入口，它是从Node接口继承过来的。该接口位于org.w3c.dom包中。提供对文挡中数据进行访问和操作的入口
 + 该接口的常用方法有以下几种：
|Node adoptNode(Node source)方法|试图把另一文档中的节点采用到该文档中。|
|-|-|
|Attr createAttribute(String name)方法|根据给定的名称name创建Attr。|
|Element createElement(String tagName)方法|创建指定类型的元素。|
|Element getElementById(String element)方法|返回名为element的Element对象。|
|NodeList getElementsByTagName(String tagname)方法|按文档顺序返回包含在文档中且具有给定标记名称的所有元素的列表。|
|Node importNode(Node importedNode, boolean deep)方法|将另一文档的importedNode节点插入到该文档中，而不改变或移除原|
|Text createTextNode(String data)方法|根据给定字符串data创建Text节点。|

![](/assets/9_1.png)

* NodeList接口
 + NodeList接口提供对节点的有序集合的抽象，没有定义或约束如何实现此集合。该接口位于org.w3c.dom包中，NodeList对象是不断变化的。
主要方法有以下两个：
|int getLength()方法|列表中的节点数。|
|-|-|
|Node item(int index)方法|返回集合中的索引为index的节点。如果index大于或等于此列表中的节点数，则返回null。|
* Node接口
 + Node接口是其他大多数接口的父类，像Document、Element、Attribute、Text、Comment等接口都是从Node接口继承过来的。它表示该文档树中的单个节点。
 + 常用的方法有以下几种：
Node appendChild(Node newChild)方法：将节点newChild添加到此节点的子节点列表的末尾。NamedNodeMap getAttributes()方法：返回包含此节点的属性的NamedNodeMap对象；否则为null。Node getFirstChild()方法：此节点的第一个子节点。Node getLastChild()方法：此节点的最后一个节点。Node getNextSibling()方法：直接在此节点之后的节点。String getNodeValue()方法：此节点的值，取决于其类型；Node getParentNode()方法：此节点的父节点。Node removeChild(Node oldChild)方法：从子节点列表中移除oldChild所指示的子节点，并将其返回。注意：在DOM中每个元素的字符数据（元素值）也是一个Node对象。


NodeList和Node示例import javax.xml.parsers.*; import org.w3c.dom.*; public class TestNode{ public static void main(String args[ ]){ try{ DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); DocumentBuilder builder=factory.newDocumentBuilder(); Document doc=builder.parse("test.xml"); NodeList list=doc.getElementsByTagName("student"); for (int i=0;i<list.getLength();i++){ Element node=(Element)list.item(i); System.out.print("name: "); System.out.println (node.getElementsByTagName ("name").item(0).getFirstChild().getNodeValue()); System.out.print("age: "); System.out.println (node.getElementsByTagName("age"). item(0).getFirstChild().getNodeValue()); System.out.print("address: "); System.out.println (node.getElementsByTagName ("address").item(0).getFirstChild().getNodeValue()); System.out.println();} }catch(Exception e){e.printStackTrace();} } } 打印address元素的信息 打印元素name的信息打印age元素的信息 test.xml文件的内容如下：<class> <student> <name>zhangsan</name> <age>20</age> <address>china</address> </student> <student> <name>lisi</name> <age>25</age> <address>china</address> </student> </class> 运行效果图NamedNodeMap接口实现NamedNodeMap接口的对象用于表示可以通过名称访问的节点的集合。NamedNodeMap表示的是一组节点和其唯一名称的一一对应关系，这个接口主要用在属性节点的表示上。在实现NamedNodeMap的对象中所包含的Node对象还可以通过顺序索引进行访问，但并不意味着DOM指定这些节点的顺序。在DOM中NamedNodeMap对象也是不断变化的。NamedNodeMap接口主要方法 NamedNodeMap接口主要有以下几种方法：int getLength()方法：返回该NamedNodeMap对象中的节点数。Node getNamedItem(String name)方法：返回名称为name的节点。Node getNamedItemNS(String namespaceURI, String localName)方法：返回通过本地名称和名称空间URI所指定的节点。Node removeNamedItemNS(String namespaceURI, String localName)方法：移除通过本地名称和名称空间URI所指定的节点。Node item(int index)方法：返回索引值为index的项。Node removeNamedItem(String name)方法：移除名称为name的节点。Node setNamedItemNS(Node arg)方法：使用其namespaceURI和localName添加节点。

import javax.xml.parsers.*; import org.w3c.dom.*; public class TestNamedNodeMap{ public static void main(String args[ ]){ try{ DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); DocumentBuilder builder=factory.newDocumentBuilder(); Document doc=builder.parse("student.xml"); NodeList list=doc.getElementsByTagName("student"); for (int i=0;i<list.getLength();i++){ Node node=list.item(i); NamedNodeMap np=node.getAttributes(); System.out.println("第"+(i+1) +"个student元素的属性信息："); for(int j=0;j<np.getLength();j++){ Node attr=np.item(j); System.out.println(attr.getNodeName()+"=" +attr.getNodeValue()+""); } System.out.println(); }}catch(Exception e){e.printStackTrace();} } } 获得属性集合<class> <student id="A002" name="zhangsan" age="24"></student> <student id="D002" name="lisi" age="23"></student> </class> 运行效果图student.xml的文件内容如下：15/4/2216childNodesattributes Node ParentNode PreviouSibling (前1兄弟) nextSibling (后1兄弟) NodeList NameNodeMap DOM的使用使用DOM解析XML文档并打印<?xml version="1.0" encoding="UTF-8"?> <PEOPLE> <PERSON PERSONID="E01" age="30"> <NAME>Tony Blaa</NAME> <ADDRESS>10 Downing Street, London, UK</ADDRESS> <TEL>(061) 98765</TEL> <EMAIL>blair@everywhere.com</EMAIL> </PERSON> <PERSON PERSONID="E02" sex="F"> <NAME>Bill Clinton</NAME> <ADDRESS>White House, USA</ADDRESS> <TEL>(001) 6400 98765</TEL> <EMAIL>bill@everywhere.com</EMAIL> </PERSON> <PERSON PERSONID="E03" age="25"> <NAME>Tom Cruise</NAME> <ADDRESS>57 Jumbo Street, New York, USA</ADDRESS> <TEL>(001) 4500 67859</TEL> <EMAIL>cruise@everywhere.com</EMAIL> </PERSON> <PERSON PERSONID="E04" sex="F"> <NAME>Linda Goodman</NAME> <ADDRESS>78 Crax Lane, London, UK</ADDRESS> <TEL>(061) 54 56789</TEL> <EMAIL>linda@everywhere.com</EMAIL> </PERSON> </PEOPLE>



import javax.xml.parsers.*; import org.w3c.dom.*; public class DomJiexi1{ public static void main(String args[ ]){ try{ DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); DocumentBuilder builder=factory.newDocumentBuilder(); Document doc=builder.parse("candidate.xml");NodeList list=doc.getElementsByTagName("PERSON"); for (int i=0;i<list.getLength();i++){ Element node=(Element)list.item(i); NamedNodeMap np=node.getAttributes(); System.out.print("第"+(i+1) +"个PERSON元素的属性信息："); for(int j=0;j<np.getLength();j++){ Node attr=np.item(j); System.out.print("\t"+attr.getNodeName() + "="+ attr.getNodeValue()+""); } System.out.print("\n元素信息："); System.out.print("NAME: "); System.out.println (node.getElementsByTagName ("NAME").item(0).getFirstChild().getNodeValue()); System.out.print("ADDRESS: "); System.out.println (node.getElementsByTagName ("ADDRESS").item(0). getFirstChild().getNodeValue()); System.out.print("TEL: "); System.out.println (node.getElementsByTagName ("TEL").item(0).getFirstChild().getNodeValue()); System.out.print("EMAIL: "); System.out.println (node.getElementsByTagName ("EMAIL").item(0).getFirstChild().getNodeValue()); System.out.println(); }}catch(Exception e){ e.printStackTrace(); } } } 运行效果图 使用递归解析DOM树public void aaa(NodeList n){ for(int i=0;i<n.getLength();i++){ Node node=n.item(i); if(node.hasChildNodes()){ NodeList m=node.getChildNodes(); System.out.println(node.getNodeName()); this.aaa(m); }else{ if(!node.getNodeValue().trim().equals("")){ System.out.println("值：" + node.getNodeValue().trim()); } } } } 使用递归解析DOM树的主要思想是对节点进行递归，判断是否有子节点。如果有就打印出元素名，然后继续判断。反之就是字符数据，将其打印出来。如下：调用函数自身 建立和更新XML文档人工建立DOM树import javax.xml.parsers.*; import org.w3c.dom.*; import org.apache.crimson.tree.XmlDocument; public class JianXML1{ public static void main(String args[ ])throws Exception{ DocumentBuilderFactory factory= DocumentBuilderFactory.newInstance(); DocumentBuilder db=factory.newDocumentBuilder(); Document doc=db.newDocument(); //添加根元素 Element root=doc.createElement("person"); doc.appendChild(root); //添加元素“student”为“person”的子元素 Element e_student=doc.createElement("student"); root.appendChild(e_student); //为元素“student”添加属性 Attr a=doc.createAttribute("bianhao"); a.setNodeValue("A001"); e_student.setAttributeNode(a); Element e_name=doc.createElement("name"); e_student.appendChild(e_name); //为元素“name”添加字符数据信息 Text t=doc.createTextNode("zhangsan"); e_name.appendChild(t); //调用XmlDocument类的write()方法 XmlDocument xmldoc=(XmlDocument)doc; xmldoc.write(System.out); } }






使用JDOM编写XML文档import java.io.*; import org.jdom.*; import org.jdom.input.*; import org.jdom.output.*; public class TestJDOM2{ public void Create() { try { Document doc = new Document(); Element root = new Element("根元素"); doc.setRootElement(root); Element el1 = new Element("first"); el1.setAttribute("属性", "属性值"); Text text1=new Text("字符数据"); Element em = new Element("second").addContent("元素二"); el1.addContent(text1); el1.addContent(em); Element el2 = new Element("third").addContent("元素三"); root.addContent(el1); root.addContent(el2); XMLOutputter outputter = new XMLOutputter("\t",true); outputter.setEncoding("gb2312"); outputter.output(doc, System.out); }catch(Exception e) { System.out.println(e); } } public static void main(String args[ ]) { new TestJDOM2 ().Create(); } } 缩进，自动换行中文处理15/4/2228DOM应用 必须通过一种计算机语言,在WEB页面中，广泛使用的是：VBScriptVB的一个子集 JavaScript由sun和Netscape公司联合 推出的脚本语言 http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html15/4/2229W3C对DOM定义的支持 nnLevel 0:可使用JavaScript访问HTML nnLevel 1:允许访问除DTD、样式表以外，XML文档的所有部分 nnLevel 2:尚未推出，或许允许访问DTD、样式表、命名空间。15/4/2230DOM 结构模型 DOM对象映射了XML文档的树型结构 XML分析器对XML文档分析后，其中的信息被转化成一棵对象节点树。titleDocumenttitlebooksbookbookbook bookinfoRecomen- dationresumechapter bookinforesumeRecomen- dation capter authorpublishprice titlepara publisherISBNpubdate IDbookcategoryamountremainamount矩形表示节点 椭圆表示属性 根节点含根元素处理指令等 15/4/2231创建Document对象 nn对于VB：或者 qqDim xmlDom As DOMDocument qqSet xmlDom = New DOMDocument nn对于ASP(VBScript)：qqset xmlDom =Server.CreateObject("MSXML2.DOMDocument.4.0")15/4/2232创建Document对象 <SCRIPT language="VBScript"> set xmlDom = CreateObject("MSXML2.DOMDocument.4.0") xmlDom.async = "false" xmlDom.load("code9_1.xml") for each ddd in xmlDom.documentElement.childNodes document.write("<TR><TD>" & ddd.nodename & "</TD>") document.write("<TD>" & ddd.text & "</TD></TR>") next </SCRIPT>建立XML DOM对象 15/4/2233创建Document对象 <SCRIPT language="VBScript"> set xmlDom = CreateObject("MSXML2.DOMDocument.4.0") xmlDom.async = "false" xmlDom.load("code9_1.xml") for each ddd in xmlDom.documentElement.childNodes document.write("<TR><TD>" & ddd.nodename & "</TD>") document.write("<TD>" & ddd.text & "</TD></TR>") next </SCRIPT>设置xmlDom的async为false,即异步为假，保证XML解析器暂停执行，直到XML文件加载完成15/4/2234创建Document对象 <SCRIPT language="VBScript"> set xmlDom = CreateObject("MSXML2.DOMDocument.4.0") xmlDom.async = "false" xmlDom.load("code9_1.xml") for each ddd in xmlDom.documentElement.childNodes document.write("<TR><TD>" & ddd.nodename & "</TD>") document.write("<TD>" & ddd.text & "</TD></TR>") next </SCRIPT>加载XML文件 15/4/2235创建Document对象 <SCRIPT language="VBScript"> set xmlDom = CreateObject("MSXML2.DOMDocument.4.0") xmlDom.async = "false" xmlDom.load("code9_1.xml") for each ddd in xmlDom.documentElement.childNodes document.write("<TR><TD>" & ddd.nodename & "</TD>") document.write("<TD>" & ddd.text & "</TD></TR>") next </SCRIPT>加载的XML文件名 任何XML文件都可加载 15/4/2236创建Document对象 <SCRIPT language="VBScript"> set xmlDom = CreateObject("MSXML2.DOMDocument.4.0") xmlDom.async = "false" xmlDom.load("code9_1.xml") for each ddd in xmlDom.documentElement.childNodes document.write("<TR><TD>" & ddd.nodename & "</TD>") document.write("<TD>" & ddd.text & "</TD></TR>") next </SCRIPT>
