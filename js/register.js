/**
 * Created by Administrator on 2016/9/20.
 */
$(document).ready(function(){
    //为每一个绑定背景
    $('.register_h>span')[0].style.background='url(images/register_step1_at.png)';
    $('.register_h>span')[1].style.background='url(images/register_step2_nat.png)';
    $('.register_h>span')[2].style.background='url(images/register_step3_nat.png)';
    //获取所有input
    var inps=$('.step1 input');
    //获取所有的错选
    var errs=$('.step1 .error');
    //获取step1
    var $step1=$('.step1');
    //获取step2
    var $step2=$('.step2');
    //获取step3
    var $step3=$('.step3');
    //获取注册按钮
    var inps2=$('.step2 input');
    //获取前往按钮
    var oBtn=$('.step3 button');

    //step1
    //邮箱和验证码判断
    var reg_mail=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    var reg_code=/^[a-zA-Z0-9]{4}$/i;
    inps[0].onblur=function(){
        if(inps[0].value==''){
            errs[0].style.display='block';
            errs[0].innerHTML='请填写邮箱!';
            errs[0].className='error';
            return false;
        }else if(!reg_mail.test(inps[0].value)){
            errs[0].style.display='block';
            errs[0].innerHTML='邮箱格式错误!';
            errs[0].className='error';
            return false;
        }else if(reg_mail.test(inps[0].value)){
            if(isEmail()){
                errs[0].style.display='block';
                errs[0].innerHTML='邮箱已注册！';
                errs[0].className='error';
                return false;
            }else{
                errs[0].style.display='block';
                errs[0].innerHTML='通过信息认证';
                errs[0].className='true';
                return true;
            }
        }
    }

    inps[1].onblur=function(){
        var get=trim($yzm[0].innerHTML,'all');
        if(inps[1].value==''){
            errs[1].style.display='block';
            errs[1].innerHTML='请填写验证码!';
            errs[1].className='error';
            return false;
        }else if(!reg_code.test(inps[1].value)||(get.toLowerCase()!=inps[1].value.toLowerCase())){
            errs[1].style.display='block';
            errs[1].innerHTML='验证码错误!';
            errs[1].className='error';
            return false;
        }else if(reg_code.test(inps[1].value)&&(get.toLowerCase()==inps[1].value.toLowerCase())){
            errs[1].style.display='block';
            errs[1].innerHTML='通过信息认证';
            errs[1].className='true';
            return true;
        }
    }
    inps[4].onclick=function(){
        if(inps[0].onblur()&&inps[1].onblur()&&inps[3].checked){
            $step1.css('display','none');
            $step2.css('display','block');
            $('.register_h>span')[0].style.background='url(images/register_step1_nat.png)';
            $('.register_h>span')[1].style.background='url(images/register_step2_at.png)';
            addCookie();
        }else{
            yanZhenMa();
            alert('提交失败');
        }
    }

    //生成验证码
    var $yzm=$('.step1 b');
    var $btn1=$('#reget');
    function randomNumber(min,max){
        return Math.random()*(max-min+1)+min;
    }
    function yanZhenMa(){
        var i=0;
        var str="";
        while(i<=3){
            var num=randomNumber(48,122);
            if((num>=97&&num<=122)||(num>=65&&num<=90)||(num>=48&&num<=57)){
                str+=String.fromCharCode(num)+" ";
                i++;
            }
        }
        $yzm.html(str);
        //随机背景色
        var r=Math.floor(Math.random()*255);
        var g=Math.floor(Math.random()*255);
        var b=Math.floor(Math.random()*255);
        $yzm.css({
            background:'rgb('+r+','+g+','+b+')',
            color:'#ffffff'
        });
    }
    yanZhenMa();
    $btn1.click(function(){
        yanZhenMa();
    });
    //去除字符串中的空格
    function trim(str,type){
        var type=type||'side';   //默认值  默认去掉左右两边的空格
        if(type=='side'){
            return str.replace(/^\s*|\s*$/g,'');
        }else if(type=='left'){
            return str.replace(/^\s*/g,'');
        }else if(type=='rigth'){
            return str.replace(/\s*$/g,'');
        }else if(type=='all'){
            return str.replace(/\s*/g,'');
        }
    }

    //step2
    //去除所有step2中的error
    var errs2=$('.step2 .error');
    //用户名验证
    var reg_usr=/^[a-zA-Z]\w{5,19}$/;
    inps2[0].onblur=function(){
        if(inps2[0].value==''){
            errs2[0].style.display='block';
            errs2[0].innerHTML='请填写用户名!';
            errs2[0].className='error';
            return false;
        }else if(!reg_usr.test(inps2[0].value)){
            errs2[0].style.display='block';
            errs2[0].innerHTML='用户名格式错误!';
            errs2[0].className='error';
            return false;
        }else if(reg_usr.test(inps2[0].value)){
            if(isUser()){
                errs2[0].style.display='block';
                errs2[0].innerHTML='用户名已存在!';
                errs2[0].className='error';
                return false;
            }else{
                errs2[0].style.display='block';
                errs2[0].innerHTML='信息通过验证';
                errs2[0].className='true';
                return true;
            }
        }
    }

    //密码验证
        //1 可以全数字
        //2 可以全字母
        //3 可以全特殊字符(~!@#$%^&*.)搜索
        //4 三种的组合
        //5 可以是任意两种的组合
        //6 长度6-22
    var reg_pass=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    inps2[1].onblur=function(){
        if(inps2[1].value==''){
            errs2[1].style.display='block';
            errs2[1].innerHTML='请填写密码!';
            errs2[1].className='error';
            return false;
        }else if(!reg_pass.test(inps2[1].value)){
            errs2[1].style.display='block';
            errs2[1].innerHTML='密码格式错误!';
            errs2[1].className='error';
            return false;
        }else if(reg_pass.test(inps2[1].value)){
            errs2[1].style.display='block';
            errs2[1].innerHTML='信息通过验证';
            errs2[1].className='true';
            return true;
        }
    }

    //二次输入密码验证
    inps2[2].onblur=function(){
        if(inps2[2].value==''){
            errs2[2].style.display='block';
            errs2[2].innerHTML='请填写密码!';
            errs2[2].className='error';
            return false;
        }else if(inps2[2].value!=inps2[1].value){
            errs2[2].style.display='block';
            errs2[2].innerHTML='密码输入不一致!';
            errs2[2].className='error';
            return false;
        }else if(inps2[2].value==inps2[1].value){
            errs2[2].style.display='block';
            errs2[2].innerHTML='信息通过验证';
            errs2[2].className='true';
            return true;
        }
    }

    //手机验证
    var reg_phone=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    inps2[3].onblur=function(){
        if(inps2[3].value==''){
            errs2[3].style.display='block';
            errs2[3].innerHTML='请填写手机号码!';
            errs2[3].className='error';
            return false;
        }else if(!reg_phone.test(inps2[3].value)){
            errs2[3].style.display='block';
            errs2[3].innerHTML='手机码格式错误!';
            errs2[3].className='error';
            return false;
        }else if(reg_phone.test(inps2[3].value)){
            if(isPhone()){
                errs2[3].style.display='block';
                errs2[3].innerHTML='手机码已注册!';
                errs2[3].className='error';
                return false;
            }else{
                errs2[3].style.display='block';
                errs2[3].innerHTML='信息通过验证';
                errs2[3].className='true';
                return true;
            }
        }
    }

    //邀请码
    var reg_yao=/^[a-zA-Z0-9]{15}$/
    inps2[4].onblur=function(){
        if(inps2[4].value==''){
            errs2[4].style.display='none';
            return true;
        }else if(!reg_yao.test(inps2[4].value)){
            errs2[4].style.display='block';
            errs2[4].innerHTML='邀请码不存在!';
            errs2[4].className='error';
            return false;
        }else if(reg_yao.test(inps2[4].value)){
            errs2[4].style.display='block';
            errs2[4].innerHTML='信息通过验证';
            errs2[4].className='true';
            return true;
        }
    }

    //域名验证
    var reg_url=/^(http(s)?:\/\/)?(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
    inps2[5].onblur=function(){
        if(inps2[5].value==''){
            errs2[5].style.display='none';
            return true;
        }else if(!reg_url.test(inps2[5].value)){
            errs2[5].style.display='block';
            errs2[5].innerHTML='域名出错!';
            errs2[5].className='error';
            return false;
        }else if(reg_url.test(inps2[5].value)){
            errs2[5].style.display='block';
            errs2[5].innerHTML='信息通过验证';
            errs2[5].className='true';
            return true;
        }
    }

    //注册按钮
        //获取cookie中的注册信息
    //var email=JSON.parse(getCookie('mesg')).email;
    //var username=JSON.parse(getCookie('mesg')).userName;
    //var phone=JSON.parse(getCookie('mesg')).phoneNum;
    //if(getCookie()!={}){
    //    //获取cookie中的注册信息
    //    var email=JSON.parse(getCookie('mesg')).email;
    //    var username=JSON.parse(getCookie('mesg')).userName;
    //    var phone=JSON.parse(getCookie('mesg')).phoneNum;
    //}else{
    //    setCookie('mesg','');
    //}
    ////获取P下面的span
    //var $spans=$('.step3 p span');
    //$spans.eq(0).html(username);
    //$spans.eq(1).html(email);
    //$spans.eq(2).html(phone);
    inps2[6].onclick=function(){
        //满足条件跳转
        if(inps2[0].onblur()&&inps2[1].onblur()&&inps2[2].onblur()&&inps2[3].onblur()&&inps2[4].onblur()&&inps2[5].onblur()){
            $step2.css('display','none');
            $step3.css('display','block');
            $('.register_h>span')[1].style.background='url(images/register_step2_nat.png)';
            $('.register_h>span')[2].style.background='url(images/register_step3_at.png)';
            addCookie();//添加cookie信息
            //添加后判断，并且推入step3
            if(cookie()!={}){
                //获取cookie中的注册信息
                var email=JSON.parse(cookie('mesg')).email;
                var username=JSON.parse(cookie('mesg')).userName;
                var phone=JSON.parse(cookie('mesg')).phoneNum;
            }else{
                cookie('mesg','');
            }
            //获取P下面的span
            var $spans=$('.step3 p span');
            $spans.eq(0).html(username);
            $spans.eq(1).html(email);
            $spans.eq(2).html(phone);
        }else{//否则不予跳转
            alert('注册失败');
        }
    }

    //step3
    oBtn.click(function(){
        window.location.href='index.html';
    })

    //判断邮箱是否存在
    function isEmail(){
        //从cookie中取出购物车的信息  并且判断当前的购物车信息里有没有对应的商品
        var mesgStr=cookie("mesg") ? cookie("mesg") : "{}";
        var mesg=JSON.parse(mesgStr);//object
        if(inps[0].value==mesg.email){
            //如果存在
            return true;
        }else{
            // 如果不存在
            return false;
        }
    }

    //判断用户名是否存在
    function isUser(){
        //从cookie中取出购物车的信息  并且判断当前的购物车信息里有没有对应的商品
        var mesgStr=cookie("mesg") ? cookie("mesg") : "{}";
        var mesg=JSON.parse(mesgStr);//object
        if(inps2[0].value==mesg.userName){
            //如果存在
            return true;
        }else{
            // 如果不存在
            return false;
        }
    }

    //判断手机是否存在
    function isPhone(){
        //从cookie中取出购物车的信息  并且判断当前的购物车信息里有没有对应的商品
        var mesgStr=cookie("mesg") ? cookie("mesg") : "{}";
        var mesg=JSON.parse(mesgStr);//object
        if(inps2[3].value==mesg.phoneNum){
            //如果存在
            return true;
        }else{
            // 如果不存在
            return false;
        }
    }

    function addCookie(){
        var mesgStr=cookie("mesg") ? cookie("mesg") : "{}";
        var mesg=JSON.parse(mesgStr);//object
        var logStr=cookie("log") ? cookie("log") : "{}";
        var logIs=JSON.parse(logStr);//object
        mesg={
            "email":inps[0].value,
            userName:inps2[0].value,
            passWord:inps2[1].value,
            phoneNum:inps2[3].value,
            yao:inps2[4].value,
            url:inps2[5].value,
        }
        logIs={
            login:false
        }
        logStr=JSON.stringify(logIs);
        cookie("logIs",logStr,7);
        mesgStr=JSON.stringify(mesg);
        cookie("mesg",mesgStr,7);
    }
})
