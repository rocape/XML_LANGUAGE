<SCRIPT language="JavaScript"><!--
function getCookieVal(offset)
{var endstr=document.cookie.indexOf(";",offset);if(endstr==-1)
endstr=document.cookie.length;return unescape(document.cookie.substring(offset,endstr));}function GetCookie(name)
{var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;while(i<clen)
{var j=i+alen;if(document.cookie.substring(i,j)==arg)
return getCookieVal(j);i=document.cookie.indexOf(" ",i)+1;if(i==0)
break;
}return null;}function SetCookie(name,value)
{var argv=SetCookie.arguments;var argc=SetCookie.arguments.length;var expires=(2<argc)?argv[2]:null;var path=(3<argc)?argv[3]:null;var domain=(4<argc)?argv[4]:null;var secure=(5<argc)?argv[5]:false;document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");}function ResetCounts(name)
{visits=0;SetCookie("visits",visits,expdate,"/",null,false);location.reload();}
//-->
</SCRIPT>
<SCRIPT language="JavaScript"><!--
var expdate=new Date();
var visits;//以下设置COOKIES时间为1年,自己随便设置该时间..
expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
if(!(visits=GetCookie("visits")))
visits=0;visits++;SetCookie("visits",visits,expdate,"/",null,false);//以下信息显示可以使用标准的HTML语法,自己随便设置。
document.write("你已经光临本页"+"<FONT COLOR=red>"+visits+"</FONT>"+"次！");if(visits==1)//来访1次的信息显示
document.write("<br>"+"欢迎光临本站，觉得本站内容如何？");if(visits==2)//来访2次的信息显示，以下类推，自己随便增加。
document.write("<br>"+"再次光临不胜容幸!今后要常来啊！欢迎订阅本站邮件列表。");if(visits==3)
document.write("<br>"+"常客，在本站的论坛发个帖子如何？");if(visits==4)
document.write("<br>"+"你这个疯子!");if(visits>=5)
document.write("<br>"+"疯狂的家伙!我真的非常喜欢你。");
//-->

</SCRIPT>
