###5.1 什么是XML Schema
* Schema是指任何类型的模型文档，它定义一个对象的结构，例如数据库结构或文档结构
* XML Schema（又称为XML Schema Definition, XSD）是用来描述XML结构、数据内容、相关约束等方面特征的语言，与DTD类似，但其本身是一个XML文档，符合XML语法规则，可被通用的XML解析器解析 
 + http://www.w3.org/XML/Schema 
* XML Schema的推荐标准分为三部分
 + XML Schema Part 0: Primer Second Edition     
    + http://www.w3.org/TR/xmlschema-0/，介绍XML Schema的基本概念
 + XML Schema Part 1: Structures Second Edition 
    + http://www.w3.org/TR/xmlschema-1/，定义XML Schema中用到的全部文档结构
 + XML Schema Part 2: DatatypesSecond Edition 
    + http://www.w3.org/TR/xmlschema-2/，描述XML Schema的数据类型

* XML模式语言的种类很多：
 + ISO Schematron
    + 一种非常独特的XML模式语言，无论是结合其他模式语言或者单独使用都具有强大的功能。Schematron允许直接表达规则，而不需要创建完整的语法基础设施。
 + XDR (XML-DATA Reduced)
    + 是由Microsoft提出的XML简化模式语言，作为W3C在讨论XML Schema工作草案过程中提出的一种过渡性Schema语言，XDR已经被业界普遍认可，得到许多产品（例如MS-BiztalkServer, MS-SQLServer和MS-Office）的广泛支持。
 + XML Schema 
    +W3C的正式推荐标准，提供了XML模式声明的完整语法、丰富的数据结构等，目前已成为应用最广泛的XML模式语言。
 + RELAX NG 
    + 一种基于语法的XML模式语言，可用于描述、定义和限制XML词汇表。它以简洁性和表达能力著称，并且具有良好的可扩展性。
