###7.4 XPointer和XLink 
* 设计XML指针语言（XML Pointer Language, XPointer）的目的是为了使用XML链接语言（XML Link Language, XLink）
 + http://www.w3.org/XML/Linking nnXLink定义了一套标准的在XML文档中创建超级链接的方法 
* XPointer使超级链接可以指向XML文档中更多具体的部分（片断）
* 2001年XLink被确立为W3C推荐标准，2003年XPointer成为W3C推荐标准 
* XPointer使超级链接可以指向XML文档中更多具体的部分（片断）
* XPointer使用XPath表达式在XML文档中进行定位
* XPointer为XML文档的横向路径定义了一个寻址方案，可以被任何要识别XML文档的一部分或一个位置的应用程序使用 
* 是W3C推荐的解决链接到文档指定位置的问题的解决方案 
* XLink是用于在XML文档中创建超级链接的语言，为了提高和改善XML文档的链接能力设计的规范
* XLink类似于HTML链接，但是更为强大 
* XML文档中的任何元素均可成为XLink
* XLink支持简单链接，也支持可将多重资源链接在一起的扩展链接 
* 通过XLink，链接可在被链接文件外进行定义
* 允许XML文档在多个文档之间创建链接关系，并创建与被链接文档相互独立的源文档 
* Link 
 + 如果在这个世界上每部电脑中的每个资料块都能够被识别、定址及链接，那将是十分令人振奋的事 
 + Link就是说明如何在网络上做到这点的规格文件 
 + 一个链接可以有一个、二个甚至是很多个ends，而每一个end都可以是指标，事实上链接本身可以很明确地指定是外部（externally）链接，因而连接到每一个end
 + 一个链接并不一定要有方向，但它也可以有很多或是没有方向，除此之外，链接的方向不要一定得从context到part才行 
 + 链接的end可以是某一范围，不一定是要链接到整个resource或某一地方 
* HTML超链接的局限性
 + 只能指向单个文档 
 + 链接是单向的 
 + 为了克服HTML超链接的局限性，W3C推荐使用两个新型的XML链接机制
    + XLink和XPointer
* XLink尽可能与HTML超链接兼容 
* 可指向指定的XML文档，结合XPointer可指向XML文档内部
* 简单XLink
 + 与HTML超链接功能类似，但不需定义专门的超链接元素，使用元素属性定义简单XLink
```
<!ELEMENT MYLINK ANY>
<!ATTLIST MYLINK xml:linkCDATA #FIXED “simple”> 
```
 + inline属性为true表示XLink将链接当前元素与其他元素，为false表示XLink将链接非当前元素的两个元素，默认为true 
```
<!ELEMENT MYLINK ANY>
<!ATTLIST MYLINK xml:linkCDATA #FIXED “simple” inline(true|false) “true”>
```
 + 使用href属性定义链接目标 
    + 可指向绝对/相对XML文档地址 
```
 <!ELEMENT MYLINK ANY> <!ATTLIST MYLINK xml:linkCDATA #FIXED “simple” inline(true|false) “true” hrefCDATA #REQUIRED>
```
 + href链接的目标URI，用来指定链接的目标 
 + role给应用程序提供链接的补充说明的方法，使用XLink的应用程序可以通过查阅此属性来得到一个链接角色的信息 
 + title可以指定一个给用户提供信息的标签，当该属性为系统和应用程序提供信息时，此属性为用户提供辅助的信息 
```
<PARAGRAPH> 
This paragraph got a 
<MYLINK href=“http://www.w3.org/demo.xml”> link 
</PARAGRAPH> 
```
 + show属性定义了如何向用户显示目标内容。常取以下三个值：
    + new目标内容应该显示在独立的环境中（对于浏览器，应该是新的浏览器窗口），将xlink:show属性设置为new，与HTML中target="_blank"的意思是一样的 
    + replace目标内容应该替换原来环境中的源内容，对于浏览器，这是超链接的常规特征 
    + embedded内容应该嵌入源文档的链接位置，选择embedded与在HTML页面中嵌入一张图片非常相似，目标资源将源文档中定义的链接替换掉
    + xlink:show属性其他可能的值还包括other和none。other值的意思是使链接按具体的实现进行动作，并表示它应该在链接中寻找其他信息来表明它该如何动作。none值也是将链接的动作留给具体实现来决定，但它并不表示在链接内有何种暗示
 + actuate属性定义了何时触发链接。它可以取以下两个值：
    + onRequest用户必须采取某些操作才能够触发链接。它类似于HTML超链接的工作方式，用户必须点击链接的文本才能够激活链接 
    + onLoad加载源文档时，链接将自动激活。当xlink:show属性为embedded时，该属性最有用，但是当xlink:show为new时，也可以使用该属性。例如，打开源文档时，自动打开另一个环境窗口，并加载目的信息
 + type指定作为一个元素被创建的链接的类型，分为：
    + simple简单链接，类似html的超链接 
    + extendedresource允许创建一个指向多个文档的多向链接 
    + locator指向远程资源 
    + arc描述两个链接之间的横向路径
```
<GOTO 
xlink:type=”simple” 
xlink:href=”http://www.123.com” 
xlink:title=”Address” 
xlink:show=”replace” 
xlink:actuate=”onRequest”> 
this is as linked element 
</GOTO> 
```
* 扩展XLink
 + 把描述链接本身的属性与描述链接目标的属性分开 
 + 父元素定义描述链接本身的属性，不同子元素定义各自的href属性，则不同子元素可共享相同的链接基本属性
    + 父元素称为扩展XLink元素，子元素称为XLink定位符 
<!ELEMENT MYEXTLINK ANY> <!ATTLIST MEXTLINK xml:linkCDATA #FIXED “extended” inline(true|false) “true” content-title CDATA #IMPLIED content-role CDATA #IMPLIED> <!ELEMENT MYEXTLOCATOR EMPTY> <!ATTLIST MEXTLOCATOR xml:linkCDATA #FIXED “locator” role CDATA #IMPLIED title CDATA #IMPLIED show(embed|replace|new) #IMPLIED actuate(auto|user) #IMPLIED behavior CDATA #IMPLIED>

 + 扩展链接具有更复杂的链接功能，它可以：
    + 链接两个以上的资源 
    + 创建位于源文档以外的资源之间的链接（out-of-line-linking）
    + 从被链接资源的定义中分离出链接的方向
 + 声明扩展链接时，会用到四种类型的子元素：`<xlink:title>`, `<xlink:arc>`,` <xlink:locator>`和`<xlink:resource>`，和一些属性：xlink:type, xlink:role,xlink:title, xlink:from, xlink:to

* 外联XLink
 + 前面所介绍的链接（简单和扩展）都是内联链接。内联链接（如同HTML中的a元素）使用内联元素的内容作为包含链接的文档部分。通过这种方式展示给访问者 
 + XLink也可以是外联方式。外联链接可能不存在于它所连接的任何文档中，而是将链接保存在各个独立的链接文档中 
 + 要将链接标记为外联，可将xlink:inline属性设置成false值 
* 扩展XLink组
 + 扩展链接组元素包含连接一组特定文档的链接。依靠扩展链接文档元素，组中的每个文档都作为目标来定位。应用程序负责推定如何激活组成员中的连接、并怎么理解这种连接。利用扩展链接组，可以在文档之间维护链接列表
* XPointer由说明元素在XML文档中位置的名词来表达 
 + 绝对位置：root表明整个文档的开始 
    + 必须出现在XPointer的开始，即使在开始不注明绝对位置，也默认使用一个绝对位置 
 + 相对位置：child表明上下文节点的子节点 
 + 直接指定元素id 
 + 前后两个相邻位置名词相同时，后一个可省略
child(3, #element) 
root().child(3, #element) 
根元素的第三个⼦子元素

id(ELEMENT).child(3, #element)(1, #element)
id(ELEMENT).child(3, #element).child(1, #element) 
id为ELEMENT的第三个⼦子元素的第⼀一个⼦子元素

* XPointer定位XML文档中的元素也是把整个XML文档看作一棵结构树，文档中每个元素都是树上的节点 
* 定位某个节点有不同的搜索路径 
 + 通过根节点逐级搜索，通过元素id直接定位，通过父元素id先定位父元素再定位子元素 
 + 根据不同情况选择合适的搜索路径（位置名词）

* XPointer关于范围的定义
 + [Definition:point]表示在XML文档中的位置 
 + [Definition:range]表示一对points节点之间XML文档 
 + [Definition:location]表示包括points和range的节点集合 
 + [Definition:location-set]表示一个locations的集合 
 + [Definition:singleton]是对point和range的一个综合，一个point是一个singleton，一个range也是一个singleton
 + [Definition:sub-resource]表示在文档中的一个特定的资源。这里的资源可以是一个特定的元素 
* XPointer的绝对位置 
 + XPointer是根据位置项（location term）创建的。每个位置项指定目标文档中的一个点，通常为相对于某个其他已知点（如文档的开始或另一个位置项）。位置项的类型是由关键字如id()、root()或child()来给定。有些位置项在圆括号内有参数
    + root()指向XML文档的根元素 
    + origin()指向当前XPointer所在的元素
    + html()用来与HTML文档兼容 
    + id()通过指定id属性的取值，精确快速定位XML中拥有绝对属性的元素
    + 元素必须有id属性，若无则只能使用其他绝对或相对位置定位 
* XPointer的绝对位置 
 + 绝对位置项origin在与一个或多个相对位置项结合起来时才有用。在文档内的链接（即文档中的一处与同一文档中的另一处链接）中，常常需要引用“此元素后的下一个元素”或“此元素的父元素”。origin绝对位置项引用当前元素，因此这类引用是可能的 
* XPointer的相对位置
 + 首先定义一个绝对位置作为基准，然后说明需定位的节点与基准的相对位置关系
 + 相对位置词说明相对于基准的搜索方式（如前后），节点类型说明搜索的目标节点类型（如元素），序号说明需定位的节点是按搜索方式搜索到的目标节点集合的第几个或全部（all）
 + 可以是具体的属性名，也可以是* 
    + 具体属性名限制该属性取值，*则只要求属性中有符合属性值要求的即可 
    + 属性取值为*表示任意取值，为#implied表示取值必为#implied，也可是双引号表示的具体属性值
 + 节点类型 
 + 具体元素名 
    + #element（默认类型）表示任一XML元素
    + #pi表示任一处理指令，只有string可使用 
    + #comment表示任一注释，只有string可使用 
    + #text表示XML元素内部文本内容，只有string可使用 
    + #cdata表示cdata内部文本内容，只有string可使用 
    + #all表示XML文档的所有节点，如果相对位置词同时具有属性名和属性值，则#all节点类型等同于#element 
 + 相对位置词 
    + child为基准的直接子元素 
    + descendant为基准的子元素
    + ancestor为基准的祖先元素 
    + preceding为基准前面的元素 
    + following为基准后面的元素 
    + psibling为preceding中的兄弟元素 
    + fsibling为following中的兄弟元素 
 + 其他位置 
    + span表示两个指针所代表的元素之间的所有元素
    + attr表示所有拥有某属性的元素 
    + string用来定位元素内某个字符串文本
        + 字符串位置项指向指定字符出现的位置。不像大多数其他位置项那样，字符串位置项可以指向注释、CDATA以及类似方面内部的位置