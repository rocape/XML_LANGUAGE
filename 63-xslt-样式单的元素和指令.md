###6.3 XSLT样式单的元素和指令 
* `<xsl:stylesheet>`元素
 + 每个完整的XSLT样式单都有一个xsl:stylesheet或xsl:transform元素作为其文档元素
    + `<xsl:stylesheet>`和`<xsl:transform>`语义上等同，可互换使用
    + 某些非常简单的XSLT样式单可能没有xsl:stylesheet，但可存在一个HTML文档里面分散包含来自XSLT命名空间的元素
    + xsl:stylesheet开始标签必须有一个version属性（位置）
        + 现在常用1.0
    + 必须有一个命名空间声明
        + 命名空间声明中的其他URL表示非XSLT命名空间中的元素
        + XSLT命名空间前缀：xslt/xsl或其他
* `<xsl:template>`元素
 + XSLT处理器在样式表中查找一个match属性值为/的xsl:template元素（根节点）
 + 搜索到根节点时就根据模板内容，在目标树中增加一个与模板内容相对应的树形结构
    + 只有一个根节点，则只允许根节点在目标树中添加一次
    + 模板中与根节点匹配的元素大都是HTML或XHTML元素
        + 字面结果元素（Literal Result Elements）
    + 模板中来自XSLT命名空间的元素被称为指令（Instructions）
 + 模板是XSLT转换工作的具体规则，所有的转换任务是通过一系列的模板体现出来的。因此，如何声明和调用模板，是XSLT转换任务的关键 
 + 在XSLT文档中通常至少包含一个模板，即<xsl:templatematch=“/”>，该模板用于处理文档节点（Document Node），相当于程序设计语言中的main()函数
 + 模板在很多方面都与函数非常类似，必须首先声明（可以指定模板的名称、参数、返回类型等），然后在合适的地方显式地调用（在遍历文档树节点的过程中或直接调用），才能够执行相应的转换规则
 + 完整的模板声明语法
```
<xsl:templatematch=Pattern name=QNamemode=QNamepriority=Number as=Sequence-type>
    <!--other xslelements and literal result elements-->
......
</xsl:template>
```
 + `<xsl:template>`和`</xsl:template>`之间的内容相当于一个函数的函数体，表示在调用该模板时应执行的具体操作。而xsl:template元素开始标记中的属性（match, name, mode和priority）用于描述该模板的相关信息 

 + match属性的取值涉及到模板的调用，分两种方式
    + 根据模板的匹配路径（在遍历的过程中）进行调用，具体有两种情况
        + 对于模板<xsl:templatematch=“/“>，XSLT处理器将在碰到XML文档的文档节点时自动调用该模板，类似程序执行的入口，Java 虚拟机自动调用主类的main()方法
        + 对于其他的模板match=other-pattern，将在模板<xsl:templatematch="/“>的转换规则（函数体）中通过指出匹配路径的方式（使用xsl:apply-templates）进行隐式或者显式地调用
    + 根据模板名称属性（name），使用<xsl:call-templatename=template-name>进行调用 
```
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!--transform the input root (/) and the message element-->
    <xsl:template match="/"> 模板1
        ......
    </xsl:template>
    <xsl:template match="message"> 模板2
        ......
    </xsl:template>
</xsl:stylesheet>
```
 + match属性值可以使用绝对路径表达式（比如“/message”），这表示在遍历文档树的过程中碰到/message元素时，需要执行该模板中的内容；如果使用相对路径表达式，模板2将应用于/message、/*/message 等（所有含message的元素）

 + 模板`<xsl:templatematch=“/”>`和`<xsl:templatematch=“message”>`都没有具体的名称，称为**无名模板** 
 + 这些模板之所以可以没有名称，是因为它们的调用是在遍历文档树的过程中自动进行的，根本不需要名称
 + 也可以使用name属性为模板指定一个名称，使其成为命名模板
```
<xsl:stylesheetversion="2.0"xmlns:xsl="http://www.w3.org/1999/XSL/Transform">    
    <xsl:templatematch="/"name="one"><!--命名模板one-->
        <xsl:call-templatename="another"/>    
        </xsl:template>
    <xsl:templatename="another"> <!--命名模板another-->
        <output>Simple output</output>
    </xsl:template></xsl:stylesheet> 
```
    + 输出结果为：`<output>Simple output</output>`
 + 对于一个模板来说，可以同时使用match和name属性，以便能够在遍历过程中根据路径匹配情况自动地调用，或者使用xsl:call-template直接调用 
+ 模板的mode属性可用于对模板进行进一步的标识
```
<xsl:templatematch="Name"mode="C"> <!--模板1-->
    ...Do sthfor Company Name...
</xsl:template>
<xsl:templatematch="Name"mode="P"> <!--模板2-->
    ...Do sthfor Person Name...
</xsl:template>
```
```
<Company>
    <Name>Acme</Name>
    <Person>
        <Name>Dave</Name>
        <Phone>123</Phone>
    </Person>
</Company>
```
 + priority属性是用来表示模板的优先级
```
<xsl:templatematch="Name" priority="2" ><!--模板1-->
    ...Do sth...
</xsl:template>
<xsl:templatematch="Name" priority=“1" ><!--模板2-->
    ...Do other things...
</xsl:template>
```
 + 碰到Name元素时将使用priority取值较大的模板 
 + 模板返回类型属性as的取值，表示该模板应该返回的数据类型
```
<xsl:template match="Name" as="element()">
    ...Do sth...
</xsl:template>
```
```
<Person>
    <Name>Dave</Name>
    <phone>123</Phone>
</Person>
```
 + 表示该模板将会返回一个XML元素作为结果，其中可能包含子元素和文本内容。如果该模板输出多个XML元素组成的序列、非XML元素内容或者文本内容，则XSLT处理器在执行模板的过程中将会报错
 + as是一个可选的参数，如果不指定该参数，则模板可以输出任意的文本内容

* `<xsl:apply-templates>`元素
 + 与根节点对应的模板中有一个名为xsl:apply-templates的元素
    + 促使XSLT处理器根据select属性（可选）指定要处理的节点集
        + 省略则表示处理元素子节点
        + 可实现对模板的递归引用
    + 模板内容的一部分由LRE组成，一部分由XSLT命名空间元素（xsl:value-of元素）组成
```
<xsl:apply-templatesselect="/People/Person" /> 
... 
<xsl:templatematch="Person">
<h3><xsl:value-ofselect="Name" /></h3>
<p><xsl:value-ofselect="Description" /></p>
<br/>
```
    + 路径/People/Person确定了需要搜索的节点，表示People元素是根节点的子节点，Person是People元素的子节点，xsl:apply-templates促使处理器搜索一个与Person元素节点匹配的模板
    + 模板为xsl:apply-templates元素的select属性提供了一个匹配值，则XSLT处理器在/People/Person定位路径中找到Person元素节点时就处理模板的内容，并把内容添加到目标树；应用模板的次数与匹配节点的个数相同
 + 模板的调用
    + 在遍历（广度优先遍历）的过程中匹配调用
    + 通过名称直接调用 
 + 使用xsl:apply-templates在广度优先、逐层向下的遍历过程中调用模板
    + XSLT中apply-templates元素的完整语法形式如下 
```
<xsl:apply-templatesselect=Expression mode=QName>
......
</xsl:apply-templates>
<xsl:templatematch="/"> <!--模板1-->
    <xsl:apply-templates/>
</xsl:template>
<xsl:templatematch="message"> <!--模板2-->
.....
 </xsl:template>
```
```
<?xml version="1.0"?>
<?xml-stylesheettype="text/xsl" href="hello.xslt"?>
<message>Hello!</message>
```
+ select和mode属性都是可选的在xsl:apply-templates元素中可以传递调用参数
 + select属性
    + xsl:apply-templates的作用就是指定继续遍历当前节点的所有子节点（以便根据实际路径和模板的match属性取值调用对应的模板），而select属性（取值为一个XPath表达式）允许指定仅遍历当前节点的哪些子节点（以调用相应的模板，如果存在）
    + 如果将上述源码的模板1中的<xsl:apply-templates/>更改为<xsl:apply-templatesselect="message"/>，那么将仅调用message元素所对应的模板（而不会调用处理指令所对应的模板）。这样就可以根据具体的转换要求，仅遍历文档树中的部分内容 
 + mode属性可实现某个节点多次处理的需要
    + 当xsl:apply-templates有一个mode属性时，只有当match和mode两个属性值都有匹配值时，其模板才可实例化
    + mode属性用于指定需要在match属性取值相同的模板中选择哪一个进行调用
    + 需要与xsl:template元素的mode属性配合使用 
 + mode属性可实现某个节点多次处理的需要 
```
<Company>
    <Name>Acme</Name>
    <Person>
        <Name>Dave</Name>
        <Phone>123</Phone>
    </Person>
</Company>
```
```
<xsl:templatematch="/"><!--模板1-->
    <xsl:apply-templates/>
</xsl:template>
<xsl:templatematch="Company"> <!--模板2-->
    <xsl:apply-templatesselect="Name" mode="C"/>
    <xsl:apply-templatesselect="Person/Name" mode="P"/>
</xsl:template>
<xsl:templatematch="Name"mode="C"> <!--模板3-->
    ...Do sthfor Company Name...
</xsl:template>
<xsl:templatematch="Name"mode="P"> <!--模板4-->
    ...Do sthfor Person Name...
</xsl:template>
```
 + 可以为模板3和模板4的match属性取不同的值
* `<xsl:variable>`和`<xsl:param>`元素
 + 定义变量和参数
 + 引用变量和参数使用$ 
 + 参数可以从外部传递给转换程序，变量则在XSLT样式表内部定义
 + 变量赋值
`<xsl:paramname=”searchLetter” select=”’A’”/>`
    + 使用xsl:variable的select属性
`<xsl:variablename=” variableName” select=” someExpression” />`
    + 在xsl:variable元素的起始标签和结束标签之间定义
```
<xsl:variablename=” variableName”>
<!-- Some content goes here which can define the value of the variable. -->
</xsl:variable>
```
    + 全局变量（xsl:stylesheet的直接子元素）可在文档转换之前用程序赋值（转换器相关）
* 命名模板和`<xsl:call-template>`元素
 + 命名模板由xsl:template元素的name属性标识
```
<xsl:templatename=”TemplateName”>
    <!-- The template content goes here. -->
</xsl:template>
```
 + 调用命名模板使用xsl:call-template元素
`<xsl:call-templatename=”TemplateName” />`
    + 不带任何参数调用命名模板
 + xsl:with-param元素用于在使用xsl:template声明模板时声明参数，也用于在xsl:call-template或者xsl:apply-templates中传递调用参数
    + xsl:with-param的select属性可选，其值为表达式，表示如何选取需要传递的值
```
<xsl:call-templatename=”TemplateName”>
    <xsl:with-paramname=”ParameterName” />
    <!-- More <xsl:with-param> elements can go here. -->
</xsl:call-template>
```
    + 使用xsl:with-param传递一个或多个参数给命名模板
```
<xsl:templatename=”TemplateName”>
    <xsl:with-paramname=”ParameterName” />
    <!-- Rest of template goes here. -->
</xsl:template>
```
    + 要把一个参数传递给一个命名模板，该模板的定义格式（xsl:with-param）用来声明命名模板的参数
* 模板参数的声明和传值
 + 在xsl:template元素开始标记和结束标记之间，使用xsl:param元素为所在的模板声明相应的模板参数
```
<xsl:templatename="doSth">
    <xsl:paramname="paramOne"/>
    <xsl:paramname="paramTwo"/>
    ...模板正文...
    ...使用"$paramOne" 和"$paramTwo" 引用两个模板参数... 
</xsl:template>
```
 + 在xsl:call-template元素的开始标记和结束标记之间，可以使用xsl:with-param元素为所调用的模板传递所需的参数 
```
<xsl:call-templatename="doSth">
    <xsl:with-paramname="paramOne"select="'One'"/>
    <xsl:with-paramname="paramTwo"select="."/>
</xsl:call-template>
```
    + 使用xsl:with-param元素时必须指明具体的模板参数名称，以便为其进行赋值，所以可以不按照声明时的顺序书写可以使用xsl:with-param元素的as属性，为形式参数指定数据类型 
* XSLT中的内置模板
 + 内置模板（Built-in Templates）是XSLT中的一个关键内容，对于理解XSLT对XML文档树结构的遍历方式、模板调用机制等都是至关重要的
 + 通过一个具体的示例来说明内置模板的存在，并观察和解释各种内置模板的含义、以及处理对象
```
<xsl:stylesheetversion=“1.0"xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:templatematch="*|/"><!--模板1-->
    <xsl:apply-templates/>
</xsl:template>
<xsl:templatematch="text()|@*"> <!--模板2--> 
    <xsl:value-ofselect="."/>
    </xsl:template>
<xsl:templatematch="processing-instruction()|comment()"/> <!--模板3-->
```
 + 内置模板的作用在于能够让我们集中精力编写相关节点的处理模板，而无需过多地操心整个遍历过程中模板的逐层调用
 + 只有在用户没有自定义处理某个节点的模块规则时，才会调用内置模块中的规则，否则，用户自定义的模块规则将覆盖内置模块中的规则
```
<xsl:stylesheetversion="2.0"xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!--transform the input root (/) and the message element-->
    <xsl:templatematch="message">
    .....
    </xsl:template>
</xsl:stylesheet>
```

<xsl:value-of>元素
qq提供源树中某一部分的值
nn必须有一个select属性表明定位路径nn模板内容的一部分由LRE组成，一部分由XSLT命名空间元素（xsl:value-of元素）组成
```
<html>
<head>
<title>Information about
<xsl:value-of select="count(/People/Person)" /> people.</title> </head>
<body>
<h3>Information about
<xsl:value-ofselect="count(/People/Person)" />people.</h3> <title>Information about 3 people.</title>
```
```
<xsl:templatematch=“Person”>
<h3><xsl:value-ofselect=“Name” /></h3>
<p><xsl:value-of select=“Description” /></p>
<br/>
</xsl:template>
```
 + 上下文节点（Context Node）
    + 上下文是指当前处理器正在处理的节点的位置，该节点称为上下文节点
    + 上下文不只包括上下文节点，也包括上下文位置、上下文大小等
```
<xsl:templatematch=“Person”>
<h3><xsl:value-ofselect=“Name” /></h3>
<p><xsl:value-of select=“Description” /></p>
<br/>
</xsl:template>
```
 + 可获得XML文档结构树中所有节点的值
|节点类型|节点值|
|-|-|
|根节点|用“/”匹配，通常不直接求节点值|
|指令|用processing-instruction()匹配，值不包含值令名称、<？和？>|
|注释|用comment（）匹配，值不包含<?--和-->|
|元素|可用多种方式匹配，值为元素本身以及元素内容|
|元素属性|用@属性名匹配，值为属性值，不含双引导|
|元素内容|用text()匹配，元素本身包含的文本内容|
* 节点选择方式
 + `<xsl:template>`的match属性用于指定要匹配的节点
 + `<xsl:copy-of>`, `<xsl:for-each>`, `<xsl:sort>`, `<xsl:apply-template>`和`<xsl:value-of>`的select属性用于选择节点
* `<xsl:copy>`元素
 + 把一个节点复制到目标树，但不复制子孙节点
 + 如果上下文节点是一个元素节点，则不会复制节点的任何属性值
    + 使用某个元素并可改变其内容或增删属性

<Persons> <Person /> <Person /> <Person /> </Person><?xml version=“1.0” encoding=“UTF-8”?> <Persons> <Person FirstName=“Jill” LastName=“Harper”/> <Person FirstName=“Claire” LastName=“Vogue”/> <Person FirstName=“Paul” LastName=“Cathedral”/> </Persons>只处理xsl:copy使用xsl:attribute增加属性Persons.xml Persons.xsltPersonsOut.xml Persons2.xslt
6.3 XSLT样式单的元素和指令 
nn<xsl:copy-of>元素
qq深度复制，把一个节点及其所有属性节点和子孙节点都复制到目标树xsl:copyxsl:copy-of功能将当前节点从源文档复制到目标树复制任何节点集到目标树对当前节点的处理仅复制当前节点，不复制其子元素或者属性复制节点及其所有的子孙节点，包括属性和子元素节点内容可以使用XSLT代码为新的节点创建内容，如果当前节点是元素节点或者根节点所有的内容都来自select属性中指定的节点集PurchaseOrder.xml PurchaseOrder.xsltInvoice.xml
6.3 XSLT样式单的元素和指令 nn<xsl:output>元素
qq使用method属性从XML, HTML或文本文档中选择一种输出格式
nnmethod属性的值大小写敏感，并且必须小写（xml, html, text）<xsl:output method=“output type” />
6.3 XSLT样式单的元素和指令 
nn<xsl:if>元素
qq测试一个布尔条件
nn为真则实例化<xsl:if>元素的内容
nn为假则<xsl:if>元素的内容不会被添加到目标树
nn输出一些内容或没有任何输出
<Characters> <Character age=“99”>Julius Caesar</Character> <Character age=“23”>Anne Boleyn</Character> <Character age=“41”>George Washington</Character> <Character age=“45”>Martin Luther</Character> <Character age=“800”>Methuselah</Character> <Character age=“119”>Moses</Character> <Character age=“50”>Asterixthe Gaul</Character> </Characters> <xsl:templatematch=“Character”> <xsl:iftest=“@age > 110 ” > <p><b><xsl:value-ofselect=“.” /></b> is older than expected. Please check if this character’s age, <b><xsl:value-ofselect=“@age” /></b>, is correct.</p> </xsl:if> </xsl:template> test属性返回false时，Character元素的模板不输出任何内容Characters.xml Characters.xslt
6.3 XSLT样式单的元素和指令 
nn<xsl:choose>元素
qq多个选项中选取一个
nnxsl:choose可以有任意个xsl:when元素作为其子元素，每一个都有一个test属性进行逻辑判断
 nn如果xsl:when元素内容均未输出，则输出xsl:otherwise元素内容
<xsl:templatematch=“Character”> <xsl:choose> <xsl:whentest=“@age > 110” > <p><b><xsl:value-ofselect=“.” /></b> - too high. Please check if this character’s age, <b><xsl:value-ofselect=“@age” /></b>, is correct.</p> </xsl:when> <xsl:otherwise> <p><b><xsl:value-ofselect=“.” /></b> - ok</p>. </xsl:otherwise> </xsl:choose> </xsl:template>



6.3 XSLT样式单的元素和指令 nn<xsl:for-each>元素qq把嵌入其中的XSLT指令作用到节点集的每个元素qq可迭代处理整个节点集，并为节点集中每个节点生成输出文档nn理论上处理器可按任意顺序处理节点集中的节点<xsl:templatematch=“Object”> <ul> <xsl:for-eachselect=”Characteristic”> <li><xsl:value-ofselect=”.” /></li> </xsl:for-each> </ul> </xsl:template> 用LRE表示无序列表的起始标签和结束标签（<ul>和</ul>），上下文节点是Object元素节点，xsl:for-each为上下文节点的每个子节点生成一个列表项，列表项对应于上下文节点的每个Characteristic元素Objects.xml Objects.xslt6.3 XSLT样式单的元素和指令 nn<xsl:sort>元素qq可对节点集中的元素排序，可多次使用nn元素在输出中的顺序可完全不同于节点在源文档中的顺序qq可与xsl:apply-templates和xsl:for-each一起使用<xsl:apply-templatesselect=”/Objects/Object” > <xsl:sortselect=”@name” /> </xsl:apply-templates> xsl:sort的select属性值是一个相对定位路径@name，是Object的子节点name属性节点<xsl:templatematch=”Object”> <h3>Characteristics of <xsl:value-ofselect=”@name” /></h3> <ul> <xsl:for-eachselect=”Characteristic”> <xsl:sortselect=”.” order=”descending” /> <li><xsl:value-ofselect=”.” /></li> </xsl:for-each> </ul> </xsl:template> xsl:sort的order属性来说明排序模式，默认排序为升序ObjectsSort.xml ObjectsSort.xslt6.3 XSLT样式单的元素和指令 nn<xsl:include>和<xsl:import>元素qq都是xsl:stylesheet的直接子元素qqxsl:include将外部的样式单复制到该元素所在位置，一个样式单只能被包含一次，被包含样式单的模板规则与包含者规则优先级相同<xsl:stylesheetversion="1.0"xmlns:xsl="..."><xsl:includehref="Utility.xsl"/> <xsl:includehref="Tools.xsl"/></xsl:stylesheet><xsl:stylesheetversion="1.0"xmlns:xsl="..."><xsl:importhref="Utility.xsl"/> <xsl:importhref="Tools.xsl"/> <xsl:templatematch="node"> <xsl:apply-imports/> ...</xsl:stylesheet>6.3 XSLT样式单的元素和指令 nnxsl:import和xsl:include的区别nnimport与include必须为顶层元素，如果import与include同时存在，那么import在include之前声明 nninclude与原样式表中的模板处于完全相同的地位（具有相同的默认优先级）,没有任何差别，但是import导入的模板则具有较低的默认优先级nnimportadds components from another schema with a different namespace nnincludeassociates with the target namespace 6.4 XSLT函数 nndocument()可访问上下文节点所在的文档以及其他文档qq可使用多个XML文档作为源文档nnkey()与xsl:key一起使用，为XML源文档提供索引机制nnformat-number()与xsl:decimal-format元素一起使用，可以精确控制保存到目标文档的数值格式nngenerate-id()在目标树中生成ID属性节点6.5 XSLT2.0nnwww.w3.org/tr/xslt20/ nn使用XPath2.0和Xquery的数据模型nnW3C XML Schema数据类型代替了XPath1.0和XSLT1.0的数据类型nn新增部分元素，可实现分组功能nn可转换非良构XML文本数据nn改进了文本解析指令nn可把输出结果保存在多个文档nn新增了专用函数，也可自定义函数

2;, is~P���







