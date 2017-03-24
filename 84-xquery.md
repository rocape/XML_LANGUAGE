8.4 XQuery 
nnXQuery（XML Query）是一种专门用于XML半结构化数据的查询语言，W3C于2007年1月23日正式发布了XQuery 1.0规范（XQuery1.0: An XML Query Language，http://www.w3.org/TR/xquery/）。
nn与其他半结构化数据查询语言相比，由于它是W3C的推荐标准，所以受到了业界广泛的支持。目前，由不同的软件提供商所实现的XQuery软件包大约有40多种，适用于不同的开发语言、平台和环境。XML数据查询语言
nn对于XML数据，查询语言的基本任务与关系数据库查询语言是相同的，主要包括如下几个方面：

qq检索数据
qq聚集或汇总数据
qq连接来自不同数据源的数据
qq插入新的数据、更新或删除已有的数据
qq修改数据本身的结构
qq支持某些过程操作从结构化数据查询语言SQL到半结构化查询语言XQuery
nnSQL结构化查询语言是用于关系数据库系统的标准查询语言，包括数据定义语言DDL、数据操纵语言DML、数据控制语言DCL。
nn关系数据和半结构化所使用的底层数据结构完全不同，无法使用原有的SQL。

* 关系数据与XML数据之间的区别
||关系数据|XML数据|
|-|-|-|
|整体组成|由表、记录、字段组成。它们满足严格的数据库模式定义，具有明确的结构特征。|由元素、属性、文本、处理指令、XML声明、注释等内容组成;与数据库表相比，结构松散。|
|每个数据单元的内容模型|每条记录由若干个字段构成，必须是能够唯一标识的。|每个节点可以包含具有层次结构混合内容，即由属性、文本、子元素等构成。不需要单独使用唯一的标识，它在整个文档树中所处的位置可以标识该节点。|
|查询结果|记录和字段的顺序无关紧要。|顺序是非常重要的。|

SQL/XML 
nnISO/IEC 9075系列标准的最新版本SQL 2003中，作为其中的第14部分“XML相关规范（SQL/XML）”，第一次在SQL语言中正式引入了XML技术，它指出通用数据库管理系统应如何支持XML的存储、检索、转换，为基于XML的数据库应用的开发、集成、部署和运行提供了完整的集成解决方案。
nn这些SQL/XML功能的作用是将存储于关系数据库表结构中的数据映射为XML层次结构，而并不是对原始的XML数据进行查询检索。

XML 数据查询语言的特征 nn平台一致性nn面向XML 的（XML-Centric）nn具备集合处理的能力nn易于使用nn广泛的适应性XQuery 的诞生nn关系数据库中的SQL/XML无法完成对半结构化数据的查询检索。因此，出现了许多的半结构化数据查询语言，包括XQL、XML-QL、XSQL、UnQL、StruQL、YATL、LOREL以及Quilt，其中Quilt 是XQuery的前身。nnQuilt最初作为用户级语法的测试工具，在定义需求、用例以及底层数据模型和代数方面进行了很多积极的努力，它本身借用了其他半结构化查询语言的一些优点，比如引入了路径表达语法、引入了变量绑定、提供了构造查询结果的语句、支持嵌套查询等。XQuery 1.0 nn2007年初，XML查询工作组提交了正式的XQuery 1.0 规范。nnXQuery是一种用于文件和数据库中基于XML文档内容的新型查询语言，构建于Quilt 查询语言的基础之上，从而综合了其他一些查询语言的优势和特点。nnXQuery是由一些SQL专家制订，它的出现是因为SQL这种用于关系数据查询的语言无法完美地处理XML文档。XQuery的特点 nn作为W3C发布的一种规范，Xquery与W3C所发布的其他规范之间具有很好的兼容性，比如XQuery使用与XML Schema一致的内置数据类型系统、并支持使用XML Schema提供自定义的类型信息、XQuery 1.0依靠XPath2.0路径表达式进行对层次化文档的操作、XQuery 1.0与XPath2.0使用一组公共的操作符和函数。nn与XSLT相比，XQuery具有以下的特征：qq易于使用qq更加简洁qq强类型语言qq更广泛地使用场景XQuery 基本语法和相关概念nnXQuery相当于查询XML数据的SQL语言，并且XQuery规范本身就是由一些SQL专家们制订，所以它的基本语法与SQL语言非常相似。nn与SQL中的select语句向对应，XQuery中提供了FLWOR语句，可以完成对XML数据的查询、筛选、排序。qqFOR-LET-WHERE-ORDERBY-RETURN


* XQuery基本语法
```
SELECT column_list  FROM table_source
ORDER BY order_by_expression
WHERE search_condition 
```
```
for $b indoc("bib-demo1.xml")/bib/book
let$t := $b/title, $a := $b/author
where$a/last="Stevens"
order by $t
return <result>{ $t} { $a } </result>
```
```
<?xml version="1.0" encoding="UTF-8"?><bib><bookyear="1994"><title>TCP/IP Illustrated</title><author><last>Stevens</last><first>W.</first></author><publisher>Addison-Wesley</publisher><price>65.95</price></book><bookyear="1992"><title>Advanced Programming</title><author><last>Stevens</last><first>W.</first></author><publisher>Addison-Wesley</publisher><price>65.95</price></book> </bib>
```
```
<result><title>Advanced Programming</title><author><last>Stevens</last><first>W.</first></author></result><result><title>TCP/IP Illustrated</title><author><last>Stevens</last><first>W.</first></author> </result>
```
* FLWOR表达式 
 + FLWOR表达式是XQuery查询计划基本形式 
 + XQuery查询计划的逻辑组成部分，其中包含 
    + FOR子句、LET子句、WHERE子句、ORDER BY子句、RETURN 子句
    + XPath路径表达式和内置函数
    + 各种自定义函数
    + 命名空间
```
<product dept="WMN">
    <number>557</number>
    <name language="en">Fleece Pullover</name>
    <colorchoices>navy black</colorchoices>
</product>
<product dept="ACC">
    <number>563</number>
    <name language="en">Floppy Sun Hat</name>
</product>
<product dept="ACC">
    <number>563</number>
    <name language="en">Deluxe Travel Bag</name>
</product>
<product dept="MEN">
    <number>784</number>
    <name language="en">Cotton Dress Shirt</name>
    <colorChoices>white gray</colorChoices>
    <desc>Our<i>favorite<i>shirt!</desc>
</product>
```
路径表达式也可以使用符号@属性。例如下面这个路径表达式：
doc("catalog.xml")/*/product/@dept
查询语句
```
for $prod in doc("catalog.xml")/catalog/product
where $prod/@dept="ACC"
order by $prod/name
return $prod/name
```
结果
```
<name language="en">Deluxe Travel Bag</name>
<name language="en">Floppy sun Hat</name>
```
FOR-LET-WHERE-ORDERBY-RETURN
![](/assets/8_1.png)
* for子句
 + SELECT ... FROM ... 用于指定从某个数据库表中检索若干列的内容；严格地说，这个操作的执行过程是，按照实际存储顺序（或索引结构）、依次访问该数据库表中的每一条记录，并从中取出指定列的内容，然后再执行后续的操作。如果单独考虑SELECT ... FROM ...，它实际上是一个在目标数据集合中进行循环遍历的取值过程，以便对所取出的数据进行进一步的筛选和排序等操作
 + 在XQuery中，for子句用于完成类似的工作，它也相当于高级程序设计语言中的for循环。

* for子句中的范围变量
 + 在for子句中，$variable_name表示声明一个范围变量（range variable），然后为这个范围变量指定取值范围的集合，依次进行绑定。
 + 比如，for$bindoc(“bib-demo1.xml”)/bib/book表示$b的取值范围为bib-demo1.xml中的book节点（使用了关键字in）。在执行该查询计划时进行循环遍历取值，然后对所取出的数据节点进行进一步的筛选和处理等操作 
* let子句 
 + 类似于SQL中的DECLARE和SET语句，用于定义一个局部变量，并为其赋值。

Declare @i as int Set @i = 100 
let$iasxs:integer := 100

 + let中的普通变量与for中的循环变量不同，它的取值仅进行一次性地绑定，而不是循环依次绑定。
* where语句
 + where语句可以指定一系列的判断条件，根据for和let语句所生成的变量绑定元组进行筛选 
 + where语句是可选的，并且判断条件应该得到一个有效的布尔值（true或false），如果判断条件的计算结果为true，则保留该元组；否则，则放弃该元组
* where语句的使用
 + 比如下面的两个查询是完全等价的。
```
for$bindoc("bib-demo1.xml")/bib/book
where$b/author/last="Stevens"
return<result>{ $b/title} </result>
for$bindoc("bib-demo1.xml")/bib/book[author/last = "Stevens"]
return<result>{ $b/title} </result>
```
 + 可以使用XPath表达式中的判定谓词来取代where语句中的某些判断条件，从可读性的角度来说，建议尽可能使用前面一种方法书写

* where语句中布尔值的计算

 1. ① 如果操作数是一个空序列（( )），那么转换将返回false。
 2. ②如果操作数是一个序列，并且其中的第一项是节点，那么转换将返回true。
 3. ③如果操作数是一个仅包含单个原子值项目的序列，并且这个项目的类型为xs:boolean，那么转换将返回该项目的值。
 4. ④如果操作数是一个仅包含单个原子值项目的序列，并且这个项目的类型为xs:string、xs:anyURI、xs:untypedAtomic，那么对于长度为零的值，转换将返回false；否则返回true。
 5. ⑤如果操作数是一个仅包含单个原子值项目的序列，并且这个项目的类型为数值类型，那么对于非零的值，转换将返回true；否则返回false。
 6. ⑥在任何其他的情况下，转换将产生类型错误。

* 布尔值计算的示例 根据上述的规则，下面的where 语句将返回true：

规则②：where(`<a/>,<b/>`)

规则③：where("true"castasxs:boolean)

规则④：where("false")

规则⑤：where(123)

根据上述的规则，下面的where 语句将返回false：

规则①：where( )

规则③：where("false"castasxs:boolean)

规则④：where("")

规则⑤：where(0)

根据上述的规则，下面的where 语句将产生类型错误：
规则①、规则②和规则⑥（非空序列，并且包含多个项目，但第一个项目不是节点）：
`where(123,<a/>)、where("true"castasxs:boolean,<a/>)`


* order by语句 
 + order by语句是XQuery提供指定结果次序的功能；如果没有order by子句，结果的次序由for和let子句、以及排序模式决定。order by语句中可以指定排序是ascending或descending，缺省情况为ascending 方式。
 + 在order by语句中可以同时指定多个排序标准，首先按照第一标准进行排序，如果出现相等的情况，再依次按照后续的标准进行排序。
* order by语句的基本使用
 + 对于排序，循环操作（使用for 语句）是必需的。
let$b:= fn:doc("bib-demo1.xml")/bib/book
orderby$b/title
return<result>{ $b/title } </result>

* return语句
+ 在FLWOR中，return语句为候选结果集中的每一个项计算一次，这些计算结果连接形成FLWOR表达式的结果。
 + return语句返回结果的顺序由排序模式或者order by语句决定。
 + 可以输出任何文本信息，包括html、xml、xhtml、纯文本等各种形式。 + XQuery提供了一些构造方法，以便在查询中创建XML 结构，即创建元素、属性、文档、文本、注释和处理指令节点。这些构造方法主要分为两大类：直接构造方法（类似于XML形式的表示方法）；计算构造方法（使用带括号的表示方法）。
* 直接构造方法
 + 直接构造方法就是直接在XQuery查询计划中合适的位置按照XML的格式编写相应的内容 
 + XQuery文件的后缀名通常为.xq或者.xquery，并不是一个XML文档。经过XQuery 查询引擎处理之后，将直接输出其中所包含的类似XML格式的直接编码，从而在结果XML文档中形成相应的组成部分（包括元素、属性、文本、以及注释等等）。
* ① 元素及其文本内容的直接构造
```
...
return <result>{$t}{$a}</result>
    <result>
    {
            for$bindoc(“bib-demo1.xml”)/bib/book
            let$t:= $b/title, $a:= $b/author
            where$a/last=”Stevens”orderby$t
            return<result>{ $t} { $a} </result>
    }
    </result>
```

* ② 属性的直接构造

I． `<shoesize="7"/>` 

II．`<shoesize="{7}"/>`

III．`<shoesize="{( )}"/>` 

IV．`<chapterref="[{1, 5 to7, 9}]"/>`

V．`let$hat:= <hatsize="23"/> return<shoesize="As big as {$hat/@size}"/>`

