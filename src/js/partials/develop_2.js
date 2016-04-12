try{

    function rowLiClick(){

        $('.row-tool li').click(function() {

            $('.row-tool li').removeClass('active');
            $(this).addClass('active');

            $('.cactuz').addClass('none-visible');

            if ($(this).index() == 0) {
                $('.family1').removeClass('none-visible');
            };
            if ($(this).index() == 1) {
                $('.family2').removeClass('none-visible');
            };
            if ($(this).index() == 2) {
                $('.family3').removeClass('none-visible');
            };
            if ($(this).index() == 3) {
                $('.family4').removeClass('none-visible');
            };
            if ($(this).index() == 4) {
                $('.family5').removeClass('none-visible');
            };

            $('#izdelie2').trigger('refresh');
            calcLogic(); //develop4.js
        });

        $('.row-tool li').eq(0).click();

    };

    $(document).ready(function(){

        rowLiClick();

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_2.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}