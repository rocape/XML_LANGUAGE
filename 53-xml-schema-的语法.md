###5.3 XML Schema的语法
* XML Schema文档
 + 大多数XML Schema单独保存在一个XML文档（*.xsd）中，形式上类似于外部DTD
 + 一个XML文档可引用一个定义了一种模式的XML Schema
 +遵循某个特定XML Schema模式的XML文档称为该XML Schema的一个实例（Instance）文档
* `<Schema>`声明
 + `<Schema>``是XML Schema的根元素
 + 在`<Schema>`中声明命名空间信息和文档中声明的默认值
 + 还可插入版本属性
```
<schema targetNamespace="URL" attributeFormDefault="qualified or unqualified" elementFormDefault="qualified or unqualified" version="version number">
```
*　XML Schema的命名空间
 + 常用三个形式之一
```
<schema xmlns=“http://www.w3.org/2001/XMLSchema”>
<xs:schema xmlns:xs=“http://www.w3.org/2001/XMLSchema”>
<xsd:schema xmlns:xsd=“http://www.w3.org/2001/XMLSchema”>
```
 + XML Schema推荐标准自身使用xs前缀
* 目标命名空间
 + XML Schema主要用于声明词汇（Vocabulary
 + 词汇由targetNamespace属性指定的一个命名空间来标识
 + 不是所有的XML Schema定义都有一个targetNamespace属性
 + 声明targetNamespace属性时，必需一个相匹配的命名空间声明
```
<Schema xmlns=“http://www.w3.org/2001/XMLSchema” targetNamespace=“http://www.example.com/name” xmlns:target=“http://www.example.com/name”>
```
```
<xs:Schema xmlns:xs=“http://www.w3.org/2001/XMLSchema” targetNamespace=“http://www.example.com/name” xmlns=“http://www.example.com/name”>
```
```
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.w3school.com.cn" xmlns="http://www.w3school.com.cn" elementFormDefault="qualified">
```
 + xmlns:xs="http://www.w3.org/2001/XMLSchema表示schema中用到的声明和数据类型来自命名空间http://www.w3.org/2001/XMLSchema，其前缀为xs。
 + targetNamespace="http://www.w3school.com.cn" 表示schema定义的元素来自命名空间http://www.w3school.com.cn
 + xmlns="http://www.w3school.com.cn" 表示默认命名空间http://www.w3school.com.cn 
 +　elementFormDefault="qualified"表示任何XML实例文档所使用的且在此schema中声明过的元素必须被命名空间限定


* 元素和属性限定词
 +　在XML实例文档中，元素和属性可以是限定的（qualified）或非限定的（unqualified）
 + 如果一个元素或属性关联到一个命名空间，则是限定的
 + 非限定元素没有关联的命名空间
```
<name xmlns=“http://www.example.com/name”>
    <first>John</first>
    <middle>Fitzgerald</middle>
    <last>Doe</last>
</name>
```
```
<n:name xmlns:n=“http://www.example.com/name”>
    <n:first>John</n:first>
    <n:middle>Fitzgerald</n:middle>
    <n:last>Doe</n:last>
</n:name>
```
```
<n:name xmlns:n=“http://www.example.com/name”>
    <first>John</first>
    <middle>Fitzgerald</middle>
    <last>Doe</last>
</n:name>
```
 + XML Schema的默认格式是将限定与非限定元素组合使用
 + 使用elementFormDefault和arrtibuteFormDefault指定元素的限定方式，默认限定值都是unqualified
    + XML实例文档中的全局元素声明必须在XML实例文档中受到限定，大多数文档中应该限定文档的全部元素，即总是把elementFormDefault设置为qualified
    + XML文档的大多数属性都是非限定的，则一般保持attributeFormDefault的默认值，但全局声明的属性在XML实例文档中必须限定

* `<element>`声明
 + 指定元素名和定义元素内容
```
<element 
    name=“name of the element”
    type=“global type”
    ref=“global element declaration”
    form=“qualified or unqualified”
    minOccurs=“non negative number”
    maxOccurs=“non negative number or ‘unbounded’”
    default=“default value”
    fixed=“fixed value”>
```
 + 元素内容由type属性决定，元素类型分为简单类型和复杂类型
    + 简单类型不包含任何子元素和属性的元素，只包含文本内容，或者为不包含属性的空元素（文本内容为空)
    + 复杂类型包含子元素和/或属性的元素（其中属性的声明包含在元素的复杂类型定义中）
 + 主要可用两种方法指定元素类型
    + 创建一个局部类型
    + 使用一个全局类型
 + 还可通过引用一个全局元素声明重用已有的元素声明，引用时不必指定类型

* 全局与局部
 + XML Schema声明可分为两类
    + 全局声明（Global Declaration）作为<Schema>元素的直接子元素声明，可以在整个XML Schema中重用
    + 局部声明（Local Declaration）没有<Schema>元素作为其直接双亲，并只能在指定的上下文内使用
```
<?xml version=“1.0”?>
<schema xmlns=“http://www.w3.org/2001/XMLSchema”     
    xmlns:target=“http://www.example.com/name” 
    targetNamespace=“http://www.example.com/name” 
    elementFormDefault=“qualified”>
    <element name=“name”>
        <complexType>
            <sequence>
                <element name=“first” type=“string”/>
                <element name=“middle” type=“string”/>
                <element name=“last” type=“string”/>
            </sequence>
            <attribute name=“title” type=“string”/>
        </complexType>
    </element>
</schema>
```
    + `<element name=“name”>`为全局声明（元素）
    +  `<element name=“first” type=“string”/><element name=“middle” type=“string”/><element name=“last” type=“string”/>`为局部声明（元素）
```
<Schema xmlns=“http://www.w3.org/2001/XMLSchema” 
    xmlns:target=“http://www.example.com/name” 
    targetNamespace=“http://www.example.com/name” 
    elementFormDefault=“qualified”>
    <complexTypename=“NameType”>
        <sequence>
            <element name=“first” type=“string”/>
            <element name=“middle” type=“string”/>
            <element name=“last” type=“string”/>
        </sequence>
        <attribute name=“title” type=“string”/>
    </complexType>
    <element name=“name” type=“target:NameType”/>
</Schema> 
```
    + `<complexTypename=“NameType”>`为全局声明（元素）
    + `<element name=“name” type=“target:NameType”/>`为全局声明（类型）
 + 创建局部类型，只需在元素中插入类型声明，作为元素声明的孩子
 + 同一个元素声明，`<complexType>`和`<simpleType>`不能同时存在
```
<element name=“name”>
    <complexType>
        <sequence>
            <element name=“first” type=“string”/>
            <element name=“middle” type=“string”/>
            <element name=“last” type=“string”/>
        </sequence> <attribute name=“title” type=“string”/>
    </complexType>
</element>
```
```
<element name=“name”>
    <simpleType>
        <restriction base=“string”> 
            <enumeration value=“Home”/>
            <enumeration value=“Work”/>
            <enumeration value=“Cell”/>
            <enumeration value=“Fax”/>
        </restriction>
    </simpleType>
</element> 
```

 + 对相同内容的元素，可使用全局类型避免重复声明局部类型
 + 在元素声明中通过类型名引用一个全局类型
    `<element name=“first” type=“string”/> `全局类型（内置数据类型string）
 + 自定义全局声明并引用
```
<Schema xmlns=“http://www.w3.org/2001/XMLSchema” 
    xmlns:target=“http://www.example.com/name” 
    targetNamespace=“http://www.example.com/name” 
    elementFormDefault=“qualified”>
    <complexTypename=“NameType”>
        <sequence>
            <element name=“first” type=“string”/>
            <element name=“middle” type=“string”/>
            <element name=“last” type=“string”/>
        </sequence>
        <attribute name=“title” type=“string”/>
    </complexType>
    <element name=“name” type=“target:NameType”/>
</Schema>
```
    + `<element name=“name” type=“target:NameType”/>`全局类型仍然是目标命名空间的一部分
```
<xs:schemaxmlns:xs=“http://www.w3.org/2001/XMLSchema” 
    xmlns=“http://www.example.com/name” 
    targetNamespace=“http://www.example.com/name” 
    elementFormDefault=“qualified”>
    <xs:complexTypename=“NameType”>
        <xs:sequence>
            <xs:elementname=“first” type=“xs:string”/>
            <xs:elementname=“middle” type=“xs:string”/>
            <xs:elementname=“last” type=“xs:string”/>
        </xs:sequence>
        <xs:attributename=“title” type=“xs:string”/>
    </xs:complexType>
    <xs:elementname=“name” type=“NameType”/>
</xs:schema>
```
    + `<xs:elementname=“name” type=“NameType”/>`目标命名空间没有前缀


 + 自定义全局声明并引用
    + 当类型声明为<Schema>元素的直接子元素时，才是一个全局类型
    + 给全局类型增加name属性，便于引用该全局类型

 + 引用已存在的全局元素
    + 重用整个元素声明，不仅仅是类型声明
    + 引用全局元素声明，只需加入一个ref属性，其值为全局元素名
`<element ref=“target:first”/>`
    + 引用全局元素声明时，不使用type属性和局部类型声明，在引用中使用`<element>`声明中的类型
    + XML Schema推荐标准允许有多个全局`<element>`声明，但XML实例文档中只允许有一个根元素 

* 元素命名
 + 使用name属性
 + 遵循XML命名规则
 + 不需指定命名空间
```
<element name=”first” type=“string”/>
<element name=”description” type=“string”/>
<element name=“2ndElement” type=”string”/>
<element name=“target:middle” type=”string”/>
```
* 元素的限定形式
 + 使用form属性可覆盖元素限定形式的默认值
 + 限定的元素在XML实例文档中必须有一个相应的命名空间前缀
 + 元素没有form属性则使用<Schema>中定义的elementFromDefault属性值
 + 全局声明的元素都是限定的

* 基数（Cardinality) 
 + 基数表示某个元素在内容模型中出现的次数
 + XML Schema通过最小出现次数（minOccurs）和最大出现次数（maxOccurs）属性设置基数
    + minOccurs和maxOccurs的默认值都是1，即元素默认必须出现且仅出现一次
    + minOccurs可为0，则元素为可选的
    + maxOccurs可为unbounded，则元素可出现无穷多次
    + 两个属性可同时出现，也可单独出现
    + maxOccurs>=minOccurs
 + 全局元素不允许定义minOccurs和maxOccurs属性，但可在内容模型中引用元素时使用

```
<element name=“first” type=“string” minOccurs=“2” maxOccurs=“2”/>
<element ref=“target:first” maxOccurs=“10”/>
<element name=“location” “minOccurs=“0” maxOccurs=“unbounded”/>
```

* 默认值和固定值
 + XML Schema可声明元素的默认值和固定值
 + 声明默认值只能设置一个文本值
* 元素的内容模型如果有其他元素，则不允许设置默认值
* 设置默认值可确保其作为XML实例文档的一部分
* 使用default属性设置默认值
* 如果设置了默认值的元素不在XML实例文档中，或者已经有内容，则默认值不起作用
```
<element name=“last” type=“string” default=“Doe”/>
<last></last>
<last/>
<last>Doe</last>
```
 + XML Schema中的元素和属性都可以有固定值
* 希望元素的值不变化则可设置固定值
* 使用fixed属性设置固定值
* 设置了固定值的元素，XML实例文档中元素的内容要与固定属性值匹配
* 如果设置了默认值的元素在XML实例文档没有内容，则解析器插入固定值
```
<element name=“version” type=“string” fixed=“1.0”/>
<version>1.0</version> <version></version> <version/> 
<version>2.0</vers
```
* 元素通配符（Wildcard）
 + 不用显示声明就可以在XML Schema中包含某些元素，包括自身命名空间中声明的任一元素，或来自另一个命名空间中的任何元素
```
<any minOccurs=“non negative number” maxOccurs=“non negative number or unbounded” namespace=“allowable namespaces” processContents=“lax or skip or strict”>
```
```
<element name=“name”>
    <complexTypename=“NameType”>
        <sequence>
            <element ref=“target:first”/>
            <element ref=“target:middle”/>
            <element ref=“target:last”/>
            <!-- allow any element from any namespace -->
            <any namespace=“##any” processContents=“lax” minOccurs=“0” maxOccurs=“unbounded”/>
        </sequence>
        <attribute name=“title” type=“string”/>
    </complexType>
</element>
```
来自所有命名空间的元素都被定义为通配符的一部分

* 元素通配符（Wildcard）
 + 包含任何命名空间中的元素声明称为元素通配符
* 利用通配符可以把来自一个命名空间的任何一个元素插入到XML Schema中
* 使用<any>声明创建通配符
 + 只能出现在内容模型，不允许创建全局的<any>声明
 + 可以使用基数，控制通配符在实例文档中出现的次数
 + 通过processContents属性验证通配符元素
    + skip: 解析器将忽略XML实例文档中的所有通配符元素
    + lax: 如果解析器可访问通配符的XML Schema定义，则验证通配符元素；找不到定义则忽略
    + strict: 默认值，解析器验证通配符元素，如果找不到其XML Schema定义，则报告错误
 + 使用namespace属性控制元素来自哪个命名空间
namespace属性允许值
5.3 XML Schema的语法 
nn<complexType>声明
qq定义元素内容
 qq全局<complexType>定义需要命名，局部不需要<complexTypemixed=“true or false” name=“Name of complexType”> <element name=“name”> <complexType> <sequence> <element name=“first” type=“string”/> <element name=“middle” type=“string”/> <element name=“last” type=“string”/> </sequence> <attribute name=“title” type=“string”/> </complexType> </element> <complexTypename=“NameType”> <sequence> <element name=“first” type=“string”/> <element name=“middle” type=“string”/> <element name=“last” type=“string”/> </sequence> <attribute name=“title” type=“string”/> </complexType> 
5.3 XML Schema的语法 
nn<complexType>声明
qq使用mixed属性建立混合内容模型，同时插入文本和元素内容

<element name=“description”> <complexTypemixed=“true”> <choice minOccurs=“0” maxOccurs=“unbounded”> <element name=“em” type=“string”/> <element name=“strong” type=“string”/> <element name=“br” type=“string”/> </choice> </complexType> </element> <description>Jeff is a developer & author for Beginning XML <em>4th edition</em> © 2006 Wiley Publishing.<br/>Jeff <strong>loves</strong> XML! </description> <element name="person"> <complexType> <sequence> <element name="firstname" type="string"/> <element name="lastname" type="string"/> </sequence> </complexType> </element> <person> <firstname>John</firstname> <lastname>Smith</lastname> </person> 

混合内容仅含元素
5.3 XML Schema的语法 nn<complexType>声明
qq空内容模型表明元素没有文本内容或子元素，在实例文档中必须是空元素qq<complexType>定义中可以包含<attribute>声明
nn声明空元素时仍可插入<attribute>声明
<element name=“knows”> <complexType> </complexType> </element> <element name=“knows”> <complexType/> </element> <knows/> <knows></knows> <element name=“knows”> <complexType> <attribute name=“contacts” type=“IDREFS”/> </complexType> </element>

5.3 XML Schema的语法 
nn<group>声明
qq定义可重用的组元素q
q全局<group>声明必须被命名
nn符合XML命名规则，不含前缀
nn允许在内容模型中引用全局元素组

<group name=“name of global group”> <group name=“NameGroup”> <!-- content model goes here --> </group> <group ref=“global group definition” minOccurs=“non negative number” maxOccurs=“non negative number or unbounded”>

5.3 XML Schema的语法 
nn属性的使用
qq在<attribute>声明中使用use属性设定其在XML实例文档中的出现方式
nnprohibited表明该属性不会出现在XML实例文档中
qq属性通配符和prohibited通常结合使用
nnrequired表明该属性必须出现在XML实例文档中
nnoptional是use的默认值，表明该属性是可选的
qq如果为属性声明定义了一个默认值，则use只能为optional 
nn全局<attribute>声明不可以使用use 5.3 XML Schema的语法
 nn属性的默认值和固定值
qq使用default赋予默认值
qq使用fixed赋予固定值
nn如果属性存在固定值，则解析器检查属性值与固定值是否相同，不同则提示模式验证错误
nn如果某属性在Schema中设置了固定值，而XML实例文档中其对应的元素没有该属性，则解析器插入该属性并赋予固定值
qq默认值或固定值必须与对应属性的类型相符
qq不能在同一个属性声明中同时使用默认值和固定值<attribute name=“version” type=“decimal” fixed=“1.1”/> 如果模式验证器发现元素没有kind属性，则插入该属性并将属性值设为Home <attribute name=“version” type=“string” fixed=“1.0”/> <attribute name=“kind” type=“contacts:KindType” default=“Home”/>
 5.3 XML Schema的语法 
nn属性通配符
qq包括来自一个命名空间的任何属性的声明称为属性通配符nn<anyAttribute>只能出现在<complexType>或<attrbuteGourp>中，不能建立全局的<anyAttribute>声明
nn可以插入namespace属性来控制属性可使用的命名空间<anyAttributenamespace=“allowable namespaces” processContents=“lax or skip or strict”> 
5.3 XML Schema的语法
 nn属性通配符值 说明 ##any 包括来自所有命名空间的属性 ##other 包括除了targetNamespace之外其他命名空间的属性 ##targetNamespace只包括来自targetNamespace命名空间的属性 ##local 包括所有没有命名空间限定的属性 由命名空间URI组成的，以空白符分隔的列表包括来自命名空间列表中的属性，列表可包括##targetNamespace和##local的属性 namespace属性允许值<complexType> <anyAttributenamespace=“##local http://www.w3.org/XML/1998/namespace” processContents=“lax”/> </complexType> 包括任何非限定属性以及来自http://www.w3.org/XML/1998/namespace命名空间的属性
5.3 XML Schema的语法 
nn属性通配符
qq对于包含属性通配符声明的元素，模式验证器根据processContents的值验证XML实例文档
nnskip: 跳过元素中的所有通配符属性
nnlax: 不严格验证，如果验证器可以访问XML Schema，则对通配符属性进行验证
nnstrict（默认值）或没有使用processContents属性: 对通配符属性进行验证，如果没有找到使用通配符属性的元素的全局XML Schema定义，则产生一个验证错误

5.3 XML Schema的语法
 nn<attributeGroup>声明
qq用同一组属性描述多个元素，可建立一个能在<complexType>定义中重用的全局属性组
qq必须给全局<attributeGroup>声明定义name属性并指定合适的名字<attributeGroupname=“name of global attribute group”> <attributeGroupname=“ContactsAttributes”> <!-- attribute declarations go here --> </attributeGroup> 
5.3 XML Schema的语法 
nn<attributeGroup>声明qq<attributeGroup>声明中允许有<attribute>声明作为其子声明，还允许属性通配符和对全局<attribute>和<attributeGroup>的引用，但不能递归引用自己
qq使用<attributeGroup>，可在<complexType>中插入一个引用或<attributeGroup>全局声明<attributeGroupname=”AttGroup1”> <attributeGroupref=”target:AttGroup1”/> </attributeGroup> <attributeGroupname=”AttGroup1”> <attributeGroupref=”target:AttGroup2”/> </attributeGroup> <attributeGroupname=”AttGroup2”> <attributeGroupref=”target:AttGroup1”/> </attributeGroup> 5.3 XML Schema的语法 
nn用简单内容和属性创建元素
qq如果元素只包含简单内容和属性
nn<simpleContent>声明表明<complexType>中不含子元素
nn可以有属性，但必须被定义为简单类型nn使用<extension>声明可增加属性声明，扩展现有数据类型
qq该声明的base属性可引用任何全局<simpleType>类型

<element name=“phone”> <complexType> <simpleContent> <!-- Specify type here --> </simpleContent> </complexType> </element> <element name=“phone”> <complexType> <simpleContent> <extension base=“string”> <attribute name=“kind” type=“string” default=“Home” /> </extension> </simpleContent> </complexType> </element> <phone kind=“Home”>001-909-555-1212</phone> <phone>001-909-555-1212</phone> <phone />







5.3 XML Schema的语法
n数据类型
q内置数据类型
q用户自定义数据类型




5.3 XML Schema的语法 
nn数据类型
qq任何一种类型都可以用来限制元素和属性的内容<element name=“latitude” type=“float”/> <element name=“longitude” type=“float”/> 
5.3 XML Schema的语法 
nn数据类型
qq用户自定义数据类型
nn内置数据类型不能包括所有的数据类型
qq合法但无效的数据值
qq使用<simpleType>定义建立一个新类型kind=“Walkie-Talkie”
5.3 XML Schema的语法 nn<simpleType>声明
qq可以建立用户自定义的数据类型
nn必须以现有数据类型为基础
qq内置的XML Schema数据类型
qq另一个自定义数据类型
qq包括三个主要的派生类型
nn约束（Restriction）类型
nn列表（List）类型
nn联合（Union）类型<simpleTypename=“name of the simpleType” final=“#all or list or union or restriction”>
5.3 XML Schema的语法
nn<restriction>声明
qq约束面（Facet）控制了XML Schema的全部简单类型
nn约束面是<simpleType>独有的
qq通过定义现有类型的约束面，可以创建更多自定义约束类型§§nonNegativeInteger由Integer派生，相当于将Integer的约束面minInclusive为0
qq不是所有类型都使用每个约束面
qq使用base属性定义约束类型§§base属性值是一个对全局<simpleType>或内置数据类型的引用
5.3 XML Schema的语法 nn<restriction>声明<attribute name=“kind”> <simpleType> <restriction base=“string”> <enumerationvalue=“Home”/> <enumerationvalue=“Work”/> <enumerationvalue=“Cell”/> <enumerationvalue=“Fax”/> </restriction> </simpleType> </attribute> 基类型string，用多个枚举约束面定义kind类型的允许值列表


* `<restriction>`声明

|约束面|描述|
|-|-|
|enumeration|定义一组合法的取值|
|fractionDidits|指定最大的位数，必须大于或等于零|
|length|指定字符串中字符或列表数据类型中项的数目，必须大于或等于零|
|maxExclusive|指定数值类型值的上限（取值必须小于这个上限）|
|manInclusive|指定数值类型值的上限（取值必须小于或等于这个上限）|
|maxLength|指定字符串中字符或列表数据类型中项的最大数目，必须大于或等于零|
|minExclusive|指定数值类型值的下限（取值必须大于这个上限）|
|minInclusive|指定数值类型值的下限（取值必须大于或等于这个上限）|
|minLength|指定字符串中字符或列表数据类型中项的最小数目，必须大于或等于零|
|pattern|指定一个正则表达式，描述合法的字符序列|
|totaIDigits|指定最大的位数，必须大于或等于零|
|whiteSpace|指定如何处理空白字符（CR、LF、Space和Tab）|



* `<restriction>`声明
 + 通过设置最大值或最小值，对数值类型取值的范围进行约束
```
<xsd:elementname="MyIntegerElement" type="MyInteger"/>
    <xsd:simpleTypename="MyInteger">
        <xsd:restrictionbase="xsd:integer">
            <xsd:minInclusivevalue="0"/>
            <xsd:maxInclusivevalue="100"/>
        </xsd:restriction>
    </xsd:simpleType>
    <xsd:elementname="MyIntegerElement"><xsd:simpleType>
    <xsd:restrictionbase="xsd:integer"><xsd:minInclusivevalue="0"/>
    <xsd:maxInclusivevalue="100"/></xsd:restriction>     
    </xsd:simpleType>
<xsd:element>
``` 
 + 通过枚举，将取值空间约束为一组合法的取值
```
<xsd:simpleType><xsd:restrictionbase="xsd:string">
<xsd:enumerationvalue="Audi"/><xsd:enumerationvalue="Golf"/>
<xsd:enumerationvalue="BMW"/></xsd:restriction></xsd:simpleType>
```

* `<restriction>`声明
 + 通过给定一个正则表达式，约束字符串内容的模式
```
<xsd:simpleType><xsd:restrictionbase="xsd:string">
<xsd:patternvalue="[a-z]"/></xsd:restriction></xsd:simpleType>
<xsd:simpleTypename="Telephone"><xsd:restrictionbase="xsd:string">
<xsd:patternvalue="(\d{4}-\d{8})|(\d{3}-\d{8})|(\d{4}-\d{7})"/>
</xsd:restriction> </xsd:simpleType>
```
 + 约束文本内容中字符串的长度
```
<xsd:simpleType><xsd:restrictionbase="xsd:string">
<xsd:lengthvalue="8"/></xsd:restriction></xsd:simpleType>
<xsd:simpleType><xsd:restrictionbase="xsd:string">
<xsd:minLengthvalue="5"/><xsd:maxLengthvalue="8"/>
</xsd:restriction></xsd:simpleType>
```
 + 约束文本内容中数值的位数和小数位数
```
<xsd:simpleType><xsd:restrictionbase="xsd:decimal">
<xsd:totalDigitsvalue="4"/><xsd:fractionDigitsvalue="2"/>
</xsd:restriction> </xsd:simpleType>
```
 + 在通过约束派生简单数据类型时，必须注意取值空间的有效性
 + 对于所有的约束方面，不允许在进行约束的同时扩大基本数据类型的值空间

* `<list>`声明
 + 创建基于某个`<simpleType>`类型的列表项
* 列表内由空白符分隔，则列表本身不能包含空白符
 + 包含空白符的类型不能作为itemType，则itemType属性本身不能为列表
 + 用itemType属性可定义列表项的类型
* 属性值是对全局`<simpleType>`或内置数据类型的引用
* 该引用是一个命名空间限定的值，需要使用前缀
* 也可建立一个局部的`<simpleType>`定义说明itemType的内容
`<list itemType=“name of simpleTypeused for validating items in the list”>`


