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

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    /* calculator logic */

    function calcLogic(){

        var chossenProfile = atributesForProgrammer[$('.row-tool li.active').data('profile')][$('.cactuz:not(.none-visible) option:selected').index()];

        var steklopaketCena = chossenProfile.steklopaket[$('#izdelie4 option:checked').index()];

        var tihiySteklopaket = chossenProfile.steklopaketTishina[0];
        if($('.silence-check input:checked').length){
            tihiySteklopaket = chossenProfile.steklopaketTishina[1];
        }

        var furnituraOkna = chossenProfile.furnitura[$('.calculator-tabs-item.active input:checked').data('furnitura')];
        var impostCena = chossenProfile.impostPrice[$('.calculator-tabs-item.active input:checked').data('impost')];
        var ramaCena = chossenProfile.ramaPrice;
        var stvorkaCena = chossenProfile.stvorkaPrice;

        var windowWidth = $('#slide-width').val();
        var windowHeight = $('#slide-height').val();

        var ramaAllPrice = (((windowWidth+windowHeight)*2)/1000)*ramaCena; /* rama price by formuls */
        var stvorkiAllPrice = ((((windowWidth/2)+windowHeight)*2)/1000)*stvorkaCena; /* stvorki price by formuls */
        var steklopaketAllPrice = (windowWidth/1000)*(windowHeight/1000)*(steklopaketCena+tihiySteklopaket); /* steklopaket price by formuls */
        var verticalImpost = (windowHeight/1000)*impostCena;
        var horizontalImpost = (windowWidth/1000)*impostCena;
        /* sendwichCena */

        var allPrice = numberWithCommas(parseInt(ramaAllPrice + stvorkiAllPrice + steklopaketAllPrice + verticalImpost + horizontalImpost));

        $('.straday-res').text(allPrice);

    }

    /* /calculator logic */

    /* call logic function when change, radio or checkbox */

    function callCalculatorLogic(){

        $('.contact-form-item select').change(function(){

            calcLogic();

        });

        $('.contact-form-item input[type="checkbox"]').change(function(){

            calcLogic();

        });

        $('.checkers input[type="checkbox"]').change(function(){

            calcLogic();

        });

        $('.calculator-tabs input[type="radio"]').change(function(){

            calcLogic();

        });

    }

    /* /call logic function when change radio or checkbox */

    $(document).ready(function(){

        sliderInput();

    });

    $(window).load(function(){

        calcLogic();
        callCalculatorLogic();

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_4.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}