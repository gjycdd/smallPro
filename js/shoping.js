/**
 * Created by Administrator on 2016/9/29.
 */
//($.extend({
//        rechangeCoo:function(){
//            var $numBox=$('.numbox');
//
//        }
//    })
//);
($.extend({changes:function(){
    var $noCart = $('.nocart');
    var $haveCart = $('.havecart');
    var $buyTable = $('.buytable');
    var $buyPrice=$('.buyprice');
    $buyTable.children('table').empty();
    $buyTable.children('table').append('<tr><th style="width:420px;">商城商品</th> <th>价格	</th><th>数量</th><th>小计</th><th>操作</th></tr>');
    //处理cookie
    var $priceSum=0;
    var $coo = cookie();
    var $reg = /^goods/;
    var $flag = true;
    $.each($coo,function(key,val){
        if($reg.test(key)){
            //获得对象形式的内容
            var $val = $.parseJSON(val);
            //if(key in $val){
            //    console.log(1);
            //}
            $haveCart.stop().show();
            $noCart.stop().hide();

            var $priceAll=($val.proNum*$val.price).toFixed(2);
            var $tr=$('<tr class="buymesg"><td class="ware_det"><a href="'+$val.href+'" class="buypic"><img src="'+$val.imgUrl+'" alt=""/></a><h3><a href="'+$val.href+'">'+$val.name+'</a><span class="ware_attr">'+$val.type+';'+$val.size+'</span></h3></td><td><span class="oneprice">￥'+$val.price+'</span></td><td><img src="images/subtract.gif"  width="12" height="12" style="display:inline-block"><input value="'+$val.proNum+'" class="numbox" type="text"><img src="images/adding.gif" width="12" height="12" style="display:inline-block"></td><td><span class="onesum">￥'+$priceAll+'</span></td><td><a href="javascript:void(0);" class="del"  id="'+$val.proId+$val.type+$val.sizeId+'">删除</a></td></tr>');
            $priceSum+=$val.proNum*$val.price;
            $tr.find('.del').click(function(){
                cookie('goods'+$(this).attr('id'),'',-1);
                $(this).parent().parent().remove();
                $.changes();
            });
            var string='goods'+$val.proId+$val.type+$val.sizeId;
            var num=$val.proNum;
            $buyTable.find('table').append($tr);
            function rechangeCoo(){
                $.each($coo,function(key2,val2){
                    if($reg.test(key2)){
                        if(key2==string){
                            var $val2 = $.parseJSON(val2);
                            var $coo_val='{"name":"'+$val.name+'","imgUrl":"'+$val.imgUrl+'","href":"'+$val.href+'","type":"'+$val.type+'","proId":"'+$val.proId+'","proNum":"'+num+'","price":"'+$val.price+'","shop":"'+$val.shop+'","size":"'+$val.size+'","goodsName":"goods'+$val.proId+$val.type+$val.size+'","sizeId":"'+$val.sizeId+'"}';
                            cookie(string,$coo_val,2);
                            //$.changes();
                        }
                        //$val.proNum=num;
                        //console.log($val.proNum);
                    }
                });
            }
            //var $onesum=$('.onesum');

            $tr.find('img[src="images/subtract.gif"]').click(function(){
                //$buyPrice.find('span').empty();
                var $moneyAll=0;
                if(num>=1){
                    num--;
                    var $numBox=$('.numbox');
                    $numBox.eq($(this).parent().parent().index()-1).val(num);
                    var $onesum=$('.onesum');
                    var $all=(num*$val.price).toFixed(2);
                    //$buyPrice.find('span').html('￥'+$moneyAll.toFixed(2));
                    $onesum.eq($(this).parent().parent().index()-1).html('￥'+$all);
                    rechangeCoo();
                    $onesum.each(function(index,item){
                        var $xj=parseFloat(item.innerHTML.slice(1));
                        $moneyAll+=$xj;
                    });
                    //console.log($moneyAll.toFixed(2));
                    $buyPrice.find('span').html('￥'+$moneyAll.toFixed(2));
                    if(num<=0){
                        cookie('goods'+$(this).parent().siblings().find('.del').attr('id'),'',-1);
                        $(this).parent().parent().remove();
                        $.changes();
                    }
                }
            });
            $tr.find('img[src="images/adding.gif"]').click(function(){
                var $moneyAll=0;
                num++;
                var $numBox=$('.numbox');
                $numBox.eq($(this).parent().parent().index()-1).val(num);

                var $onesum=$('.onesum');
                var $all=(num*$val.price).toFixed(2);
                $onesum.eq($(this).parent().parent().index()-1).html('￥'+$all);
                rechangeCoo();
                $onesum.each(function(index,item){
                    var $xj=parseFloat(item.innerHTML.slice(1));
                    $moneyAll+=$xj;
                });
                //console.log($moneyAll.toFixed(2));
                $buyPrice.find('span').html('￥'+$moneyAll.toFixed(2));
                if(num<=0){
                    cookie('goods'+$(this).parent().siblings().find('.del').attr('id'),'',-1);
                    $(this).parent().parent().remove();
                    $.changes();
                }
            });
            $flag = false;
        }else if($flag){
            $haveCart.stop().hide();
            $noCart.stop().show();
        }
    });
    $buyPrice.find('span').html('￥'+$priceSum.toFixed(2));
}}));
$(function($){
    $.changes();
    //console.log($('tr[class="buymesg"]'));
    var $reg = /^goods/;
    var $flag = true;
    var $coo = cookie();
    $.each($coo,function(key,val){
        if($reg.test(key)){
            var $val = $.parseJSON(val);

            $flag=false;
        }else if($flag){

        }
    });

    //function change(){
    //
    //}
    //console.log($coo);
});
