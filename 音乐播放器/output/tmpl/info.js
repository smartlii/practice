function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1 class="song-name">'+
((__t=( obj.song ))==null?'':__t)+
'</h1>\n<h3 class="singer-name">'+
((__t=( obj.singer ))==null?'':__t)+
'</h3>\n<h3 class="album-name">专辑：'+
((__t=( obj.album ))==null?'':__t)+
'</h3>\n<h3 class="rhythm">编曲：'+
((__t=( obj.rhythm ))==null?'':__t)+
'</h3>\n<h3 class="lyric">歌词：'+
((__t=( obj.lyric ))==null?'':__t)+
'</h3>';
}
return __p;
}