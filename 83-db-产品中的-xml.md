###8.3 DB产品中的XML
* SQL Server为XML数据的存储和处理提供了广泛支持
 + 引入XML数据类型
 + 支持无类型和有类型的XML数据
 + 可以为XML列创建索引
* DB2中的pureXML
 + 存储方面：混合型模型将XML数据存储在经过解析的DOM树模型中。pureXML以节点和子树（而非文档级）的粒度存储XML
 + 在数据库中，物理存储层的主要存储单元是节点。每个节点中保存了到父节点和子节点的连接。因此，在进行层次遍历或者结构连接操作时，效率都非常高。可以在不更新整个文档的前提下，增加、减少、或修改节点，并将节点重新存储到其它的页中。pureXML所提供的XML数据的底层存储支持，使得DB2能够更有效地处理XML层次数据
* DB2中的pureXML
 + 索引方面：XML数据被格式化为缓冲数据页，以便快速导航和执行查询以及简化索引编制。DB2支持在XML列上建立路径特定的索引，因此元素和属性常用作谓词且可以编制跨文档连接的索引，从而高效地管理海量XML文档、提供高查询性能。DB2还通过Net Search Extender为XML数据提供全文检索，可以对完整的或者部分文档建立全文索引
 + 查询方面：DB2为XML数据的检索提供了全面的支持，包括使用常规SQL, SQL/XML, XQuery以及嵌入SQL的XQuery，以实现层次数据的查询、更新，实现关系数据和层次数据的集成
* pureXML的混合数据管理模式
![](/assets/8_1.bmp)
![](/assets/8_2.bmp)

* 采用XML数据类型的数据列进行存储
qq以XML文档的节点和子树为单位进行存储，不同于字符串类型的是，数据以XML内容的内部表示形式进行存储，XML内容包括包容层次结构、文档顺序、元素和属性值等。所有XML数据都存储在使用UTF-8代码集的数据库中 
* 使用大对象进行存储 
* 使用关系数据库表进行存储
 + 带注释的XML模式分解
```
CREATE TABLE classes(id INTEGER NOT NULL, details XML); 
insert into classes values(1, XMLPARSE ( DOCUMENT 
'<students>
    <student><name>ZhangTao</name><gpa>70</gpa></student> 
    <student><name>ZhaoFan</name><gpa>80</gpa></student> 
</students>'));
insert into classes values(2, XMLPARSE ( DOCUMENT 
'<students>
    <student><name>XiaoWang</name><gpa>75</gpa></student> 
    <student><name>XiaoMa</name><gpa>80</gpa></student> 
</students>'));
XQUERY db2-fn:xmlcolumn('CLASSES.DETAILS')//name; 
    将得到所有的name 元素：
    <name>ZhangTao</name>
    <name>ZhaoFan</name>
    <name>XiaoWang</name>
    <name>XiaoMa</name> 
XQUERY for $stuin db2-fn:xmlcolumn('CLASSES.DETAILS')//student return $stu/name; 
XQUERY db2-fn:sqlquery('select details from classes where id = 2')//name; 
```
* DB2中数据查询的几种方法
 + 常规SQL查询只能在XML列级别进行查询，只能返回整个XML文档
 + 仅XQuery只能访问XML数据，而无法查询非XML关系数据 
 + 嵌入SQL的XQuery可以查询XML数据和关系数据；可以在查询中利用对关系列定义的SQL谓词和索引；可以针对用户自定义函数返回的结果进行查询（因为不能直接通过XQuery调用这些UDF）；可以针对使用SQL/XML发布函数通过关系数据构造的XML值进行查询
* DB2中的SQL/XML
 + XMLQUERY函数用于在SQL查询中嵌入XQuery查询 
 + XMLEXISTS函数用于测试一个XQuery表达式是否可以返回包含一个或多个元素的序列，如果其中的XQuery表达式所返回的序列为空，那么XMLEXISTS函数将返回false，否则返回true
 + XMLTABLE函数可以根据XQuery表达式返回行集

* XMLQUERY函数
```
SELECT id, XMLCAST(
XMLQUERY('for $stunamein $d/students/student[1]/name/text() return $stuname'passing classes.detailsas "d") AS VARCHAR(20)) as firstoneFROM classes;
```
|id|first_one|
|-|-|
|1|ZhangTao|
|2|XiaoWang|

|1|<?xml version="1.0" encoding="UTF-16" ?>ZhangTao|
|-|-|
|2|<?xml version="1.0" encoding="UTF-16" ?>XiaoWang|
```
SELECT id FROM classes 
WHERE xmlexists('$i//name[contains(.,"Wang")]' passing classes.details as "i"); 
```
```
SELECT id, name, gpa
FROM classes, XMLTABLE(
'for $stu in $d//student return $stu' passing classes.details as "d"
COLUMNS name VARCHAR(20) path 'name/text()',
gpa VARCHAR(20) path 'gpa/text()') as student
```
|id|name|gpa|
|-|-|-|
|1|ZhangTao|70|
|1|ZhaoFan|80|
|2|XiaoWang|75|
|2|XiaoMa|80|

* 用于发布XML数据的各种SQL/XML函数
|函数名称|描述|
|-|-|
|XMLAGG|返回一个XML序列，包含表示XML值集中的每个非空值的项|
|XMLELEMENT|返回作为XML元素节点的XML值|
|XMLATTRIBUTES|通过自变量构造XML属性，此函数只能用作XMLELEMENT函数的自变量|
|XMLDOCUMENT|返回具有单个XQuery文档节点的XML值，该文档节点有一个或多个子节点。此函数创建一个文档节点，根据定义，每个XML文档都必须有一个文档节点。文档节点在序列化的XML表示中不可视，但是，要存储在DB2表中的每个文档必须包含文档节点|
|XMLTEXT|返回具有单个文本节点的XML值，该文本节点将输入自变量作为内容。|
|XMLPI|返回具有单个处理指示信息节点的XML值。|
|XMLCOMMENT|返回具有单个注释节点的XML值，该注释节点将输入自变量作为内容。|
|XMLNAMESPACES|通过自变量构造名称空间声明。此声明只能用作XMLELEMENT、XMLFOREST和XMLTABLE函数的自变量。|
|XMLCONCAT|返回一个序列，它包含很多XML输入自变量的并置结果。|
|XMLFOREST|返回作为XML元素节点的序列的XML值。|













