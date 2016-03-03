try{

    function sliderInput(){
        var maxx,minn,step,val;
        var input = {}

        $('.slider-inp-item').each(function() {
                input.max = $(this).data('max'),
                input.min = $(this).data('min'),
                input.step = $(this).data('step'),
                input.val = $(this).val();
        });

        $('.slider-item').each(function() {
            var shit = $(this).data('hui');
            console.log(val);
            $(this).slider({
                range: "max",
                min: min,
                max: max,
                step: step,
                value: val,
                slide: function( event, ui ) {
                    $('.slide-input-item[data-hui='+shit+']').find('input[type=text]').val( ui.value);
                }
            });

            //$('.slide-input-item[data-hui='+shit+']').find('input[type=text]').val( $(this).slider("value") );
            console.log('go');
        });




            //$(this).parent().find('input[type=text]').val( numberWithSpaces( $(this).slider("value") ) );

    }



    $(document).ready(function(){
        sliderInput();
    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_4.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}