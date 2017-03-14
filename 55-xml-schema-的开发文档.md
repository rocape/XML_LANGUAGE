###5.5 XML Schema的开发文档 
* 为程序撰写文档是必须培养的良好习惯之一
* XML Schema提供了多种方法生成文档
 + 注释（Comments）
 + 引用其他命名空间的属性
 + 注解（Annotation）
* 注释
 + XML Schema中的注释须符合XML良构性规则
```
<!-- This complexTypeallows you to describe a person’s name broken down by first, middle and last parts of the name. You can also specify a greeting by including the title attribute. -->
<complexTypeame=”ameType”> 
<!-- The ameGroupis a global group defined in this XML Schema. -->
<group ref=”target:NameGroup”/>
<attribute name=”title” type=”string”/>
</complexType>
```
* 来自其他命名空间的属性
 + 所有定义在XML Schema词汇表中的元素都可以包含来自另一个命名空间中的任何属性
 + 可以用其他属性表示被包含在元素中的说明性数据
```
<?xml version=“1.0”?>
<schema xmlns=“http://www.w3.org/2001/XMLSchema” xmlns:target=“http://www.example.com/name” xmlns:doc=“http://www.w3.org/documentation” targetNamespace=“http://www.example.com/name” elementFormDefault=“qualified”> 
    <group name=“ameGroup”>
        <sequence>
            <element name=“first” type=“string” minOccurs=“1” maxOccurs=“unbounded”/> 
            <element name=“middle” type=“string” minOccurs=“0” maxOccurs=“1”/>
            <element name=“last” type=“string”/>
        </sequence>
    </group>
    <complexTypeame=“ameType” doc:comments=“This complexTypeallows you to describe a person’s name broken down by first, middle and last parts of the name. You can also specify a greeting by including the title attribute.”>
        <group ref=“target:NameGroup” doc:comments=“The ameGroupis a global group defined in this XML Schema.”/>
        <attribute name=“title” type=“string”/>
    </complexType>
    <element name=“name” type=“target:NameType”/>
</schema>
```

* 注解
 + XML Schema推荐标准中与文档有关的最主要特性
 + `<annotation>`声明可以是绝大多数XML Schema声明的子声明，其中可插入两类信息
    + 应用程序信息
    + 文档信息`<annotation id=“unique identifier”> `
 + 每个`<annotation>`声明可包含一个`<appinfo>`
元素和一个`<documentation>`元素
    + 元素中可包含来自任何命名空间的任何XML内容
    + 每个元素有一个source属性，表示程序信息或文档信息需要用到的一个外部文件的引用
        + `<appinfo>`传递实例文件、相关图像文件、验证需要的附加信息等内容
            + 模式验证器需要专门的程序设计后才可以使用`<appinfo>`提供的信息，不同程序对`<appinfo>`有不同的处理方式
            + `<appinfo>`通常还包含额外验证信息，例如其他模式语言
        + `<documentation>`则描述XML Schema中某个声明的特点或用法