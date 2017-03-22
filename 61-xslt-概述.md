###6.1 XSLT概述 
* XSLT（eXtensibleStylesheetLanguage Transformations）是在许多XML工作流中一个非常重要的应用
 + 应用XML数据之前必须要转换存储格式
    + 数据直接存储为XML格式
    + 数据保存为数据库文件，但可转化为XML格式
 + XML数据最终要以一种便于终端用户或合作伙伴使用的格式提供
    + 将XML转换为演示格式或重组
* XSLT中的字母T表示转换，它是XSL规范中的一部分，是可用于对XML树型数据进行结构重组转换的有力工具，可以根据指定的转换规则将一个XML文档树或者其中的部分内容转换为另一种文档树形式
* XSLT所提供的转换功能非常有效，并不仅仅局限于结构上的重组，准确的说，可以将XML文档转换为任何形式，包括XML、HTML和普通文本
 + 通常使用XSL作为一种在浏览器中显示XML数据的工具，将XML文档转换为HTML（通常需要增加一些HTML中的有关显示的标记）在浏览器中显示
 + XSLT并不是一种专门用于将XML转换为HTML的工具，其目的是为半结构化数据（树型模型）的转换、查询提供一种通用实现机制，输出结果并不仅局限于HTML，可以是任何所需的文本格式（比如XML）
* XSLT是一种声明性（Declarative）语言，即XSLT程序本身只是包含了一些转换规则的XML文档，这些规则可以被递归地应用到转换过程中
 + XSLT的功能要比CSS强大，原则上可以把任何一个XML文档转换为任何的输出格式
    + 重新组织一个XML文档，或选取一个XML文档的部分内容
    + XSLT1.0中源文档必须是XML格式，2.0中无此限制（csv）
* XSLT处理器（或称之为执行引擎）将首先确定XSLT规则，然后根据规则的匹配条件（通过XPath表达式指定）以及优先顺序完成相应的转换操作 
* XSLT本身也是一个XML文档，所以必须严格遵守XML规范，其根元素的命名空间为http://www.w3.org/1999/XSL/Transform
![](/assets/6_1.bmp)
* 在进行XSLT转换时，通常需要两个输入文档，一个是包含源数据的XML文档，一个是包含转换任务规则的XSLT文档 
* 由XML解析器对这两个文档进行解析，将包含源数据的XML文档转换为所对应的文档树结构，将XSLT文档中定义的处理模块看作是一系列的转换规则 
* 由XSLT处理器调用转换规则，对文档树进行遍历，分别处理其中指定的数据节点，将其转换为所需的结果集，并序列化为结果文档 
* XSLT处理器扫描整个XML文档，将其转化为一个节点树，即XSLT把XML源文档转换为目标文档
 + XSLT处理器接受一个XML源文档，在内存中用一个树形结构（源树，Source Tree）表示
 + XSLT处理器把一个XSLT应用到源树，生成目标树（Result Tree）
 + XSLT模板（Templates）规定了如何转换
    + 节点标签：表示将模板应用到XML文档的哪一个节点
    + 指令：规定如何对XML文档进行转换
* XSLT处理器扫描整个XML文档，将其转化为一个节点树，即XSLT把XML源文档转换为目标文档
 + 从源树生成目标树的过程称为转换（Transformation）
 + 基于目标树开始串行化（Serialization），生成一个被串行化（Serialized）的目标文档 
* 过程性（Procedural）语言
 + 使用过程性语言（Java等）定义函数时，需要告诉计算机每一步的执行过程
```
public class TextFor {
    public static void main(String[] args) {
        long result = 0;
        for(int i=1; i<=99; i+=2){
            result += i;
        }
    System.out.println(result);
    }
} 
```
* 声明性（Declarative）语言
 + 指明操作的对象，但不指明如何操作
    + 指示XSLT处理器如何处理，常用xsl:template元素，具有一个match属性，包含了相关模式
    + XSLT也是功能性（Functional）语言
        + 其执行过程完全依赖于函数，由函数接收输入数据和返回结果，不依赖于执行任务的持续状态
```
<xsl:templatematch=“Chapter”>
    <!-- The content of the <xsl:template> element defines what is to be added to the result tree. -->
</xsl:template> 
```
为一个XML源文档中的每一个Chapter元素生成一个输出结果
* 在XML中使用XSL 
 + 创建保存数据的良构的XML文档
 + 创建XSLT样式单
    + 一个遵守XSLT语法规范的良构的XML文档，所以XSLT也是XML的一个应用
 + 链接XSLT样式单到XML文档
    + 应用样式单的XML文档可直接在浏览器中显示
        + 不使用XSLT或CSS则显示XML源码
    + XSLT样式单扩展名.xsl/.xslt
 + 使用xml-stylesheet处理指令引用XSLT样式单
 ```
<?xml version=“1.0” encoding=“UTF-8”?>
<?xml-stylesheettype=“text/xsl” href=“URL”?>
```
 URL是XSLT样式单文件的位置（本地or Web，绝对路径or 相对路径）
* XML文档结构树
 + 一个结构完整的XML文档可以转换为一棵结构完整的结构树
 + 结构树从根节点开始
    + 根节点!=根元素
        + 根节点：/ 
        + 根元素用其他名字：<People> 
    + 根节点后按照元素嵌套顺序排列子节点
        + 三个（直接）子节点
            + XML声明
            + xml-stylesheet处理指令
                + 可为一个XML文档指定多个样式单，但通常是在一个样式单中引用其他样式单，而不直接在XML文档中指定
            + 根元素 
* XML文档结构树
 + 结构树的节点可以是元素、元素属性、元素内容文本、处理指令和注释
    + 类似操作系统
    + 从根节点开始搜索
    + “+/-”表示子节点是否展开