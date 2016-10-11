/**
 * Created by Administrator on 2016/9/23.
 */
//友情链接上下拉伸功能
$(function($){
    //获取友情链接点击按钮
    var $fade=$('#fade');
    //获取裹挟部分
    var $fade_wrap=$('.fade_wrap');
    //开关
    var $flag=true;
    $fade.click(function(){
        if($flag){
            $fade.html('收起友情链接﹀');
            $fade_wrap.stop().slideDown(800);
            $flag=!$flag;
        }else{
            $fade.html('展开友情链接︿');
            $fade_wrap.stop().slideUp(800);
            $flag=!$flag;
        }
    });

    //获取返回顶部
    var $re_top=$('.cebian p');
    //滚动条滚动时判断滚动高度，600+返回顶部按钮显示，否则消失
    window.onscroll=function(){
        if($(document).scrollTop()>=600){
            $re_top.show();
        }else{
            $re_top.hide();
        }
    };
    //鼠标移入移出事件
    $re_top.hover(function(){
        $re_top.css('background','url(images/share_return_topon.png)')
    },function(){
        $re_top.css('background','url(images/share_return_top.png)')
    });
    //返回顶部事件
    var timer;
    $re_top.click(function(){
        clearInterval(timer);//点击时先清除定时器防止BUG
        var speed=$(document).scrollTop();//点击时获取滚动条高度
        timer=setInterval(function(){
            speed-=50;
            $(document).scrollTop(speed);//以滚动条高度作为初始高度开始减
            if(speed<=0){//到达顶部时清除定时器
                speed=0;
                clearInterval(timer);
            }
        },1);
    });

    //小广告
    var $ad=$('.adver');
    var $ad_close=$('.adver p');
    //小广告关闭按钮
    $ad_close.click(function(){
        $ad.stop().animate({
            bottom:-404
        },1000);
    });
    //定时出现,定时消失的小广告
    var time_rap;
    var time_ad=setTimeout(function(){
        $ad.stop().animate({
            bottom:0
        },1000,function(){
            setTimeout(function(){
                time_rap=$ad.stop().animate({
                    bottom:-404
                },1000,function(){
                    clearTimeout(time_rap);
                })
            },5000)
            clearTimeout(time_ad);
        });
    },1000)

    //判断是否登录
    //console.log(cookie());

    if(cookie('logIs')){
        var log_tip=$.parseJSON(cookie('logIs')).login;
    }else{
        cookie('logIs','')
    }

    //function loged(){
    //    //判断登录
    //    if(log_tip){
    //        return true;
    //    }else{
    //        return false;
    //    }
    //    //return true;
    //    //return a;
    //}
    //alert(navigator.userAgent.indexOf("MSIE"));
    var hello = $('.hello');
    var $isLog = $('.top_l_span a');
    if(log_tip){//如果登录那么
        $isLog.eq(0).hide();
        $isLog.eq(1).show();
        $isLog.eq(2).hide();
        $isLog.eq(3).show();
        var user = JSON.parse(cookie().mesg).userName;
        hello.html(user+'，欢迎您回来 ');
    }else{
        $isLog.eq(0).show();
        $isLog.eq(1).hide();
        $isLog.eq(2).show();
        $isLog.eq(3).hide();
        hello.html('您好，欢迎来到多商网！');
    }

    //退出登录事件
    $isLog.eq(3).click(function(){
        log_tip=false;
        var flagObj={
            login:log_tip
        };
        var flagStr=JSON.stringify(flagObj);
        cookie('logIs',flagStr,flagStr,7);
    })

    //导航条以及侧边栏事件
    //改变导航条的覆盖样式
    var $navs=$('#nav li a');
    $navs.hover(function(){
        $(this).addClass('navcur');
    },function(){
        $(this).removeClass('navcur');
    })

    //获取每一个b_i
    var $b_i=$('.b_i');
    var $mask=$('.mask');
    //console.log($b_i.size());
    function notOn(){
        for(var i=0;i<$b_i.size();i++){
            $b_i.eq(i).css('background','url(images/catelist_'+i+'.png) no-repeat center');
            $mask.eq(i).css('top',i*62);
        }
    }
    notOn();

    //获取每一个cata_btn
    var $cata_btn=$('.cata_btn');
    //获取每一个catagroup
    var $catagroup=$('.catagroup');
    $catagroup.hover(function(){
        $(this).find('.b_i').siblings().addClass('b_a');
        $(this).find('.b_i').css('background','url("images/catelist_'+$(this).index()+'_on.png") no-repeat center');
        $(this).css('background','#ffffff');
        $(this).find('dd').children().css('color','#000');
        $(this).find('dd').children().hover(function(){
            $(this).css('color','#D61E00');
        },function(){
            $(this).css('color','#000');
        })
        $(this).find('.cata_main').stop().show();
        $('mask').stop().hide();
        $(this).find('.mask').stop().show();
    },function(){
        $(this).find('.b_i').siblings().removeClass('b_a');
        $(this).find('.b_i').css('background','url("images/catelist_'+$(this).index()+'.png") no-repeat center');
        $(this).css('background','#222');
        $(this).find('dd').children().css('color','#fff');
        $(this).find('.cata_main').stop().hide();

    });

    var $cata_main=$('.cata_main');
    var $cata_ul=$('.cata_main ul');
    //ajax加载数据
    $.ajax({
        type:'get',
        url:'json/allProduct.json',
        dataType:'JSON',
        success:function(data){
            $.each(data,function(key,val){
                //key对应的每一个ul和每一个属性值

                //获取对应对象的第一张和第二张图
                var $src1=val.lis[1].imgList[0].src;
                var $href1=val.lis[1].imgList[0].href;
                var $src2=val.lis[1].imgList[1].src;
                var $href2=val.lis[1].imgList[1].href;
                //console.log(val.lis[0].textList.length);

                //创建li来存放带链接的图片，并且推入ul
                var $li=$('<li><a href="'+$href1+'"><img src="'+$src1+'" alt=""/></a></li><li><a href="'+$href2+'"><img src="'+$src2+'" alt=""/></a></li>')
                $cata_ul.eq(key).append($li);

                //循环，对每一个对应textList创建一个dl
                for(var i=0;i<val.lis[0].textList.length;i++){
                    var $dl=$('<dl><dt>'+val.lis[0].textList[i].team+'</dt><dd></dd></dl>');

                    //推入对应框
                    $cata_main.eq(key).append($dl);
                    //缓存每一个textList对象
                    var $textlist=val.lis[0].textList[i];
                    //console.log($textlist.list.length);
                    //循环，对每一个list创建一个a并且推入指定的dd
                    for(var j=0;j<$textlist.list.length;j++){
                        var $proName=$textlist.list[j].name;
                        var $proHref=$textlist.list[j].href;
                        var $a=$('<a href="'+$proHref+'">'+$proName+'</a>');
                        $dl.find('dd').append($a);
                    }
                }
            })
        }
    })

    //nav特效
    var $nav_cate=$('.nav_cate');
    var $nav_i=$('.nav_cate>i');
    var $catelist=$('.catelist');
    if($nav_cate.attr('name')=='down'){
        $nav_cate.hover(function(){
            $catelist.removeClass('disp');
            $nav_i.css('background','url(images/nav_xia.fw.png) no-repeat 183px center')
        },function(){
            $catelist.addClass('disp');
            $nav_i.css('background','url(images/nav_shang.png) no-repeat 183px center')
        })
    }
});
