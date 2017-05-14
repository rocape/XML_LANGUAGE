## 第一章 XML的技术背景及其发展
 
### 1.1什么是XML
如今互联网高速发展和普及，人们通过计算机与互联网相连来获得和发送大量的信息，然而在信息交换过程中，存在着一个突出的问题，即多种多样的数据格式给信息的有效使用带来了很大的不便，必须找一种能够描述任何逻辑关系的数据格式来统一电子数据的表示，从而解决数据格式不统一的问题，这样就出现了XML。XML是可扩展的标记语言（eXtensible Markup Language）的缩写.它的出现给数据表示、交换、存储乃至整个IT行业带来了一场革命。

1.1 XML的发展史

* 专用数据格式：Proprietary Data Format（与生成厂商、平台密切相关）

* Standard Generalized Markup Language（SGML）

* Hypertext Markup Language （HTML）

* Dynamic Hypertext Markup Language（DHTML）

* eXtensible Hypertext Markup Language （XHTML）

* eXtensible Markup Language （XML）


### 标记语言（ML）的发展过程

**1.SGML （Standard Generalized Markup Language）**

* SGML是一种通用的文档结构描述符号化语言，主要用来定义文献模型的逻辑和物理结构，一个SGML语言文件由三部分组成，即语法定义，文件类型定义DTD和文件实例。

* SGML过于庞大复杂（标准手册有500多页），难以理解和学习，进而影响其推广与应用。因此，真正大行其道的是SGML的一些子集（面向某些领域进行了优化和精简），比如随后的HTML和XML。


**2.1989年，欧洲物理量子实验室（CERN）发明了超文本链接语言，使用它能够轻松地将文字、图形嵌入到网页或其他文件中，这是HTML前身。**

* HTML \(Hypertext Markup Language\)是SGML的一种实际应用，其DTD作为标准被固定下来。因此，HTML的功能单一，只能用于编写网页，而不能作为定义其它符号化语言的元语言。

* 经历了HTML 1.0、HTML 2.0、HTML 3.0和HTML 4.0等多个版本，同时DHTML（ 动态HTML实际上是script+css+html）、VHTML（虚拟HTML用于在浏览器中浏览三维对象的技术）、SHTML（一种服务器API）等技术逐步出现。


### 标记语言存在的问题

* HTML包含许多内置标记，比如&lt;head&gt;、&lt;table&gt;等都是在HTML 4.0里规范和定义。每一种标记的意义都非常明确，用于表示如何在浏览器中显示相应的数据，比如使用表格、或者采用粗体字体。

```
    <html> 
    <head> <title>Title of page</title> </head>
    <body> This is my first homepage. <br/>
    <b>Hello World!</b>
    </body>
    </html>
```

* 当然，HTML也无法解决所有信息的显式，比如化学
  公式、音乐符号等其他形态的内容。

* 一方面，随着Web的飞速发展，网络成为了一个庞大的数据库，人们需要从中搜索、甄别、挑选出自己感兴趣的信息。

* 另一方面，对于HTML文档来说，除了便于在浏览器中进行显示之外，要使用计算机程序对其进行复杂的处理非常困难。

* 为了解决前面提出的问题，专家们使用SGML标准并依照HTML的发展经验，提出一套使用上规则严谨，但是语法简单的信息描述语言：XML（eXtensible Markup Language）。

* XML的目的是以一种更中立的方式，让用户自行决定要如何理解、呈现从服务端所提供的信息，而着重表示数据以及数据之间的联系

