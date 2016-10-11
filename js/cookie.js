//name是键名   value是键值  isDay是有效期
//设置cookie
function  setCookie(name,value,isDay) {
    var date=new Date();
    date.setDate(date.getDate()+isDay);
    document.cookie=name+"="+value+";expires="+date.toString()+";path=/";
}
//获取cookie
function getCookie(name) {
    var arr=document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}
//删除cookie
function removeCookie(name) {
    setCookie(name,1,-1);
}
