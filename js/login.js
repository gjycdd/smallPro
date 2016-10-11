/**
 * Created by Administrator on 2016/9/22.
 */
$(function($){
    //console.log(JSON.parse(cookie().mesg).email);
    //登录页账户框
    var user=$('.login input').eq(0);
    //登录页密码框
    var pass=$('.login input').eq(1);
    //获取登录按钮
    var log=$('.login input').eq(2);
    //获取提示框
    var tips=$('form p');

    //cookie()?user.val(phone):user.val();
    if(cookie()){
        //获取cookie中的注册信息
        var email=JSON.parse(cookie().mesg).email;
        var username=JSON.parse(cookie().mesg).userName;
        var phone=JSON.parse(cookie().mesg).phoneNum;
        var password=JSON.parse(cookie().mesg).passWord;
        user.val(phone);
    }else{
        user.val();
        cookie('mesg','');
    }


    useTrue();
    //console.log(useTrue());
    //登录用户框失去焦点事件
    user.blur(function(){
        useTrue();
    })

    //登录密码框失去焦点事件
    pass.blur(function(){
        passTrue();
    });

    if(cookie('logIs')) {
        var _flag = JSON.parse(cookie('logIs')).login;
    }else{
        cookie('logIs','');
    }

    log.click(function(){
        if(useTrue()&&passTrue()){
            _flag=true;
            var flagObj={
                login:_flag
            };
            var flagStr=JSON.stringify(flagObj);
            cookie('logIs',flagStr,flagStr,7);
            window.location.href='index.html';
        }else{
            alert('登录失败');
        }
    });

    //判断用户名
    function useTrue(){
        if(email==user.val()||username==user.val()||phone==user.val()){
            tips.eq(0).html('信息通过验证');
            tips.eq(0).show();
            tips.eq(0).addClass('log_true');
            return true;
        }else if(user.val()==''){
            tips.eq(0).html('用户名不能为空');
            tips.eq(0).show();
            tips.eq(0).removeClass('log_true');
            return false;
        }else{
            tips.eq(0).html('用户名不存在！');
            tips.eq(0).show();
            tips.eq(0).removeClass('log_true');
            return false;
        }
    }

    //判断密码
    function passTrue(){
        if(password==pass.val()&&(email==user.val()||username==user.val()||phone==user.val())){
            tips.eq(1).html('信息通过验证');
            tips.eq(1).show();
            tips.eq(1).addClass('log_true');
            return true;
        }else if(pass.val()==''){
            tips.eq(1).html('密码不能为空');
            tips.eq(1).show();
            tips.eq(1).removeClass('log_true');
            return false;
        }else{
            tips.eq(1).html('密码错误！');
            tips.eq(1).show();
            tips.eq(1).removeClass('log_true');
            return false;
        }
    }
})