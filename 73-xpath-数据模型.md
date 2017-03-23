7.3 XPath数据模型
nn上下文
qq上下文是指当前处理器正在处理的节点的位置，该节点称为上下文节点（Context Node）
qq上下文不只包括上下文节点，也包括上下文位置、上下文大小等
<Book> <Chapter number=”1”>This is the first chapter</Chapter> <Chapter number=”2”>This is the second chapter</Chapter> <Chapter number=”3”>This is the third chapter</Chapter> <Chapter number=”4”>This is the fourth chapter</Chapter> <Chapter number=”5”>This is the fifth chapter</Chapter>
</Book>
7.3 XPath数据模型
nn所有节点之间存在文档序列
qq序列（Sequence）是W3C在XPath2.0中引入的一个新的概念
qqXPath1.0仅支持节点集（Node Set），表示由无重复的多个节点构成的无序的集合，而XPath2.0中的序列表示有序的、可包含重复值（节点和原子值）作为项（Item）的集合 nn(a, b, c)在XPath2.0中与(c, b, a)是不相同的两个序列，序列相等的条件是其中包含的项的个数相等，并且对应位置的项相等
7.3 XPath数据模型
nn所有节点之间存在文档序列
qq在Unix中常说“任何东西都是一个文件（Everything is a file）”，在Java中常说“任何东西都是一个对象（Everything is an object）”，而在XPath中则可以说“任何值都是一个序列（Every value is a sequence）”
qq在XPath2.0中，每个表达式的结果值都是由0个或者多个项（Item）组成的一个序列
7.3 XPath数据模型
nn所有节点之间存在文档序列
qq序列是一个递归的概念
nn序列是由0 个或者多个项（Item）组成的集合，并且是有序的集合
nn项本身也可以是一个序列，或者是原子值或节点
7.3 XPath数据模型
nn所有节点之间存在文档序列
qq文档序列是对文档中所有节点定义的一个序列，对应于在XML文档中每个节点的开始标记的出现顺序
qq一个元素节点出现在其所有子节点之前，一个元素属性节点和命名空间节点出现在其所有子节点之前，一个元素的命名空间节点出现在其属性节点之前
qq一个元素的多个命名空间节点之间的相对顺序依赖于实现，一个元素的多个属性节点之间的相对顺序也依赖于实现
7.3 XPath数据模型
nn所有节点之间存在文档序列
qq序列是一个有序的集合，并且序列中的每个项都具有一个对应的位置参数（Position）
qq序列S中的第一个项的位置为1，依次类推，可以使用count($S)来计算序列S中项的个数（即序列的长度），可以使用$S[i]来访问序列S中的第i项，可以用position()函数来确定当前项在序列中所处的位置

* 序列计算表达式 
①．序列构造表达式
序列是由( )所包含的一个列表，其中每个项之间使用“,”进行分隔 I．(10, 1, 2, 3, 4)构造一个包含5个整数的序列 II．( )构造一个不包含任何项的空序列 III．(1, 2, 4, 2) 构造一个包含取值相同的项的序列 IV．(1, <a>abc</a>)构造一个原子值和节点混合的序列 V．(10, (1, 2), ( ), (3, 4))实际上等于(10, 1, 2, 3, 4) VI．(10, 1 to 4)实际上等于(10, 1, 2, 3, 4)

②．序列筛选表达式
可以使用判定谓词对序列进行筛选 I．(1 to 100)[. mod 5 eq 0]获得1到100中能被5整除的数 II．$orders[fn:position() = (5 to 9)]取出$orders序列中第5到第9份订单

③．序列组合表达式
使用序列操作符union, intersect, except对两个序列进行并、交、差操作，所有这些运算，将从结果序列中删除重复的值 假设$seq1为(A, B)，$seq2为(A, B)，$seq3为(B, C)I．$seq1 union $seq2结果为(A, B) II．$seq1 intersect $seq3结果为(B) III．$seq1 except $seq3结果为(A)


XPath中节点代表XML文档的逻辑部分 qq根节点qq元素节点qq属性节点qq命名空间节点qq处理指令节点qq注释节点qq文本节点 7.3 XPath数据模型 nn节点的属性 qq名称nn一般说来，文档树中的每个节点都应该有一个名称，这个名称可以是简单的本地名称、或者使用命名空间名称进行限定的完整名称。在XPath中，提供了一个node-name()函数，可以返回指定节点的名称 nn对于元素节点，node-name()函数将返回元素的标记；对于属性节点，该函数将返回属性的名称；对于处理指令节点，该函数将返回处理指令的名称；对于命名空间节点，该函数将返回命名空间的前缀。但是，对于根节点、注释节点、文本节点，它们是没有名称的，所以node-name() 函数将返回一个空序列 namespace-uri() 可以返回节点的命名空间全称 7.3 XPath数据模型 nn节点的属性 qq字符串值nn每个节点都具有一个字符串值，实际上就是针对该节点使用XPath中的string()函数所得到的字符串结果 nn对于文本节点，其字符串值就是该文本节点的内容；对于属性节点，其字符串值就是该属性的取值。对于元素节点，其字符串值是将以该节点为根的子树的所有文本叶节点从左到右串联起来的结果 <para>Some <em>emphasis</em> here. </para> String(/para)=Some emphasis here. 7.3 XPath数据模型 nn节点的属性 qq标识nn对于XML文档树中的每个节点，系统将采用特定的方式对其进行标识，以便将一个节点与另一个节点区分开来，通常可以使用is操作符比较两个节点是否为同一个节点，而通过等值的比较是无法实现这一点的，因为它只能够判断两个节点的内容、结构是否相等 7.3 XPath数据模型 nnXPath的术语<library> <book> <chapter> </chapter> <chapter> <section> <paragraph/> <paragraph/> </section> </chapter> </book> </library>lllibrary元素是book元素的父元素，而book元素是两个chapter元素的父元素 ll两个chapter元素是book元素的子元素，并且section元素是第二个chapter元素的子元素 llbook元素的两个chapter子元素之间是兄弟关系，因为它们具有相同的父元素 lllibrary、book和第二个chapter是section的祖先元素 ll两个chapter元素、section元素以及两个paragraph元素，都是book元素的子树元素 ll这里使用了术语：父（parent）、子（child）、兄弟（sibling）、祖先（ancestor）、子孙（descendant）7.3 XPath数据模型 nn两种指示路径的方法qq绝对XPath表达式：以一个标准节点（一般为根节点）为起点qq相对XPath表达式：依赖于当前位置qqXPath中，起始点称为上下文（Context）qq所有合法的XPath代码都称为一个表达式（Expression），一个可返回一个节点集的XPath表达式称为定位路径（Location Path）nn定位路径用于在XPath树中从一个节点跳转到另一个节点，由定位步组成，每一步都由一个轴、节点测试和谓词组成nn定位XML文档中的一个指定节点，要将多个定位步组合，每一步代表一个搜索

* 操作系统中的路径与XPath路径表达式的类比
|在操作系统中（比如Unix/Linux操作系统）|在Xpath中|
|-|-|
|/表示根目录|/表示文档节点、/library表示根元素|
|/users/dir/foo表示users目录下dir目录中的foo文件，该文件只能有一个，这是绝对路径表示形式|/library/book/chapter/section表示library元素下的book元素下的chapter元素下的所有section（可能有多个）|
|foo表示当前目录下的foo文件，该文件只能有一个，这是相对路径表示形式|section表示当前元素的所有section子元素（可能有多个）|
|.表示当前目录|.表示当前元素|
|..表示父目录|..表示当前元素的父元素|
|/users/dave/*表示/users/dave目录中的所有文件|/library/book/chapter/*表示 /library/book/chapter下的所有元素|


使用轴和节点测试定位路径qq定位路径由一系列定位步骤序列组成，一个定位步骤由一个轴和一个节点测试组成，中间用“::”分隔，谓词在“[]”中nn轴名称::节点测试[谓词] 7.3 XPath数据模型 nn详写语法和简写语法qqXPath语法不是用XML语言表示nnXPath使用的语法类似于Unix/Linux表示路径的语法nnXPath表达式通常作为属性值nnXPath用XML表示难以实现文档的良构性7.3 XPath数据模型 nn详写语法和简写语法qq定位路径表达式可以分为相对位置路径表达式和绝对位置路径表达式，绝对位置路径表达式以/开头，后面跟的是相对位置路径表达式，或者直接是简写的绝对位置路径表达式；而相对位置路径表达式则由多个定位步（Step）构成，比如Step1/Step2/Step3 LocationPath ::= RelativeLocationPath | AbsoluteLocationPath (1)RelativeLocationPath ::= Step | RelativeLocationPath '/' Step | AbbrevRelativeLocationPath (2) AbsoluteLocationPath ::= '/'RelativeLocationPath? | AbbrevAbsoluteLocationPath (3)7.3 XPath数据模型 nn详写语法和简写语法qq每个定位步由三部分组成，轴标识符（A x i s Specifier）＋节点测试（Node Test）＋零个或多个谓词（Predicate*）nn轴标识符表示对于当前节点（因为是相对位置路径表达式）往哪个方向进行查找，节点测试则通过给出节点的名称指出要查找哪些节点（名称或者类型如何），而谓词表示对所查找到的节点按照指定的方式进行筛选 7.3 XPath数据模型 nn详写语法和简写语法 Step::=AxisSpecifier NodeTest Predicate* (4)AxisSpecifier::=AxisName '::'| AbbreviatedAxisSpecifier (5)AxisName::='ancestor'| 'ancestor-or-self'| 'attribute'| 'child'| 'descendant' | 'descendant-or-self' | 'following'| 'following-sibling'| 'namespace' | 'parent'| 'preceding'| 'preceding-sibling'| 'self' (6) NodeTest ::= NameTest | KindTest

* 详写语法和简写语法
 + 在编写XPath表达式时，尽量采用简写语法
|缩写形式|完整表示形式|
|（无）|等价于 child::|
|@|等价于 attribute::|
|.|等价于 self::node()|
|.//X|等价于 self::node/descendant-or-self::node()/child::X|
|..|等价于 parent::node()|
|..//X|等价于 parent::node()/child::X|
|//|等价于 /descendant-or-self::node()/|
|//X|等价于/descendant-or-self::node()/child::X|

* 轴（Axis）
 + 规定了定位步选择的节点和上下文节点之间的关系，也可用来指明集合中的节点顺序
 + 每个轴都有一个主节点类型，对应于轴选择的节点类型
    + 属性轴的主节点类型为属性，命名空间轴的主节点类型为命名空间，其他轴的主节点类型为元素

|轴名称|结果|
|self|选取上下文节点|
|parent|选取上下文节点的双亲节点|
|child|选取上下文节点的所有子元素（默认轴）|
|ancestor|选取上下文节点的所有先辈|
|ancestor-or-self|选取上下文节点的所有先辈及其本身|
|descendant|选取上下文节点的所有后代|
|descendant-or-self|选取上下文节点的所有后代及其本身|
|following|选取上下文节点的结束标签之后的所有节点|
|following-sibling|选取following轴中与上下文节点共享同一双亲的节点|
|preceding|选取上下文节点的开始标签之前的所有节点|
|preceding-sibling|选取preceding轴中与上下文节点共享同一双亲的节点|
|attribute|选取上下文节点的所有属性|
|namespace|选取上下文节点的所有命名空间节点|

* 示例
![](/assets/7_1.png)
* 节点测试
 + 轴从文档树中选择一组节点，节点测试是对该组节点进行测试
    + 依赖于用于在文档树中选择节点的轴的主节点类型
|节点测试|描述|
|-|-|
|*|选择同一主节点类型的所有节点|
|node()|选择所有节点|
|text()|选择文本节点|
|comment()|选择注释节点|
|processing-instruction|选择所有处理指令节点|
|节点名|按指定的节点选择所有节点|

节点测试
qq节点测试可以是名称测试或者类型测试 
qq名称测试表示根据指定的名称对当前节点进行测试；而类型测试则允许根据节点的类型、以及在Schema中定义的数据类型进行测试（仅适用于元素和属性节点）NodeTest ::= NameTest | KindTest 7.3 XPath数据模型 
nn节点测试
qq名称测试是非常常见的。在名称测试中，可以使用带命名空间限制的完整的元素名称；还可以用类型对节点进行测试。有些类型的节点（比如注释节点和文本节点）是没有名称的，所以无法使用名称测试，而只能使用类型测试的方式qq在节点测试的名称测试中，还可以使用通配符“*”，它可以匹配所有的元素节点/library/descendant::book表示查找/library元素的所有名为book的子孙节点/library/child::node()表示选择指定关系轴下的所有节点/library/book/text()表示查找book元素下的所有文本节点
7.3 XPath数据模型 
nn谓词
qq根据轴和节点测试得到的节点集，可由谓词来进一步过滤
qq谓词是XPath路径定位过程的一个可选步骤，在定位路径中可有多个谓词
qq谓词的形式为在方括号中加入谓词表达式
nn对节点集进行过滤时，根据节点在集合中的位置判断谓词表达式，当表达式为真时选择该节点，否则不选择//Section[@security=”confidential”] //Section[@security=”public”][@version=”final”] 7.3 XPath数据模型 nn谓词qq谓词使用方括号[]的形式表示，用于对指定关系轴的满足节点测试的所有节点，使用谓词中规定的条件进行筛选 
qq如果判定谓词部分为一个整数i（或者经过计算得到一个整数），则表示选择序列中的第i个元素/library/book[1]表示选择library中的第一个book元素，等价于/library/book[position()=1]/library/book[@name=“TCP/IP”] 表示选择属性name的值为"TCP/IP"的book元素 /library/book/chapter[last()-1]表示查找倒数第二个chapter元素
7.3 XPath数据模型 
nnXPath表达式综合示例I．//book/descendant::*表示所有book元素节点的所有子孙元素节点II．/library/book/chapter/*表示library的所有book元素节点的所有chapter元素节点的所有子元素节点III．//chapter[@num='3']表示所有的num属性等于3的chapter元素节点IV．/*/*/*/paragraph表示在XML文档树第4层中所有的paragraph元素节点V．/library/book[3]/following::*表示library的第3个book元素节点之后的所有节点VI．//chapter[not(@*)]表示所有不包含任何属性的chapter元素节点VII．//parent::*表示选出所有的分支节点（非叶节点）VIII．//chapter[count(section)=2]表示选出所有包含两个section的chapter元素



7.4 XPointer和XLink nnXPointer使超级链接可以指向XML文档中更多具体的部分（片断）nnXPointer使用XPath表达式在XML文档中进行定位nnXPointer为XML文档的横向路径定义了一个寻址方案，可以被任何要识别XML文档的一部分或一个位置的应用程序使用 nn是W3C推荐的解决链接到文档指定位置的问题的解决方案 7.4 XPointer和XLink nnXLink是用于在XML文档中创建超级链接的语言，为了提高和改善XML文档的链接能力设计的规范 nnXLink类似于HTML链接，但是更为强大 nnXML文档中的任何元素均可成为XLinknnXLink支持简单链接，也支持可将多重资源链接在一起的扩展链接 nn通过XLink，链接可在被链接文件外进行定义nn允许XML文档在多个文档之间创建链接关系，并创建与被链接文档相互独立的源文档 7.4 XPointer和XLink nnLink qq如果在这个世界上每部电脑中的每个资料块都能够被识别、定址及链接，那将是十分令人振奋的事 qqLink就是说明如何在网络上做到这点的规格文件 7.4 XPointer和XLink nnLink qq一个链接可以有一个、二个甚至是很多个ends，而每一个end都可以是指标，事实上链接本身可以很明确地指定是外部（externally）链接，因而连接到每一个endqq一个链接并不一定要有方向，但它也可以有很多或是没有方向，除此之外，链接的方向不要一定得从context到part才行 qq链接的end可以是某一范围，不一定是要链接到整个resource或某一地方 7.4 XPointer和XLink nnHTML超链接的局限性qq只能指向单个文档 qq链接是单向的 qq为了克服HTML超链接的局限性，W3C推荐使用两个新型的XML链接机制nnXLink和XPointer7.4 XPointer和XLink nnXLink尽可能与HTML超链接兼容 nn可指向指定的XML文档，结合XPointer可指向XML文档内部7.4 XPointer和XLink nn简单XLinkqq与HTML超链接功能类似，但不需定义专门的超链接元素，使用元素属性定义简单XLinkqqinline属性为true表示XLink将链接当前元素与其他元素，为false表示XLink将链接非当前元素的两个元素，默认为true qq使用href属性定义链接目标 nn可指向绝对/相对XML文档地址 <!ELEMENT MYLINK ANY> <!ATTLIST MYLINK xml:linkCDATA #FIXED “simple”> <!ELEMENT MYLINK ANY> <!ATTLIST MYLINK xml:linkCDATA #FIXED “simple” inline(true|false) “true”> <!ELEMENT MYLINK ANY> <!ATTLIST MYLINK xml:linkCDATA #FIXED “simple” inline(true|false) “true” hrefCDATA #REQUIRED> 7.4 XPointer和XLink nn简单XLinkqqhref链接的目标URI，用来指定链接的目标 qqrole给应用程序提供链接的补充说明的方法，使用XLink的应用程序可以通过查阅此属性来得到一个链接角色的信息 qqtitle可以指定一个给用户提供信息的标签，当该属性为系统和应用程序提供信息时，此属性为用户提供辅助的信息 <PARAGRAPH> This paragraph got a <MYLINK href=“http://www.w3.org/demo.xml”> link </PARAGRAPH>



