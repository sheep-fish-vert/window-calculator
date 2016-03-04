try{

    function sliderInput(){

        var input = [];

        $('.slider-inp-item').each(function(index) {
                input[index] = {
                    max:$(this).data('max'),
                    min:$(this).data('min'),
                    step:$(this).data('step'),
                    val:$(this).val(),
                    orientation:$(this).data('orientation')
                };
        });

        $('.slider-item').each(function(index) {


            $(this).slider({
                range: "max",
                min: input[index].min,
                max: input[index].max,
                step: input[index].step,
                value: input[index].val,
                orientation:input[index].orientation,
                slide: function( event, ui ) {
                    $('.slide-input-item[data-slider='+index+']').find('input[type=text]').val( ui.value);
                    calcLogic();
                }
            });

        });

    }

    /* calculator logic */

    function calcLogic(){



    }

    /* /calculator logic */

    $(document).ready(function(){

        sliderInput();

        calcLogic();

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_4.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}