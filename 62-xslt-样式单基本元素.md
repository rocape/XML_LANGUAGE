###6.2XSLT样式单基本元素
* XML声明
 + XSLT样式单本身也是XML文档，须符合XML规范
* XSLT样式单基本结构
```
<?xml version="1.0" encoding="UTF-8">
<xsl:stylesheet xmlns:xsl="http://w3.0rg/1999/XSL/Transform" version="1.0"
...
</xsl:stylesheet>
```
* 元素和指令
 + `<xsl:template>`定义模板规则
 + `<xsl:apply-template>`应用匹配的模板规则
 + `<xsl:value-of>`取得特点的节点或表达式的值
 + ...