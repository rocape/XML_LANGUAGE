5.3 XML Schema的语法 nn元素通配符（Wildcard）qq不用显示声明就可以在XML Schema中包含某些元素，包括自身命名空间中声明的任一元素，或来自另一个命名空间中的任何元素<any minOccurs=“non negative number” maxOccurs=“non negative number or unbounded” namespace=“allowable namespaces” processContents=“lax or skip or strict”>5.3 XML Schema的语法 nn元素通配符（Wildcard）<element name=“name”> <complexTypename=“NameType”> <sequence> <element ref=“target:first”/> <element ref=“target:middle”/> <element ref=“target:last”/> <!-- allow any element from any namespace --> <any namespace=“##any” processContents=“lax” minOccurs=“0” maxOccurs=“unbounded”/> </sequence> <attribute name=“title” type=“string”/> </complexType> </element>来自所有命名空间的元素都被定义为通配符的一部分5.3 XML Schema的语法 nn元素通配符（Wildcard）qq包含任何命名空间中的元素声明称为元素通配符nn利用通配符可以把来自一个命名空间的任何一个元素插入到XML Schema中nn使用<any>声明创建通配符qq只能出现在内容模型，不允许创建全局的<any>声明qq可以使用基数，控制通配符在实例文档中出现的次数qq通过processContents属性验证通配符元素§§skip: 解析器将忽略XML实例文档中的所有通配符元素§§lax: 如果解析器可访问通配符的XML Schema定义，则验证通配符元素；找不到定义则忽略§§strict: 默认值，解析器验证通配符元素，如果找不到其XML Schema定义，则报告错误qq使用namespace属性控制元素来自哪个命名空间5.3 XML Schema的语法 nn元素通配符（Wildcard）namespace属性允许值5.3 XML Schema的语法 nn<complexType>声明qq定义元素内容qq全局<complexType>定义需要命名，局部不需要<complexTypemixed=“true or false” name=“Name of complexType”> <element name=“name”> <complexType> <sequence> <element name=“first” type=“string”/> <element name=“middle” type=“string”/> <element name=“last” type=“string”/> </sequence> <attribute name=“title” type=“string”/> </complexType> </element> <complexTypename=“NameType”> <sequence> <element name=“first” type=“string”/> <element name=“middle” type=“string”/> <element name=“last” type=“string”/> </sequence> <attribute name=“title” type=“string”/> </complexType> 5.3 XML Schema的语法 nn<complexType>声明qq使用mixed属性建立混合内容模型，同时插入文本和元素内容<element name=“description”> <complexTypemixed=“true”> <choice minOccurs=“0” maxOccurs=“unbounded”> <element name=“em” type=“string”/> <element name=“strong” type=“string”/> <element name=“br” type=“string”/> </choice> </complexType> </element> <description>Jeff is a developer & author for Beginning XML <em>4th edition</em> © 2006 Wiley Publishing.<br/>Jeff <strong>loves</strong> XML! </description> <element name="person"> <complexType> <sequence> <element name="firstname" type="string"/> <element name="lastname" type="string"/> </sequence> </complexType> </element> <person> <firstname>John</firstname> <lastname>Smith</lastname> </person> 混合内容仅含元素5.3 XML Schema的语法 nn<complexType>声明qq空内容模型表明元素没有文本内容或子元素，在实例文档中必须是空元素qq<complexType>定义中可以包含<attribute>声明nn声明空元素时仍可插入<attribute>声明<element name=“knows”> <complexType> </complexType> </element> <element name=“knows”> <complexType/> </element> <knows/> <knows></knows> <element name=“knows”> <complexType> <attribute name=“contacts” type=“IDREFS”/> </complexType> </element>5.3 XML Schema的语法 nn<group>声明qq定义可重用的组元素qq全局<group>声明必须被命名nn符合XML命名规则，不含前缀nn允许在内容模型中引用全局元素组<group name=“name of global group”> <group name=“NameGroup”> <!-- content model goes here --> </group> <group ref=“global group definition” minOccurs=“non negative number” maxOccurs=“non negative number or unbounded”>




5.3 XML Schema的语法 nn属性的使用qq在<attribute>声明中使用use属性设定其在XML实例文档中的出现方式nnprohibited表明该属性不会出现在XML实例文档中qq属性通配符和prohibited通常结合使用nnrequired表明该属性必须出现在XML实例文档中nnoptional是use的默认值，表明该属性是可选的qq如果为属性声明定义了一个默认值，则use只能为optional nn全局<attribute>声明不可以使用use 5.3 XML Schema的语法 nn属性的默认值和固定值qq使用default赋予默认值qq使用fixed赋予固定值nn如果属性存在固定值，则解析器检查属性值与固定值是否相同，不同则提示模式验证错误nn如果某属性在Schema中设置了固定值，而XML实例文档中其对应的元素没有该属性，则解析器插入该属性并赋予固定值qq默认值或固定值必须与对应属性的类型相符qq不能在同一个属性声明中同时使用默认值和固定值<attribute name=“version” type=“decimal” fixed=“1.1”/> 如果模式验证器发现元素没有kind属性，则插入该属性并将属性值设为Home <attribute name=“version” type=“string” fixed=“1.0”/> <attribute name=“kind” type=“contacts:KindType” default=“Home”/> 5.3 XML Schema的语法 nn属性通配符qq包括来自一个命名空间的任何属性的声明称为属性通配符nn<anyAttribute>只能出现在<complexType>或<attrbuteGourp>中，不能建立全局的<anyAttribute>声明nn可以插入namespace属性来控制属性可使用的命名空间<anyAttributenamespace=“allowable namespaces” processContents=“lax or skip or strict”> 5.3 XML Schema的语法 nn属性通配符值 说明 ##any 包括来自所有命名空间的属性 ##other 包括除了targetNamespace之外其他命名空间的属性 ##targetNamespace只包括来自targetNamespace命名空间的属性 ##local 包括所有没有命名空间限定的属性 由命名空间URI组成的，以空白符分隔的列表包括来自命名空间列表中的属性，列表可包括##targetNamespace和##local的属性 namespace属性允许值<complexType> <anyAttributenamespace=“##local http://www.w3.org/XML/1998/namespace” processContents=“lax”/> </complexType> 包括任何非限定属性以及来自http://www.w3.org/XML/1998/namespace命名空间的属性5.3 XML Schema的语法 nn属性通配符qq对于包含属性通配符声明的元素，模式验证器根据processContents的值验证XML实例文档nnskip: 跳过元素中的所有通配符属性nnlax: 不严格验证，如果验证器可以访问XML Schema，则对通配符属性进行验证nnstrict（默认值）或没有使用processContents属性: 对通配符属性进行验证，如果没有找到使用通配符属性的元素的全局XML Schema定义，则产生一个验证错误5.3 XML Schema的语法 nn<attributeGroup>声明qq用同一组属性描述多个元素，可建立一个能在<complexType>定义中重用的全局属性组qq必须给全局<attributeGroup>声明定义name属性并指定合适的名字<attributeGroupname=“name of global attribute group”> <attributeGroupname=“ContactsAttributes”> <!-- attribute declarations go here --> </attributeGroup> 5.3 XML Schema的语法 nn<attributeGroup>声明qq<attributeGroup>声明中允许有<attribute>声明作为其子声明，还允许属性通配符和对全局<attribute>和<attributeGroup>的引用，但不能递归引用自己qq使用<attributeGroup>，可在<complexType>中插入一个引用或<attributeGroup>全局声明<attributeGroupname=”AttGroup1”> <attributeGroupref=”target:AttGroup1”/> </attributeGroup> <attributeGroupname=”AttGroup1”> <attributeGroupref=”target:AttGroup2”/> </attributeGroup> <attributeGroupname=”AttGroup2”> <attributeGroupref=”target:AttGroup1”/> </attributeGroup> 5.3 XML Schema的语法 nn用简单内容和属性创建元素qq如果元素只包含简单内容和属性nn<simpleContent>声明表明<complexType>中不含子元素nn可以有属性，但必须被定义为简单类型nn使用<extension>声明可增加属性声明，扩展现有数据类型qq该声明的base属性可引用任何全局<simpleType>类型<element name=“phone”> <complexType> <simpleContent> <!-- Specify type here --> </simpleContent> </complexType> </element> <element name=“phone”> <complexType> <simpleContent> <extension base=“string”> <attribute name=“kind” type=“string” default=“Home” /> </extension> </simpleContent> </complexType> </element> <phone kind=“Home”>001-909-555-1212</phone> <phone>001-909-555-1212</phone> <phone />







5.3 XML Schema的语法
n数据类型
q内置数据类型
q用户自定义数据类型




5.3 XML Schema的语法 nn数据类型qq任何一种类型都可以用来限制元素和属性的内容<element name=“latitude” type=“float”/> <element name=“longitude” type=“float”/> 5.3 XML Schema的语法 nn数据类型qq用户自定义数据类型nn内置数据类型不能包括所有的数据类型qq合法但无效的数据值qq使用<simpleType>定义建立一个新类型kind=“Walkie-Talkie” 5.3 XML Schema的语法 nn<simpleType>声明qq可以建立用户自定义的数据类型nn必须以现有数据类型为基础qq内置的XML Schema数据类型qq另一个自定义数据类型qq包括三个主要的派生类型nn约束（Restriction）类型nn列表（List）类型nn联合（Union）类型<simpleTypename=“name of the simpleType” final=“#all or list or union or restriction”> 5.3 XML Schema的语法 nn<restriction>声明qq约束面（Facet）控制了XML Schema的全部简单类型nn约束面是<simpleType>独有的qq通过定义现有类型的约束面，可以创建更多自定义约束类型§§nonNegativeInteger由Integer派生，相当于将Integer的约束面minInclusive为0 qq不是所有类型都使用每个约束面qq使用base属性定义约束类型§§base属性值是一个对全局<simpleType>或内置数据类型的引用5.3 XML Schema的语法 nn<restriction>声明<attribute name=“kind”> <simpleType> <restriction base=“string”> <enumerationvalue=“Home”/> <enumerationvalue=“Work”/> <enumerationvalue=“Cell”/> <enumerationvalue=“Fax”/> </restriction> </simpleType> </attribute> 基类型string，用多个枚举约束面定义kind类型的允许值列表


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