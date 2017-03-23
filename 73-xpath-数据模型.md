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











