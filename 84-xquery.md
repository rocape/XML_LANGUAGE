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




