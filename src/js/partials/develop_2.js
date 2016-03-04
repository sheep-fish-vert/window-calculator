try{

    $(document).ready(function(){
        $('.row-tool li').click(function() {

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
        });
    });

    $(window).load(function(){
        $('select').styler();
    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_2.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}