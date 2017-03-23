7.4 XPointer和XLink 
nn简单Xlinkqqxlink:show属性其他可能的值还包括other和none。other值的意思是使链接按具体的实现进行动作，并表示它应该在链接中寻找其他信息来表明它该如何动作。none值也是将链接的动作留给具体实现来决定，但它并不表示在链接内有何种暗示
7.4 XPointer和XLink 
nn简单Xlinkqqactuate属性定义了何时触发链接。它可以取以下两个值：
nnonRequest用户必须采取某些操作才能够触发链接。它类似于HTML超链接的工作方式，用户必须点击链接的文本才能够激活链接 
nnonLoad加载源文档时，链接将自动激活。当xlink:show属性为embedded时，该属性最有用，但是当xlink:show为new时，也可以使用该属性。例如，打开源文档时，自动打开另一个环境窗口，并加载目的信息
7.4 XPointer和XLink 
nn简单Xlinkqqtype指定作为一个元素被创建的链接的类型，分为：
nnsimple简单链接，类似html的超链接 
nnextendedresource允许创建一个指向多个文档的多向链接 
nnlocator指向远程资源 
nnarc描述两个链接之间的横向路径
<GOTO xlink:type=”simple” xlink:href=”http://www.123.com” xlink:title=”Address” xlink:show=”replace” xlink:actuate=”onRequest”> this is as linked element </GOTO>
 7.4 XPointer和XLink 
nn扩展XLinkqq把描述链接本身的属性与描述链接目标的属性分开 
qq父元素定义描述链接本身的属性，不同子元素定义各自的href属性，则不同子元素可共享相同的链接基本属性
 nn父元素称为扩展XLink元素，子元素称为XLink定位符
 <!ELEMENT MYEXTLINK ANY> <!ATTLIST MEXTLINK xml:linkCDATA #FIXED “extended” inline(true|false) “true” content-title CDATA #IMPLIED content-role CDATA #IMPLIED> <!ELEMENT MYEXTLOCATOR EMPTY> <!ATTLIST MEXTLOCATOR xml:linkCDATA #FIXED “locator” role CDATA #IMPLIED title CDATA #IMPLIED show(embed|replace|new) #IMPLIED actuate(auto|user) #IMPLIED behavior CDATA #IMPLIED> 
7.4 XPointer和XLink
 nn扩展XLinkqq扩展链接具有更复杂的链接功能，它可以：
nn链接两个以上的资源 
nn创建位于源文档以外的资源之间的链接（out-of-line-linking）nn从被链接资源的定义中分离出链接的方向
qq声明扩展链接时，会用到四种类型的子元素：<xlink:title>, <xlink:arc>, <xlink:locator>和<xlink:resource>，和一些属性：xlink:type, xlink:role,xlink:title, xlink:from, xlink:to
7.4 XPointer和XLink 
nn外联XLink
qq前面所介绍的链接（简单和扩展）都是内联链接。内联链接（如同HTML中的a元素）使用内联元素的内容作为包含链接的文档部分。通过这种方式展示给访问者 
qqXLink也可以是外联方式。外联链接可能不存在于它所连接的任何文档中，而是将链接保存在各个独立的链接文档中 
q要将链接标记为外联，可将xlink:inline属性设置成false值 
7.4 XPointer和XLink 
nn扩展XLink组
qq扩展链接组元素包含连接一组特定文档的链接。依靠扩展链接文档元素，组中的每个文档都作为目标来定位。应用程序负责推定如何激活组成员中的连接、并怎么理解这种连接。利用扩展链接组，可以在文档之间维护链接列表
7.4 XPointer和XLink
 nnXPointer由说明元素在XML文档中位置的名词来表达 
qq绝对位置：root表明整个文档的开始 
nn必须出现在XPointer的开始，即使在开始不注明绝对位置，也默认使用一个绝对位置 
qq相对位置：child表明上下文节点的子节点 
qq直接指定元素id 
qq前后两个相邻位置名词相同时，后一个可省略 child(3, #element) root().child(3, #element) 根元素的第三个⼦子元素id(ELEMENT).child(3, #element)(1, #element) id(ELEMENT).child(3, #element).child(1, #element) id为ELEMENT的第三个⼦子元素的第⼀一个⼦子元素
7.4 XPointer和XLink 
nnXPointer定位XML文档中的元素也是把整个XML文档看作一棵结构树，文档中每个元素都是树上的节点 
nn定位某个节点有不同的搜索路径 
qq通过根节点逐级搜索，通过元素id直接定位，通过父元素id先定位父元素再定位子元素 
qq根据不同情况选择合适的搜索路径（位置名词）

XPointer关于范围的定义
qq[Definition:point]表示在XML文档中的位置 
qq[Definition:range]表示一对points节点之间XML文档 
qq[Definition:location]表示包括points和range的节点集合 
qq[Definition:location-set]表示一个locations的集合 
qq[Definition:singleton]是对point和range的一个综合，一个point是一个singleton，一个range也是一个singletonqq[Definition:sub-resource]表示在文档中的一个特定的资源。这里的资源可以是一个特定的元素 
7.4 XPointer和XLink
 nnXPointer的绝对位置 
qqXPointer是根据位置项（location term）创建的。每个位置项指定目标文档中的一个点，通常为相对于某个其他已知点（如文档的开始或另一个位置项）。位置项的类型是由关键字如id()、root()或child()来给定。有些位置项在圆括号内有参数
nnroot()指向XML文档的根元素 
nnorigin()指向当前XPointer所在的元素
 nnhtml()用来与HTML文档兼容 
nnid()通过指定id属性的取值，精确快速定位XML中拥有绝对属性的元素
 nn元素必须有id属性，若无则只能使用其他绝对或相对位置定位 <a href=“#origin().ancestor(1, #element)”> <a name=“PointerName”> html(PointerName)定位指针指向的位置<list id=“possibilities”> id(possibilities)直接定位该元素
7.4 XPointer和XLink nnXPointer的绝对位置 
qq绝对位置项origin在与一个或多个相对位置项结合起来时才有用。在文档内的链接（即文档中的一处与同一文档中的另一处链接）中，常常需要引用“此元素后的下一个元素”或“此元素的父元素”。origin绝对位置项引用当前元素，因此这类引用是可能的 
7.4 XPointer和XLink 
nnXPointer的相对位置
 qq首先定义一个绝对位置作为基准，然后说明需定位的节点与基准的相对位置关系
 qq相对位置词说明相对于基准的搜索方式（如前后），节点类型说明搜索的目标节点类型（如元素），序号说明需定位的节点是按搜索方式搜索到的目标节点集合的第几个或全部（all）
qq可以是具体的属性名，也可以是* 
nn具体属性名限制该属性取值，*则只要求属性中有符合属性值要求的即可 
nn属性取值为*表示任意取值，为#implied表示取值必为#implied，也可是双引号表示的具体属性值 相对位置词(序号, 节点类型) 相对位置词(序号, 节点类型, 属性名, 属性取值) 
7.4 XPointer和XLink 
nnXPointer的相对位置 
qq节点类型 
qq具体元素名 
nn#element（默认类型）表示任一XML元素
nn#pi表示任一处理指令，只有string可使用 
nn#comment表示任一注释，只有string可使用 
nn#text表示XML元素内部文本内容，只有string可使用 
nn#cdata表示cdata内部文本内容，只有string可使用 
nn#all表示XML文档的所有节点，如果相对位置词同时具有属性名和属性值，则#all节点类型等同于#element 
7.4 XPointer和XLink nnXPointer的相对位置 
qq相对位置词 
nnchild为基准的直接子元素 
nndescendant为基准的子元素
 nnancestor为基准的祖先元素 
nnpreceding为基准前面的元素 
nnfollowing为基准后面的元素 
nnpsibling为preceding中的兄弟元素 
nnfsibling为following中的兄弟元素 
7.4 XPointer和XLink
 nnXPointer的相对位置 
qq其他位置 
nnspan表示两个指针所代表的元素之间的所有元素
nnattr表示所有拥有某属性的元素 
nnstring用来定位元素内某个字符串文本
qq字符串位置项指向指定字符出现的位置。不像大多数其他位置项那样，字符串位置项可以指向注释、CDATA以及类似方面内部的位置








