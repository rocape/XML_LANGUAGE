function validateXML(txt)
{
// code for IE
if (window.ActiveXObject)
  {
  var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async="false";
  xmlDoc.loadXML(document.all(txt).value);

  if(xmlDoc.parseError.errorCode!=0)
    {
    txt="Error Code: " + xmlDoc.parseError.errorCode + "\n";
    txt=txt+"Error Reason: " + xmlDoc.parseError.reason;
    txt=txt+"Error Line: " + xmlDoc.parseError.line;
    alert(txt);
    }
  else
    {
    alert("No errors found");
    }
  }
// code for Mozilla, Firefox, Opera, etc.
else if (document.implementation.createDocument)
  {
var parser=new DOMParser();
var text=document.getElementById(txt).value;
var xmlDoc=parser.parseFromString(text,"text/xml");

  if (xmlDoc.documentElement.nodeName=="parsererror")
    {
    alert(xmlDoc.documentElement.childNodes[0].nodeValue);
    }
  else
    {
    alert("No errors found");
    }
  }
else
  {
  alert('Your browser cannot handle XML validation');
  }
}
