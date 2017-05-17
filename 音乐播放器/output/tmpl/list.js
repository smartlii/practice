function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';

    var len = obj.length;

    for (var i = 0; i < len; i++) {
        var curData = obj[i];
 
__p+='\n    <li data-index="'+
((__t=( i ))==null?'':__t)+
'">\n        <h3>'+
((__t=( curData.song ))==null?'':__t)+
'<span> - '+
((__t=( curData.singer ))==null?'':__t)+
'</span></h3>\n    </li>\n ';
 } 
__p+='';
}
return __p;
}