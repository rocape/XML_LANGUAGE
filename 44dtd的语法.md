###4.4 DTD的语法 
* 属性声明
 + 多重属性
```
<!ATTLIST contacts version CDATA #FIXED “1.0” source CDATA #IMPLIED> 
<!ATTLIST contacts version CDATA #FIXED “1.0”>
<!ATTLIST contacts source CDATA #IMPLIED>
```

`<!ATTLIST memo id ID#REQUIRED security (high|low) "high" keywords NMTOKENS #IMPLIED> `

memo元素的属性id是必须的，并且该属性的值必须在整个文档中是唯一的；属性security的值可能为"high"或"low"，缺省值为"high"；属性keywords是可选的，如果出现，那么它的值应该是用空格隔开的若干个XML名称标记keywords = “XML XPathXQuery”和id="memo-2006-03-14“ 都是正确的属性取值    


`<!ATTLIST sender company CDATA #FIXED "Microsoft">`
sender元素的company属性的值为字符数据，并且固定为"Microsoft"
`<sender company=“Microsoft” /> `是正确的 
`<sender company="Schools" /> `则是错误的
```
<!ELEMENT Step EMPTY>
<!ATTLIST Step id ID#REQUIRED>
<!ELEMENT StepLinkEMPTY>
<!ATTLIST StepLinksteps IDREFS #IMPLIED> 如果在该文档中存在：
<Step id="step1"/><Step id="step2"/>则<StepLinksteps="step1 step2"/>
```
是正确的

* 实体声明
 + 实体（Entity）可以是一段要替换的文本、其他XML标记或者外部文件，类似程序语言中的常数
 + 可以在一个文档中多次调用，或在多个文档中调用同一个实体
 + 默认实体nn& - &, < - <, > - >, ' - ’, " - ” 
* 归为内置实体，不需要在DTD定义
 

 + 使用实体必须在文档中插入实体的引用
 + 实体引用是指引用实体所代表的一个字符、文本或外部文件
 + 首字符是&，之后是实体名称，结尾是分号，之间不允许空格（&）
 + 可以在元素内容和属性值里面插入实体引用
 + 不能在元素名或属性名里面使用实体

`<description>Author & programmer</description> <contacts version="1.0">`
 + 字符实体
* 不需要在DTD中声明
*用来表示不易输入的字符或非ASCII字符（©或者©表示©）
* 可以在元素内容和属性值里面使用 
* 不能在元素名或属性名里面使用，也不能代替实际的XML标记

* 普通实体
 + 必须在DTD中先声明
 + 可表示多个字符、文本段，甚至整个文档
 + 实体的值可以是任何良构的XML，但是不能含有根元素，也不能自引用
```
<!ENTITY 实体名称“实体的值”>
<!ENTITY source-text “Beginning XML 4E's Contact List”>
<!ENTITY address-unknown “The address for this location is "Unknown"”>
<!ENTITY empty-gps“<latitude></latitude><longitude></longitude>”> <address>&address-unknown;</address>
<!ENTITY address-unknown “The address for this location is &address-unknown;”>
<!ENTITY address-start “<address>”>
<!ENTITY address-end “</address>”> 
```
* 实体声明
 + 普通实体
* 普通实体可代替一个外部文件
* 验证型解析器必须打开外部实体进行解析，非验证型解析器不一定 
```
<!ENTITY 实体名称SYSTEM “URI/URL”>
<!ENTITY 实体名称SYSTEM “URI/URL” NDATA 标记名>
<!ENTITY jeff-description SYSTEM “jeff.txt”> 
```

 
* 实体声明
 + 参数实体
* 参数实体可创建可重用的替换文本段
* 只能在DTD中引用
* 替换文本可由DTD的一个或多个声明组成
* 可用来建立分散在多个文档中的DTD 
* 引用（%NameDeclarations;）
