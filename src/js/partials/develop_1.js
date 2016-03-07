try{

    function tabsClick(){

        $(document).on('click','.calculator-tabs-windows label', function(){

            var itemIndex = $(this).parent().index();
            var parentIndex = $(this).parents('.calculator-tabs-item').index();

            $('.calculator-tabs-windows li').removeClass('active');
            $('.calculator-tabs-item').removeClass('active');
            $(this).parent().addClass('active');
            $(this).parents('.calculator-tabs-item').addClass('active');

            $('.calc-window-img ul li').removeClass('active');
            $('.calc-window-img>ul>li').eq(parentIndex).addClass('active');
            $('.calc-window-img>ul>li.active li').eq(itemIndex).addClass('active');

            if(parentIndex == 3){
                $('.door-drag-inputs').addClass('show');
                $('.slide-width-door, .slide-height-door').addClass('show');
                $('#slide-width-door').val($('#slide-width-door').data('min'));
                $('#slide-height-door').val($('#slide-height-door').data('min'));
            }else{
               $('.door-drag-inputs').removeClass('show');
               $('.slide-width-door, .slide-height-door').removeClass('show');
               $('#slide-width-door').val(0);
               $('#slide-height-door').val(0);
            }

        });

        $('.calculator-tabs-item').eq(0).find('label').eq(0).click();

    }

    /* init slide */

    function sliderInput(){

        $('.slider-inp-item').each(function(index) {

            var slider = $(this).attr('id');
            var sliderMax = $(this).data('max');
            var sliderMin = $(this).data('min');
            var sliderStep = $(this).data('step');
            var sliderVal = $(this).val();
            var sliderOrientation = $(this).data('orientation');

            $('.slider-item.'+slider).slider({
                range:"max",
                min:sliderMin,
                max:sliderMax,
                step:sliderStep,
                value:sliderVal,
                orientation:sliderOrientation,
                slide:function(evente, ui){
                    $('.slide-input-item #'+slider).val(ui.value);
                    calcLogic();
                }
            });

        });

    }

    function numberWithSpaces(x) {
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

        var windowWidth = $('#slide-width-window').val();
        var windowHeight = $('#slide-height-window').val();
        var doorWidth = $('#slide-width-door').val();
        var doorHeight = $('#slide-height-door').val();



        /* rama price by formuls */
        var ramaAllPrice = (((windowWidth+windowHeight)*2)/1000)*ramaCena;

        /* stvorki price by formuls */
        var stvorkiAllPrice = ((((windowWidth/2)+windowHeight)*2)/1000)*stvorkaCena;

        /* steklopaket price by formuls */
        var steklopaketAllPrice = (windowWidth/1000)*(windowHeight/1000)*(steklopaketCena+tihiySteklopaket);

        /* verticalImpost price by formuls */
        var verticalImpost = (windowHeight/1000)*impostCena;

        var horizontalImpost = 0;
        var sendwichPrice = 0;
        if($('.door-drag-inputs').is('.show')){

            /* horizontalImpost price by formuls */
            horizontalImpost = (doorWidth/1000)*impostCena;

            /* sendwich price by formuls */
            sendwichPrice = ((doorHeight - doorWidth)/1000)*horizontalImpost*chossenProfile.sendwichCena;
        }

        var allPrice = numberWithSpaces(parseInt(ramaAllPrice + stvorkiAllPrice + steklopaketAllPrice + verticalImpost + horizontalImpost+sendwichPrice));

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

        $('.slide-input input').keypress(function(e){

            if (e.which >= 47 && e.which <= 57 ){}
            else return false;

        });

        $('.slide-input input').blur(function() {

            var id = $(this).attr('id');
            $inputNum = $(this);

            if ($inputNum.val == '' || $inputNum.val() < $inputNum.data('min')) {
                $inputNum.val($inputNum.data('min'));
            }
            else if($inputNum.val() > $inputNum.data('max')){
                $inputNum.val($inputNum.data('max'));
            }

            $('.'+id).slider('value', $(this).val());
            calcLogic();
        });

    }

    /* /call logic function when change radio or checkbox */


    $(document).ready(function(){

        sliderInput();
        tabsClick();

    });

    $(window).load(function(){

        calcLogic();
        callCalculatorLogic();

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_1.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}