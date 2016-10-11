/**
 * Created by Administrator on 2016/9/22.
 */
//封装轮播图插件
(function($){
    $.fn.extend({
        bannerPaly:function(opt){
            var setting={
                spacing:3000,
                speed:300
            }
            var o = $.extend(setting,opt);
            var count=0;
            var fx=1;
            var flag=true;
            //取到banner_t和ul
            var $banner_t=this;
            var $ban_t_ul=$banner_t.find('ul')
            //一个li的宽度
            var $lw=$ban_t_ul.find('li').eq(0).innerWidth();
            //li标签的个数
            var $num=$ban_t_ul.find('li').size();
            //ul的宽度
            $ban_t_ul.css('width',$lw*$num);
            //取按钮容器
            var $ban_t_btn=$banner_t.find('div');
            //创建左右按钮
            var $left=$('<a href="javascript:void(0);" class="left">&lt;</a>');
            var $right=$('<a href="javascript:void(0);" class="right">&gt;</a>');
            $banner_t.append($left);
            $banner_t.append($right);
            //left补充样式
            $left.css({
                textDecoration:'none',
                color:'#fff',
                left:0,
                top:($banner_t.innerHeight()-$left.innerHeight())/2
            });
            //right补充样式
            $right.css({
                textDecoration:'none',
                color:'#fff',
                right:0,
                top:($banner_t.innerHeight()-$left.innerHeight())/2
            });
            //左右按钮事件
            $left.click(function(){
                fx=-1;
                move();
            });
            $right.click(function(){
                fx=1;
                move();
            });
            //创建按钮
            for(var i=0;i<$num-1;i++){
                var $span=$('<span></span>');
                $ban_t_btn.append($span);
                $span.css({
                    width:11,
                    height:11,
                    float:'left',
                    marginRight:6,
                    background:'url(images/banner_cell.fw.png)'
                })
            }
            //初始化小按钮的样式
            $ban_t_btn.children().eq(0).css({
                background:'url(images/banner_cell_on.fw.png)'
            });
            //初始化小按钮的位置
            $ban_t_btn.css({
                left:($lw-$ban_t_btn.innerWidth())/2
            });
            //小按钮跟随事件
            var $timer=setTimeout(move, o.spacing);
            //自动轮播
            function move(){
                count+=fx;
                if(count==$num){
                    count=1;
                    $ban_t_ul.css('left',0);
                }else if(count==-1){
                    count=$num-2;
                    $ban_t_ul.css('left',-($num-1)*$lw);
                }
                $ban_t_ul.stop().animate({
                    left:-$lw*count
                }, o.speed,function(){
                    clearTimeout($timer);
                    if(flag){
                        $timer=setTimeout(move,o.spacing);
                    }
                });
                //小按钮跟随
                $ban_t_btn.children().eq(count%($ban_t_btn.find('span').size())).css({
                    background:'url(images/banner_cell_on.fw.png)'
                }).siblings().css({
                    background:'url(images/banner_cell.fw.png)'
                });
            }
            //小按钮点击事件
            $ban_t_btn.children().click(function(){
                var $i=$(this).index();
                if($i<=$num-1&&count==$num-1){
                    $ban_t_ul.css('left',0);
                }
                count=$i;
                $ban_t_ul.stop().animate({
                    left:-count*$lw
                }, o.speed)
                $(this).css({
                    background:'url(images/banner_cell_on.fw.png)'
                }).siblings().css({
                    background:'url(images/banner_cell.fw.png)'
                })
            })

            //鼠标移入移出事件
            $banner_t.hover(function(){
                $left.stop().show();
                $right.stop().show();
                clearTimeout($timer);
                flag=!flag;
            },function(){
                $left.stop().hide();
                $right.stop().hide();
                $timer=setTimeout(move, o.spacing);
                flag=!flag;
            })

            //console.log($ban_t_btn.innerWidth());
        }
    })
}(jQuery));
$(function($){
    //三个轮播
    $('.banner_t').bannerPaly();
    $('.banner_b').bannerPaly();
    $('.cap_move').bannerPaly();
    //取到右侧的tab切换部分
    var $slide_t_btn=$('.slide_t_btn');
    var $slide_t_list=$('.slide_t_list');
    $slide_t_btn.children().mouseenter(function(){
        $slide_t_list.children().eq($(this).index()).stop().fadeIn().siblings().stop().fadeOut();
        $(this).addClass('slide_on').siblings().removeClass('slide_on');
    })
    //取tab切换的下面一块
    var $slide_li=$('.slide_c li');
    //为每一块插入背景图
    $.each($slide_li,function(key,val){
        val.style.background='url(images/slide_c_'+key+'.png) no-repeat center top'
    });

    //判断登录
    if(cookie('logIs')){
        var log_tip=$.parseJSON(cookie('logIs')).login;
    }else{
        cookie('logIs','')
    }
    var hello = $('.hello');
    var $isLog = $('.top_l_span a');
    var $slide_log = $('.login_index span');
    //console.log($slide_log.children().end().next());
    var $login_index=$('.login_index');
    //对中部数据的处理
    var $floor_center=$('.floor_center');
    if(log_tip){//登录事件
        $.ajax({
            type:'get',
            url:'json/is_log.json',
            dataType:'JSON',
            success:function(data){
                $.each(data,function(key1,val){
                    //console.log($floor_center.eq(key1));
                    //console.log(val.floor);
                    $.each(val.floor,function(key2,val2){
                        var $lis=$('<li><p><a href="'+val2.href+'"><img src="'+val2.src+'"/></a></p><h3><a href="'+val2.href+'">'+val2.a_cont+'</a><span class="market_price">'+val2.pricetip+'</span><span class="iflog"><b style="font-size:14px; font-weight:normal;">'+val2.priceprev+'</b><b class="islog">'+val2.price+'</b></span></h3></li>')
                        //console.log(val2.href);
                        $floor_center.eq(key1).append($lis);
                    })
                })
            }
        });
        $login_index.siblings().addClass('login_btn');
        var $logs=$('<a href="###"><span>待付款</span><b id="dfk">0</b></a><a href="###"><span>待收货</span><b id="dsh">0</b></a><a href="###"><span>已完成</span><b id="ywc">0</b></a>');
        $login_index.siblings().append($logs);
        var $dfk=$('#dfk');
        var $reg = /^goods/;
        var $coo = cookie();
        var $sum=0;
        $.each($coo,function(key,val){
            if($reg.test(key)){
                var $val = $.parseJSON(val);
                var $num = $val.proNum;
                $sum+=parseInt($num);
            }
        });
        $dfk.html($sum);
        $isLog.eq(0).hide();
        $isLog.eq(1).show();
        $isLog.eq(2).hide();
        $isLog.eq(3).show();
        var user = JSON.parse(cookie().mesg).userName;
        hello.html(user+'，欢迎您回来 ');
        $slide_log.children().html(user).end().next().html('[退出]');
    }else{//未登录事件
        $.ajax({
            type:'get',
            url:'json/not_log.json',
            dataType:'JSON',
            success:function(data){
                $.each(data,function(key1,val){
                    //console.log($floor_center.eq(key1));
                    //console.log(val.floor);
                    $.each(val.floor,function(key2,val2){
                        var $lis=$('<li><p><a href="'+val2.href+'"><img src="'+val2.src+'"/></a></p><h3><a href="'+val2.href+'">'+val2.a_cont+'</a><span class="market_price">'+val2.pricetip+'</span><span class="iflog"><a class="nolog" style=" font-size:12px;" href="'+val2.priceprev+'">'+val2.price+'</a></span></h3></li>');
                        //console.log(val2.href);
                        $floor_center.eq(key1).append($lis);
                    })
                })
            }
        });
        $slide_log.children().html('欢迎来到多商网').end().next().html('您还未登录哦~');
        $isLog.eq(0).show();
        $isLog.eq(1).hide();
        $isLog.eq(2).show();
        $isLog.eq(3).hide();
        hello.html('您好，欢迎来到多商网！');
        $login_index.siblings().addClass('logout_btn');
        var $log_err=$('<a href="login.html"></a><a href="register.html"></a>');
        $login_index.siblings().append($log_err);
        $log_err.eq(0).css({
            width:117,
            background:'url(images/logout_bg1.png)'
        });
        $log_err.eq(1).css({
            width:118,
            background:'url(images/logout_bg2.png)'
        })
    }
    //console.log($log_err.eq(0));
    $slide_log.children().end().next().click(function(){
        log_tip=false;
        var flagObj={
            login:log_tip
        };
        var flagStr=JSON.stringify(flagObj);
        cookie('logIs',flagStr,flagStr,7);
    });

    //$('.cap_move ul').find('img').eq(2).css('margin-left','15px');
    $('.cap_move ul').find('img').eq(3).css('margin-left','15px').end().eq(2).css('margin-left','45px');

//    推楼啦
//    楼层属性（名字层数）
    //获取对应楼层的对应属性
    var $floor_num=$('.floor_num');
    var $floor_name=$('.floor_name');
    var $floor_go=$('.floor_go')
    //$floor_go.parent().attr('href',222)
    //console.log($floor_go.parent().attr('href'));
    //ajax获取数据
    $.ajax({
        type:"get",
        url:"json/indexFloor.json",
        dataType:"JSON",
        success:function(data){
            $.each(data,function(key,val){
                $floor_go.eq(key).parent().attr('href',val.href)
                $floor_num.eq(key).html(val.floor_num);
                $floor_name.eq(key).html(val.floor_name);
                $floor_go.eq(key).html(val.floor_go);
            })
        }
    });
    //每一层楼的左侧数据
    var $floor_left_l=$('.floor_left_l');
    var $floor_left_r=$('.floor_left_r');
    $.ajax({
        type:'get',
        url:'json/floorContentLeft.json',
        dataType:'JSON',
        success:function(data){
            $.each(data,function(key,val){
                //console.log(val);
                var $ul=$floor_left_l.eq(key).children();
                var $ull=$floor_left_l.eq(key).children().size();
                var $ul_pic=$floor_left_r.eq(key).children();
                //console.log($ul_pic);
                //console.log(val.floorlist[key]);
                for(var i=0;i<$ull;i++){
                    //console.log(val.floorlist[i]);
                    //对应的图片区域传建一个图片标签
                    var $l_img=$('<img src="'+val.floorlist[i].img[0].url+'"/>');
                    //插入图片，改写路径
                    $ul_pic.eq(i).attr('href',val.floorlist[i].img[0].href)
                    $ul_pic.eq(i).append($l_img);
                    //对应区域创建h3的title,部分和li标签，并且插入
                    var $h3=$('<h3>'+val.floorlist[i].title+'</h3>');
                    $ul.eq(i).append($h3);
                    for(var j=0;j<val.floorlist[i].textlist.length;j++){
                        //console.log(val.floorlist[i].textlist[j]);
                        var $conts=$('<li><a href="'+val.floorlist[i].textlist[j].href+'">'+val.floorlist[i].textlist[j].name+'</a></li>');
                        $ul.eq(i).append($conts);
                    }
                }
                //console.log($ul);
                //特效
                $ul.hover(function(){
                    $(this).css('width',215).siblings().css('width',76);
                    $floor_left_r.eq(key).children().eq($(this).index()).stop().fadeTo(0,0.3).siblings().stop().fadeTo(0,1)
                },function(){
                    $ul.css('width',76);
                    $floor_left_r.eq(key).children().fadeTo(0,1)
                })
            });
        }
    });

    //每一层的右侧数据
    var $floor_right=$('.floor_right');
    //console.log($floor_right.find('a'));
    //ajax获取数据
    $.ajax({
        type:'get',
        url:'json/floor_r.json',
        dataType:'JSON',
        success:function(data){
            $.each(data,function(key,val){
                //console.log($floor_right.eq(key).find('a'));
                //console.log(val.lis.length);
                for(var i=0;i<val.lis.length;i++){
                    var $r_img = $('<img src="'+val.lis[i].url+'"/>')
                    //console.log(val.lis[i].href);
                    //console.log($floor_right.eq(key).find('a')[i]);
                    $floor_right.eq(key).find('a').eq(i).attr('href',val.lis[i].href)
                    $floor_right.eq(key).find('a').eq(i).append($r_img);
                }
            })
        }
    });
});