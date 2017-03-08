###1.2 XML的特点及技术


* XML可以作为电子数据交换的统一格式
* 控制信息采用标记（Tag）形式
* 对数据关系进行定义形成特有标准
* 减少数据依赖性
![](/assets/1.2.bmp)

####XML的定义

* XML是一种标记语言，用于表示包含结构信息的数据。
* XML is about moving all forms of data and its meaning from  many  types  of source to any kind of destination. 

####XML Related Technologies（XML相关技术）

* XML,  DTD,  Schema,  XSLT,  DOM,  PDOM,SAX,  XPATH, XQuery, …
* Web Service, RDF, WSDL, SOAP, SemanticWeb, Grid, Ontology, …
* XML Message, EAI, …
* CML, MathML, VoiceML, SVG, SMIL, DrML,ebXML, …

####Technologies Required(技术需求)

* HTML, JavaScript, PHP, Java, ...

* Database, SQL, ...

####XML 的十个设计目标
**  1. XML shall be straightforwardly usable over the Internet.   **
 
** 2. XML shall support a wide variety of applications.  **

** 3. XML shall be compatible with SGML.  **

** 4. It shall be easy to write programs that process XML  documents.  **

**  5. The number of optional features in XML is to be kept to  the absolute minimum, ideally zero.  **

** 6. XML documents should be human-legible and reasonably clear.  ** 

** 7. The XML design should be prepared quickly.  **

** 8. The design of XML shall be formal and concise.  **

** 9. XML documents shall be easy to create.  **

** 10. Terseness in XML markup is of minimal importance.  **

#### XML规范 
* W3C 制定了XML规范，并为其制定了一系列的支撑性技术规范，正是有了这些相关技术的辅助，才使得基于XML的数据表示、数据交换、数据存储成为可能。
* 要学习和掌握XML及其相关技术，第一步是学习W3C的XML规范。
* XML1.0规范非常简单，说明了XML文档的组成要素、以及如何编写一个正确的XML文档。

#### XML文档
* XML文档实际上是一个文本文件，但并不是任何文本文件都是正确的XML文档。
* 可以使用任何文本编辑器来编写XML文档。比如notepad.exe或者Word 。 
* 可以使用XMLSPY([](http://www.altova.com)http://www.altova.com)等XML集成开发环境

####一个XML示例文档 
* book.xml 
* 浏览器中的显示 

```
<?xml version="1.0" encoding="UTF-8"?>
<book year="1994">
    <title>TCP/IP Illustrated</title>
    <author>
        <last>Stevens</last>
        <first>W.</first>
    </author>
    <publisher>Addison-Wesley</publisher>
    <price>65.9</price>
</book>
```
#### XML的数据描述特点

* 文本形式适合于各种平台的数据交换

* XML文件由元素（Element）构成，使用有意义的标记（Tag）来描述元素

* 开始元素、结束元素、元素数据

* 自由定义标记名和关系XML的数据描述特点

* XML的特点主要包括四个方面：

* 可扩展性（Extensibility）——XML允许使用者创建和使用他们自己的标记而不是HTML的有限词汇表。

* 灵活性（Flexibility）——XML提供了一种结构化的数据表示方式，使得用户界面分离于结构化数据。所以，Web用户所追求的许多先进功能在XML环境下更容易实现。

####XML的数据描述特点

* 自描述性（Self-describing）——不仅人能读懂XML文档，计算机也能处理。
XML表示数据的方式真正做到了独立于应用系统，并且数据能够重用。

* 简洁性（Simplicity）——它只有SGML约20%的复杂性，但却具有SGML约80%的功能。XML比完整的SGML简单得多，易学、易用并且易实现。XML的实际应用

#### XML的实际应用
* XML成为一种与平台无关的、数据表示和数据交换的载体。

* XML被业界认为是最近数十年来最成功的IT技术之一，并广泛地应用于IT行业的各个领域。

* 元语言（Meta-Language）：定义语言的语言  

 + MML（Music ML，面向音乐领域的XML）、（Math ML，面向数学领域的XML）、ebXML（面向电子商务领域的XML）、CML（Chemical ML，面向化学领域的XML）等等，XML技术已经深入到自然科学和社会科学的各个领域。

####XML的不足之处
* XML的文本表现手法、标记的符号化等会导致XML数据量大 
* XML是数据描述技术，不是编程语言 
* 对大容量数据的检索效率不如关系型数据库 

####XML的主要相关技术分类 
* 处理XML的相关技术 
 + XML Processor (XML Parser)检查XML数据 
 + DOM, SAX, JDOM, DOM4J, ... 
 + 应用程序对XML树进行处理 
 + 定义XML数据结构、显示打印XML数据、XML数据结构变更、XML数据连接整合、程序操作XML树API和其他应用技术的组合。

* 定义XML数据结构的技术 
 + Schema: DTD, XML Schema 

* 显示和打印XML数据的技术 
 + 用CSS定义打印和显示排版信息 
 + 用XSLT转换到HTML进行显示和打印 
 + 用XSLT转换成XSL的Fomatter Object进行显示和打印
* XML数据结构转换技术 
 + 标准化的XML数据结构转换规则语言XSLT XML编程接口 
* Core SAX, DOM(W3C Standard model) 
* Microsoft XML Parser (MSXML) 
* Java : 
 + JDOM (Java DOM) 
 + JAXP (Java API for XML) 
 + TrAX (Transformation API for XML) 
 + JAXB (Java Architecture for XML Binding ) 
 + XML4J (XML for Java) 
 + ......
 
####XML与HTML的主要差异 
* HTML：展示信息，把内容按照一定格式展示出来 
* XML：装载数据，具体的信息，内容组织，描述数据结构 
* 在大多数Web应用程序中，XML用于存储及传输数据，HTML用于格式化并显示数据 
* HTML除了能够描述数据的显示方式之外，无法给出与数据相关的其他信息 XML与HTML的主要差异 
* XML是独立于软件和硬件的信息传输工具 
* XML和HTML为不同的目的而设计，XML被设计为传输和存储数据，其焦点是数据的内容
* HTML被设计用来显示数据，其焦点是数据的外观 
* HTML旨在显示信息，XML旨在传输及保存信息 
* ** XML不是HTML的替代品 **


