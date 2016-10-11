/**
 * Created by Administrator on 2016/9/30.
 */
$(function($){
    var $active_h=$('.active_h');

    $active_h.children().each(function(key,val){
        var $w=$(val).outerWidth();
        $(val).css('left',key*$w);
    });
    $active_h.on('mouseenter','li',function(){
        $(this).css({'top':-4,'border-top':'1px solid #9D0E03','border-bottom':'1px solid #E3BEBB','border-left:':'1px solid #500701','border-right:':'1px solid #9D0E03', 'height':47,'z-index':1000});
    });
    $active_h.on('mouseleave','li',function(){
        $active_h.children().css({'top':0,'border':0, 'height':47, 'z-index':0});
    });
    $active_h.on('click','li',function(){
        $(this).addClass('lion').siblings().removeClass('lion');
    });

    //推楼
    //获取楼层
    var $floorList=$('.floorlist');
    $.ajax({
        'type':'get',
        'url':'json/profloor.json',
        'dataType':'JSON',
        'success':function(data){
            $.each(data,function(key,val){
                var $ul=$('<ul></ul>');
                $.each(val.floor,function(num,name){
                    var $lis=$('<li><a href="'+name.href+'" class="pic"><img src="'+name.src+'" alt=""/></a><h3><a href="'+name.href+'" class="protitle">'+name.title+'</a><span class="jylsj">'+name.advice+'</span><span class="proprice">'+name.price+'</span><span class="sj">'+name.personNum+'</span><a href="javascript:;" class="addbtn"></a></h3></li>');
                    $ul.append($lis);
                });
                $floorList.eq(key).append($ul);
            });
        }
    });

    //吸顶以及楼层跳转
    var $floorh=$('.floorh');
    var $activeH=$('.active_h');
    //吸顶
    $(window).scroll(function(){
        var $st=$(document).scrollTop();
        if($st>=900){
            $activeH.addClass('act_move');
        }else{
            $activeH.removeClass('act_move');
        }
    });
    //楼层跳转
    $activeH.on('click','li',function(){
        var $index = $(this).index();
        $('html,body').stop().animate({
            scrollTop:$floorh.eq($index).offset().top-70
        }, 500)
    })
});