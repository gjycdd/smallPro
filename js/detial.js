/**
 * Created by Administrator on 2016/9/27.
 */
($.extend({changeCoo:function(opt){
    var $fdj_list=$('.fdj_list');
    //商品的外层壳，用以获取商品的id
    var $proMain=$('.fmid_fe');
    //获取样式选取
    var $yansxx=$('.yansxx');
    //大小选取
    var $yangs=$('.yangs');
    //获取加入购物车的按钮
    var $reg = /^goods/;
    //$.changes();
    //需要加入cookie的:样式，大小，数量，单价，商品名，商品ID，详情页链接，图片，店铺
    //$.each(cookie(),function(key,val){
    //    if($reg.test(key)){
    //
    //    }
    // });
    //获取商品ID
    var $proID=$proMain.attr('id');
    //获取商品名
    var $proName=$('.goods_t_wl>h1').html();
    //获取店铺名
    var $shopName=$('.company>a').html();
    //获取详情页链接
    var $url=window.location.href;
    //获取样式
    var $type=$yansxx.children('.mouse_on').html();
    //获取图片路径
    var $proPic=$fdj_list.find('.selected').attr('src');
    //获取大小样式的容器ul
    //var $sizewrap=$yangs.children('ul[sec="block"]');//
    var $sizewrap=$yangs.find('li');
    //获取大小条目容器li
    var $sizeBox=$sizewrap.find('input[value!=0]').parent().parent();

    //遍历将取出的值存入一个
    $sizeBox.each(function(key,val){
        var setting={
            value:$(val).children('.sku_d').find('input').val()
        };
        var o= $.extend(setting,opt);
        //console.log(key);
        var $sizeId=$(val).attr('id');
        //大小
        var $size=$(val).children('.sku_a').html();
        //单价
        var $priceOnly=parseFloat($(val).children('.sku_c').html()).toFixed(2);
        //商品数目
        var $proNum= o.value;
        //console.log('goods'+$proID+$type+$size);

        //存cookie
        var $coo_val='{"name":"'+$proName+'","imgUrl":"'+$proPic+'","href":"'+$url+'","type":"'+$type+'","proId":"'+$proID+'","proNum":"'+$proNum+'","price":"'+$priceOnly+'","shop":"'+$shopName+'","size":"'+$size+'","goodsName":"goods'+$proID+$type+$size+'","sizeId":"'+$sizeId+'"}';
        cookie('goods'+$proID+$type+$sizeId,$coo_val,2);
    });
}}));
//图片透明度变化插件
(function($){
    $.fn.extend({
        pic_fade:function(opt){
            var setting={
                speed:100,
                opacity:0.8
            }
            var o=$.extend(setting,opt);
            this.hover(function(){
                $(this).stop().fadeTo(o.speed,o.opacity);
            },function(){
                $(this).stop().fadeTo(o.speed,1);
            });
        }
    });
}(jQuery));
//随机图片功能
(function($){
    $.fn.extend({
        randPic:function(opt){
            var setting={
                url:'json/randGoods.json',
                holder:$('#rand_goods'),
                num:4
            }
            var o= $.extend(setting,opt)
            $.ajax({
                type:'get',
                url:o.url,
                dataType:'JSON',
                success:function(data){
                    //产生不重复的随机数
                    var arr=[];
                    for(var i=0;i<$(data).size();i++){
                        arr.push(i);
                    }
                    var $num=arr.sort(function(a,b){
                        return Math.random()-0.5;
                    }).slice(0, o.num);
                    //遍历创建
                    $.each($num,function(key,val){
                        o.holder.children().eq(key).find('a').attr('href',data[val].href).end().find('img').attr('src',data[val].src).end().find('span').html(data[val].price);
                    })


                }
            })
        }
    })
}(jQuery))
$(function($){
    //放大镜效果
    var $old_pic=$('.old_pic_wrap')
    var $small_lj=$('.small_lj');
    var $big_lj=$('.big_lj');
    var $big_lj_img=$('.big_lj img');
    //加减商品
    var $pliFf=$('.pli_ff');
    //获取商品的加减操作栏
    var $sku_d=$('.sku_d');
    //获取商品单价
    var $sku_c=$('.sku_c');
    //获取下部显示合计区
    var $fgPrice=$('.fg_price');
    //创建一个统计数目的值
    var $proSum=0;
    var $priceSum=0;
    $old_pic.mousemove(function(e){
        $small_lj.show();
        $big_lj.show();
        var ev=e||window.event;
        //实际接触的对象坐标
        var l=ev.offsetX;
        var t=ev.offsetY;
        //使得鼠标位于小滤镜中央
        var movel=l-($small_lj.innerWidth()/2);
        var movet=t-($small_lj.innerHeight()/2)
        //边界值判断
        if(movel>=$old_pic.innerWidth()-$small_lj.innerWidth()){
            movel=$old_pic.innerWidth()-$small_lj.innerWidth();
        }else if(movel<=0){
            movel=0;
        }
        if(movet>=$old_pic.innerHeight()-$small_lj.innerHeight()){
            movet=$old_pic.innerHeight()-$small_lj.innerHeight();
        }else if(movet<=0){
            movet=0;
        }
        //小滤镜更随鼠标
        $small_lj.css({
            left:movel,
            top:movet
        })
        $big_lj_img.css({
            left:-movel*2,
            top:-movet*2
        })
    })
    $old_pic.mouseleave(function(){
        $(document).off('mousemove');
        $small_lj.hide();
        $big_lj.hide();
    });

    //tab切换改变图片路径
    var $fdj_list=$('.fdj_list');
    //绑定事件,放大镜跟随
    $.each($fdj_list.children(),function(key,val){
        $(val).mouseenter(function(){
            $(this).children().addClass('selected').end().siblings().children().removeClass('selected');
            $old_pic.children().eq(0).attr('src','images/fdj_img_'+($(this).index()+1)+'.png');
            $big_lj_img.attr('src','images/fdj_img_'+($(this).index()+1)+'.png');
        })
    })

    //颜色选择区
    var $colorArea=$('.yansxx a');
    //商品的大小样式
    var $sokucon=$('.sokucon');
    $colorArea.click(function(){
        $(this).addClass('mouse_on').siblings().removeClass('mouse_on');
        //$(this).attr('sec','block').siblings().attr('sec','none');
        //焦点更随
        $sokucon.scrollTop(0);
        $sokucon.eq($(this).index()).stop().show().siblings('.sokucon').stop().hide();
        $sokucon.eq($(this).index()).attr('sec','block').siblings('.sokucon').attr('sec','none');
    });

    //触摸透明度变化
    var $supply_img=$('.supply_img');
    $supply_img.children().pic_fade();
    $('.certify img').pic_fade();

    //随机商品展示
    var $research=$('#research');
    var $rand_goods=$('#rand_goods');
    $rand_goods.randPic();
    $research.click(function(){
        $rand_goods.randPic();
    });

    //点击收藏
    var $shouCang=$('.bdshare h5');
    var scCount=0;
    $shouCang.click(function(){
        scCount++;
        $shouCang.find('span').html(scCount);
    });

    //左侧上下,滚动图
    var $hisBo=$('.his_bo');
    var $prev=$('.prev');
    var $next=$('.next');
    var clickNum=0;
    var moveh=$hisBo.find('li').outerHeight(true);
    $prev.click(function(){
        clickNum--;
        if(clickNum<=-$hisBo.find('li').size()+5){
            clickNum=-$hisBo.find('li').size()+5;
        }
        $hisBo.children().stop().animate({top:(clickNum*moveh)},300)
    });
    $next.click(function(){
        clickNum++;
        if(clickNum>=0){
            clickNum=0;
        }
        $hisBo.children().stop().animate({top:(clickNum*moveh)},300)
    });
    //右侧左右滚动图
    var $saleLeft=$('.sale_left');
    var $saleRight=$('.sale_right');
    var $saleUl=$('.sale_gwscl>ul');
    var $movel=$saleUl.children().outerWidth(true);
    //console.log($movel);
    var $sclick=0;
    $saleLeft.click(function(){
        $sclick++;
        if($sclick>$saleUl.children().size()-5){
            $sclick=0;
        }
        $saleUl.stop().animate({left:-$sclick*$movel},300);
    });
    $saleRight.click(function(){
        $sclick++;
        if($sclick>$saleUl.children().size()-5){
            $sclick=0;
        }
        $saleUl.stop().animate({left:-$sclick*$movel},300);
    });
    //全选和反选以及单选
    var $saleqs=$('.saleqs');
    var $saleInput=$('.sale_input');
    //全选以及反选
    $saleqs.click(function(){
        if($saleqs.attr('class')=='saleqs'){
            $saleqs.addClass('sale_select');
            $saleInput.addClass('sale_select');
        }else{
            $saleqs.removeClass('sale_select');
            $saleInput.removeClass('sale_select');
        }
    });
    //单选
    var str='';
    for(var k=0;k<$saleInput.size();k++){
        str+='sale_input sale_select';
    }
    $saleInput.click(function(){
        var arr2=[];
        var $flagDan=$(this).attr('class');
        //console.log($flagDan);
        if($flagDan=='sale_input'){
            $(this).addClass('sale_select');
        }else{
            $(this).removeClass('sale_select');
        }
        //console.log($saleInput.size());
        for(var i=0;i<$saleInput.size();i++){
            arr2.push($saleInput.eq(i).attr('class'));
        }
        var str2=arr2.join('');
        if(str2==str){
            $saleqs.addClass('sale_select');

        }else{
            $saleqs.removeClass('sale_select');
        }
    });

    //吸顶
    var $menuUl=$('.menu_ul');
    var $st=$menuUl.offset().top;
    $(window).scroll(function(){
        if($(document).scrollTop()>=$st){
            $menuUl.addClass('ul_fix');
            $menuUl.children('a').css('display','block');
        }else{
            $menuUl.removeClass('ul_fix');
            $menuUl.children('a').css('display','none');
        }
    });

    //插图
    var $contImg=$('.cont_img');
    for(var j=0;j<31;j++){
        var $img=$('<img src="images/menu_pic'+(j+1)+'.png">');
        $contImg.append($img);
    }

    //小Tab切换
    var $lis=$menuUl.find('li');
    var $spans=$menuUl.find('span');
    var $tabCont=$menuUl.siblings();
    $lis.click(function(){
        $(document).scrollTop($st-40);
        $tabCont.eq($(this).index()).stop().show().siblings('div').stop().hide();
        $spans.eq($(this).index()).stop().show().parent().siblings('li').children('span').stop().hide();
    });

    //加入购物车功能


    var $addCart=$('#btn');
    $addCart.click(function(){
        $.changeCoo();
    });


    //减
    var count1=0;
    var count2=0;
    //$sku_d.find('.click_down').addClass('notallow').removeClass('allow');
    $sku_d.on('click','.click_down',function(){
        //var $index=$(this).parent().parent().index();
        var num=$(this).siblings('input').val();//获取个数
        num--;//个数减减
        if(num<0){
            $(this).addClass('notallow').removeClass('allow');
            num=0;
            //$.changeCoo();
        }else{
            $proSum--;//合计减减
            $(this).removeClass('notallow').addClass('allow');
            //$.changeCoo();
        }

        //改变input框的值
        $(this).siblings('input').attr('value',num);
        //下方联动显示属性
        $fgPrice.find('b').html($proSum);
        priceChange();

        //$sokucon.eq(0);
    });
    //加
    $sku_d.on('click','.click_up',function(){
        $(this).siblings('.click_down').removeClass('notallow').addClass('allow');
        var num=$(this).siblings('input').val();
        num++;
        if(num>parseInt($(this).parent().siblings('.sku_b').html())){
            num=parseInt($(this).parent().siblings('.sku_b').html());
        }else{
            $proSum++;
        }
        //改变input框的值
        $(this).siblings('input').attr('value',num);
        //下方联动显示属性
        $fgPrice.find('b').html($proSum);
        priceChange();
    });
    function priceChange(){
        $fgPrice.find('em').empty();
        $priceSum=0;
        $sku_c.each(function(index,item){
            var $num=parseInt($(item).parent().find('input').val());
            var $pri=parseFloat(item.innerHTML);
            //console.log($num*$pri);
            //console.log(parseFloat(item.innerHTML));
            $priceSum+=$num*$pri;
        });
        if($priceSum==0){
            $fgPrice.find('em').html('00.00');
        }else{
            $fgPrice.find('em').html($priceSum.toFixed(2));
        }
        $pliFf.find('.sn_ffc').empty();
        count1=0;
        $sokucon.eq(0).find('input').each(function(index,item){
            var $size=$(item).parent().parent().find('.sku_a').html();
            count1+=parseInt(item.value);
            if(item.value>0){
                $pliFf.eq(0).find('.sn_ffc')[0].innerHTML+='（'+item.value+'）'+$size+' ';
            }
        });
        if(count1>0){
            $pliFf.eq(0).css('display','block');
            $pliFf.eq(0).find('.sn_ffb').html('（'+count1+'）件');
        }else{
            $pliFf.eq(0).css('display','none');
        }
        count2=0;
        $sokucon.eq(1).find('input').each(function(index,item){
            var $size=$(item).parent().parent().find('.sku_a').html();
            count2+=parseInt(item.value);
            if(item.value>0){
                $pliFf.eq(1).find('.sn_ffc')[0].innerHTML+='（'+item.value+'）'+$size+' ';
            }
        });
        if(count2>0){
            $pliFf.eq(1).css('display','block');
            $pliFf.eq(1).find('.sn_ffb').html('（'+count2+'）件');
        }else{
            $pliFf.eq(1).css('display','none');
        }
       // console.log(count1);
    }
});