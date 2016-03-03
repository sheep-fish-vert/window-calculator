try{

    function tabsClick(){

        $(document).on('click','.calculator-tabs-windows label', function(){

            var itemIndex = $(this).parent().index();
            var parentIndex = $(this).parents('.calculator-tabs-item').index();
            console.log(parentIndex+', '+itemIndex);

            $('.calculator-tabs-windows li').removeClass('active');
            $('.calculator-tabs-item').removeClass('active');
            $(this).parent().addClass('active');
            $(this).parents('.calculator-tabs-item').addClass('active');

            $('.calc-window-img ul li').removeClass('active');
            $('.calc-window-img>ul>li').eq(parentIndex).addClass('active');
            $('.calc-window-img>ul>li.active li').eq(itemIndex).addClass('active');

        });

        $('.calculator-tabs-item').eq(0).find('label').eq(0).click();

    }


    $(document).ready(function(){

        tabsClick();

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_1.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}