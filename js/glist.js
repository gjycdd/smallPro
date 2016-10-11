/**
 * Created by Administrator on 2016/10/7.
 */
$(function($){
    var $dHead=$('.d_head');
    var $dFoot=$('.d_foot');
    var $linavmain=$('.linavmain');
    var $dmask=$('.dmask');
    var $dd=$dmask.siblings('dd');
    var $dl=$('.fnavwrap>dl');
    var $linav=$('.linav');
    $linav.find('.licall').hover(function(){
        $(this).addClass('ahover');
        $linavmain.eq($(this).parent().index()-1).css('display','block');
        //console.log($(this).parent().index());
    },function(){
        $(this).removeClass('ahover');
        $linavmain.eq($(this).parent().index()-1).css('display','none');
    });
    $dl.hover(function(){
        $dmask.eq($(this).index()).css('display','block');
        $dd.eq($(this).index()).css('display','block');
    },function(){
        $dmask.eq($(this).index()).css('display','none');
        $dd.eq($(this).index()).css('display','none');
    });

    var $fixednav=$('.fixednav');
    $(window).scroll(function(){
        var $st=$(document).scrollTop();
        if($st>900){
            $fixednav.css('display','block');
        }else{
            $fixednav.css('display','none');
        }
    });
    //动态获取数据
    $.ajax({
        type:'get',
        url:'json/linav.json',
        dataType:'JSON',
        success:function(data){
            $.each(data,function(key,val){//遍历楼层
                //console.log(val);
                $.each(val.num,function(key2,val2){//遍历小块
                    var $dl=$('<dl><dt>'+val2.name+'</dt><dd></dd></dl>');
                    //console.log(val2);
                    $.each(val2.list,function(key3,val3){
                        //console.log(val3);
                        var $a=$('<a href="'+val3.href+'">'+val3.proname+'</a>');
                        $dl.children('dd').append($a);
                    });
                    $linavmain.eq(key).find('.limainwrap').append($dl);
                })
            });
        }
    });

    //动态获取吸顶菜单数据

    $.ajax({
        type:'get',
        url:'json/fixednav.json',
        dataType:'JSON',
        success:function(data){
            $.each(data,function(key,val){
               // console.log(val);
                var $h3=$('<h3>'+val.foothead+'</h3>');
                $dFoot.eq(key).append($h3);
                $.each(val.headlist,function(key2,val2){
                    var $ha=$('<a href="'+val2.href+'">'+val2.proname+'</a>');
                    $dHead.eq(key).append($ha);

                });
                $.each(val.footlist,function(key3,val3){
                    var $fa=$('<a href="'+val3.href+'">'+val3.proname+'</a>');
                    $dFoot.eq(key).append($fa);
                    //console.log(val3.proname);
                });
            });
        }
    });

    //小效果
    var $marketUp=$('.market_up');
    var $clickmore=$('.clickmore');
    $clickmore.click(function(){
        if($(this).html()=='更多 +'){
            $(this).parent().parent().css('overflow-y','scroll');
            $(this).siblings('.dhshow').css('display','none');
            $(this).siblings('.dhhide').css('display','block');
            $(this).html('收起 -');
        }else{
            $(this).parent().parent().css('overflow','hidden')
            $(this).siblings('.dhshow').css('display','block');
            $(this).siblings('.dhhide').css('display','none');
            $(this).html('更多 +');
        }
    });
    //排序按钮的变化
    $marketUp.on('click','a',function(){
        $(this).addClass('upon').siblings().removeClass('upon');
    });

    //分页操作
    var $listBox = $('#list_box');
    var $btns = $('#btns');
    var $searchR=$('.search_r');
    $.getJSON('json/list.json',function(data){
        var $num=58;
        var $pages=Math.ceil(data.length/$num);
        for(var i=0;i<$pages;i++){
            if(i==0){
                $btns.append('<span><a href="javascript:void(0);">上一页</a></span>');
            }
            $btns.append('<span><a href="javascript:void(0);">'+(i+1)+'</a></span>');
            if(i==$pages-1){
                $btns.append('<span><a href="javascript:void(0);">下一页</a></span>');
            }
        }
        var $count=1;
        createList();
        $searchR.find('a').eq(0).click(function(){
            $count--;
            if($count<=1){//低于最小页那么页数等于1
                $count=1;
            }
            createList();
        });
        $searchR.find('a').eq(1).click(function(){
            $count++;
            if($count>=$pages){//低于最小页那么页数等于1
                $count=$pages;
            }
            createList();
        });
        $btns.on('click','span',function(){
            if($(this).index()==0){
                $count--;
                if($count<=1){//低于最小页那么页数等于1
                    $count=1;
                }
                createList();
            }else if(1<=$(this).index()&&$pages>=$(this).index()){
                //$(this).addClass('btnson').siblings().removeClass('btnson');
                var $index=$(this).index()>=1?$(this).index():1;
                $count=$index;
                createList();
            }else if($(this).index()==$pages+1){
                $count++;
                if($count>=$pages){//超过最大页那么久让页数等于最大页
                    $count=$pages;
                }
                createList();
            }
        });

        //创建列表的函数封装
        function createList(){
            $btns.children('span').eq($count).addClass('btnson').siblings().removeClass('btnson');
            $searchR.find('span').html($count+' / '+$pages);
            //console.log($searchR.children('span'));
            $listBox.empty();
            $(document).scrollTop(0);
            var $li=$('<li><a href="product.html"><img src="images/list_img1.jpg" alt=""/></a></li><li><a href="product.html"><img src="images/list_img1.jpg" alt=""/></a></li>');
            $listBox.append($li);
            for(var j=($count-1)*$num;j<$count*$num;j++){
                if(data[j]){
                    var $ap=$('<dl><dt><a href="'+data[j].pichref+'"><img src="'+data[j].src+'" alt=""/></a></dt><dd><a href="'+data[j].pichref+'" class="marketlist_btn">'+data[j].price+'</a><a href="'+data[j].pichref+'" class="marketlist_title">'+data[j].title+'</a><span><img src="images/goods_t_img2.png" alt=""/><img src="images/goods_t_img1.png" alt=""/></span></dd></dl>');
                    $listBox.append($ap);
                }
            }
        }

    })
});