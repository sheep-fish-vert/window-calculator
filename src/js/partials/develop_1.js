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
            $('.calc-window-img>.calc-window-img-wrap>ul>li').eq(parentIndex).addClass('active');
            $('.calc-window-img>.calc-window-img-wrap>ul>li.active li').eq(itemIndex).addClass('active');

            var imgWidth =  $('.calc-window-img>.calc-window-img-wrap>ul>li.active li.active img').width() * 1.5;
            var imgHeight = $('.calc-window-img>.calc-window-img-wrap>ul>li.active li.active img').height() * 1.5;

            var windowTransformWidth = -50-((1-parseFloat($(this).data('window-width')))*100);
            var windowTransformHeight = -50-((1-parseFloat($(this).data('window-height')))*100);
            var doorTransformWidth = 50-((1-parseFloat($(this).data('door-width')))*100);
            var doorTransformHeight = -50-((1-parseFloat($(this).data('door-height')))*100);

            console.log(windowTransformHeight+', '+doorTransformHeight);

            $('.slide-width-window').css({'width':imgWidth*parseFloat($(this).data('window-width'))+'px','transform':'translate('+windowTransformWidth+'%, 0%)'});
            $('.slide-height-window').css({'height':imgHeight*parseFloat($(this).data('window-height'))+'px','transform':'translate(0%, '+windowTransformHeight+'%)'});
            $('.slide-height-door').css({'height':imgHeight*parseFloat($(this).data('door-height'))+'px','transform':'translate(0%,'+doorTransformHeight+'%)'});
            $('.slide-width-door').css({'width':imgWidth*parseFloat($(this).data('door-width'))+'px','transform':'translate('+doorTransformWidth+'%, 0%)'});

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

            var slider = $(this).data('slide');
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
                    $('.slide-input-item [data-slide='+slider+']').val(ui.value);
                    if(slider == 'slide-width-window'){
                        $('.otliv-dlina').val(ui.value + 100);

                    }
                    else if(slider == 'slide-height-window'){
                        $('.podoconic-dlina').val(ui.value + 200);
                    }
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

        var chossenProfile = atributesForProgrammer.profile[$('.row-tool li.active').data('profile')][$('.cactuz:not(.none-visible) option:selected').index()];

        var steklopaketCena = chossenProfile.steklopaket[$('#izdelie4 option:checked').index()];

        var furnituraOkna = chossenProfile.furnitura[$('.calculator-tabs-item.active input:checked').data('furnituratype')][$('.calculator-tabs-item.active input:checked').data('furnitura')];
        var impostCena = chossenProfile.impostPrice[$('.calculator-tabs-item.active input:checked').data('impost')];
        var ramaCena = chossenProfile.ramaPrice;
        var stvorkaCena = chossenProfile.stvorkaPrice;

        var windowWidth = parseFloat($('[data-slide=slide-width-window]').val());
        var windowHeight = parseFloat($('[data-slide=slide-height-window]').val());
        var doorWidth = parseFloat($('[data-slide=slide-width-door]').val());
        var doorHeight = parseFloat($('[data-slide=slide-height-door]').val());

        var kilometrash = atributesForProgrammer.dostavkaCena;
        if($('#izdelie7 option').eq(1).is(':checked')){
            kilometrash = atributesForProgrammer.dostavkaCena + $('.km-value-wrap input').val() * atributesForProgrammer.kilometrashKoof;
        }

        /* rama price by formuls */

            var ramaAllPrice = (((windowWidth+windowHeight)*2)/1000)*ramaCena;

        /* /rama price by formuls */

        /* stvorki price by formuls */

            var stvorkiAllPrice = ((((windowWidth/2)+windowHeight)*2)/1000)*stvorkaCena;

        /* /stvorki price by formuls */

        /* steklopaket price by formuls */

            var steklopaketAllPrice = (windowWidth/1000)*(windowHeight/1000)*steklopaketCena;

        /* /steklopaket price by formuls */

        /* verticalImpost price by formuls */

            var verticalImpost = (windowHeight/1000)*impostCena;

        /* /verticalImpost price by formuls */

        /* stoimost otliva i podokonika */

            var otlivCena = (((parseFloat($('.otliv-shirina').val())+parseFloat($('.otliv-dlina').val()))*2)/1000)*chossenProfile.otlivCoof;
            var podoconicCena = (((parseFloat($('.podoconic-shirina').val())+parseFloat($('.podoconic-dlina').val()))*2)/1000)*chossenProfile.podoconicCoof;

        /* /stoimost otliva i podokonika */

        /* moskitnayaSetka price by text iun task */

            var moskitnayaSetkaCena = 0;

            if($('.setka-checkbox').is(':checked')){
                var shirinaMoskitnoySetkiOtRazmeraOkna = atributesForProgrammer.moskitnayaSetkaOpredeleniaPloshadi[$('.calculator-tabs-item.active input:checked').data('furnituratype')][$('.calculator-tabs-item.active input:checked').data('furnitura')]*windowWidth;
                var moskitnayaSetkaCena = (((windowHeight + shirinaMoskitnoySetkiOtRazmeraOkna)*2)/1000)*atributesForProgrammer.moskitnayaSetkaKoof;
            }

        /* /moskitnayaSetka price by text iun task */

        /* tip doma index */

            var tipDomaIndex = $('#izdelie3-styler option:checked').index();
            if(tipDomaIndex == -1){
                tipDomaIndex = 0;
            }

        /* /tip doma index */

        /* otdelka otkosov formula */

            var otkosCena = 0;

            if($('.otkos-checkbox').is(':checked')){
                otkosCena = (((windowHeight+(windowWidth - atributesForProgrammer.izmenshenieShiriniOtkosaOtShiriniOkna))*2)/1000)*atributesForProgrammer.koofOtkosaZaTipomDoma[tipDomaIndex];
            }

        /* /otdelka otkosov formula */

        /* demontash */

            var demontashCena = 0;

            if($('.demontash-checkbox').is(':checked')){
                demontashCena = (((windowHeight+windowWidth)*2)/1000)*atributesForProgrammer.koofDemontahsaZaTipomDoma[tipDomaIndex];
            }

        /* /demontash */

        /* montash */

            var montashCena = 0;

            if($('.montash-checkbox').is(':checked')){
                montashCena = (((windowHeight+windowWidth)*2)/1000)*atributesForProgrammer.koofMontashaZaTipomDoma[tipDomaIndex];
            }

        /* /montash */

        var horizontalImpost = 0;
        var sendwichPrice = 0;
        if($('.door-drag-inputs').is('.show')){

            /* horizontalImpost price by formuls */

                horizontalImpost = (doorWidth/1000)*impostCena;

            /* /horizontalImpost price by formuls */

            /* sendwich price by formuls */

                sendwichPrice = ((doorHeight - windowHeight)/1000)*(doorWidth/1000)*chossenProfile.sendwichCena;

            /* /sendwich price by formuls */
        }

        /* formula obshey sumi */

            var allPrice = numberWithSpaces(parseInt(ramaAllPrice + stvorkiAllPrice + steklopaketAllPrice + verticalImpost + horizontalImpost+sendwichPrice+kilometrash+otlivCena+podoconicCena+moskitnayaSetkaCena+otkosCena+demontashCena+montashCena));

        $('.straday-res').text(allPrice);

        /* formula obshey sumi */

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

        $('.km-value-wrap input').change(function(){

            calcLogic();

        });

        $('.slide-input input').keypress(function(e){

            if (e.which >= 47 && e.which <= 57 ){}
            else return false;

        });

        $('.slide-input input').blur(function() {

            var id = $(this).data('slide');
            $inputNum = $(this);

            if ($inputNum.val() == '' || $inputNum.val() < $inputNum.data('min')){
                $inputNum.val($inputNum.data('min'));
            }
            else if($inputNum.val() > $inputNum.data('max')){
                $inputNum.val($inputNum.data('max'));
            }

            $('.'+id).slider('value', $(this).val());

            if(id== 'slide-width-window'){
                $('.otliv-dlina').val(parseInt($(this).val())+100);
            }else if(id == 'slide-height-window'){
                $('.podoconic-dlina').val(parseInt($(this).val())+200);
            }
            calcLogic();
        });

        $('#izdelie7').change(function(){
            if($(this).find('option').eq(1).is(':checked')){
                $('.km-value-wrap').addClass('active').slideDown(300);
            }else{
               $('.km-value-wrap').removeClass('active').slideUp(300);
            }
            calcLogic();
        });

    }

    /* /call logic function when change radio or checkbox */


    $(document).ready(function(){

        sliderInput();
        tabsClick();
        inputNumber('.km-value-wrap', 1);

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