try{

    function tabsClick(){

        function slidesWidthHeight(){

            var imgWidth =  $('.calc-window-img>.calc-window-img-wrap>ul>li.active li.active img').width() * 1;
            var imgHeight = $('.calc-window-img>.calc-window-img-wrap>ul>li.active li.active img').height() * 1;

            var imgWindowWidthSpec = ((1-parseFloat($('.calculator-tabs-item.active li.active label').data('window-width')))*imgWidth)/2;
            var imgWindowWindowWidth = parseFloat($('.calculator-tabs-item.active li.active label').data('window-width'))*imgWidth;
            var percWindowWidthImg = (100*imgWindowWidthSpec)/imgWindowWindowWidth;

            var imgDoorWidthSpec = ((1-parseFloat($('.calculator-tabs-item.active li.active label').data('door-width')))*imgWidth)/2;
            var imgWindowDoorWidth = parseFloat($('.calculator-tabs-item.active li.active label').data('door-width'))*imgWidth;
            var percDoorWidthImg = (100*imgDoorWidthSpec)/imgWindowDoorWidth;

            var windowTransformWidth = -46-percWindowWidthImg;
            var windowTransformHeight = -50-((1-parseFloat($('.calculator-tabs-item.active li.active label').data('window-height')))*100);
            var doorTransformWidth = -46+percDoorWidthImg;
            var doorTransformHeight = -50-((1-parseFloat($('.calculator-tabs-item.active li.active label').data('door-height')))*100);

            $('.slide-width-window').css({'width':imgWidth*parseFloat($('.calculator-tabs-item.active li.active label').data('window-width'))+'px','transform':'translate('+windowTransformWidth+'%, 0%)'});
            $('.slide-height-window').css({'height':imgHeight*parseFloat($('.calculator-tabs-item.active li.active label').data('window-height'))+'px','transform':'translate(0%, '+windowTransformHeight+'%)'});
            $('.slide-height-door').css({'height':imgHeight*parseFloat($('.calculator-tabs-item.active li.active label').data('door-height'))+'px','transform':'translate(0%,'+doorTransformHeight+'%)'});
            $('.slide-width-door').css({'width':imgWidth*parseFloat($('.calculator-tabs-item.active li.active label').data('door-width'))+'px','transform':'translate('+doorTransformWidth+'%, 0%)'});
        }

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

            slidesWidthHeight();

            if($(this).data('door')){
                $('.door-drag-inputs').addClass('show');
                $('.calc-window-slide').addClass('show-wrap');
                $('.slide-width-door, .slide-height-door').addClass('show');
                $('#slide-width-door').val($('#slide-width-door').data('min'));
                $('#slide-height-door').val($('#slide-height-door').data('min'));
            }else{
               $('.door-drag-inputs').removeClass('show');
               $('.calc-window-slide').removeClass('show-wrap');
               $('.slide-width-door, .slide-height-door').removeClass('show');
               $('#slide-width-door').val(0);
               $('#slide-height-door').val(0);
            }

            var minMaxValueVariable = atributesForProgrammer.minMaxValues[$(this).find('input').data('window-type')];

            $('.slide-width-window').slider('option', 'min', minMaxValueVariable.windowMinWidth);
            $('.slide-width-window').slider('option', 'max', minMaxValueVariable.windowMaxWidth);
            $('.slide-height-window').slider('option', 'min', minMaxValueVariable.windowMinHeight);
            $('.slide-height-window').slider('option', 'max', minMaxValueVariable.windowMaxHeight);
            $('.slide-width-door').slider('option', 'min', minMaxValueVariable.doorMinWidth);
            $('.slide-width-door').slider('option', 'max', minMaxValueVariable.doorMaxWidth);
            $('.slide-height-door').slider('option', 'min', minMaxValueVariable.doorMinHeight);
            $('.slide-height-door').slider('option', 'max', minMaxValueVariable.doorMaxHeight);

            $('.slide-width-window').slider('option', 'value', minMaxValueVariable.windowMinWidth);
            $('.slide-height-window').slider('option', 'value', minMaxValueVariable.windowMinHeight);
            $('.slide-width-door').slider('option', 'value', minMaxValueVariable.doorMinWidth);
            $('.slide-height-door').slider('option', 'value', minMaxValueVariable.doorMinHeight);

            $('.slide-input-item input[data-slide="slide-width-window"]').val(minMaxValueVariable.windowMinWidth);
            $('.slide-input-item input[data-slide="slide-height-window"]').val(minMaxValueVariable.windowMinHeight);
            $('.slide-input-item input[data-slide="slide-width-door"]').val(minMaxValueVariable.doorMinWidth);
            $('.slide-input-item input[data-slide="slide-height-door"]').val(minMaxValueVariable.doorMinHeight);

            $('.slide-input-item input[data-slide="slide-width-window"]').attr('data-min', minMaxValueVariable.windowMinWidth).attr('data-max', minMaxValueVariable.windowMaxWidth);
            $('.slide-input-item input[data-slide="slide-height-window"]').attr('data-min', minMaxValueVariable.windowMinHeight).attr('data-max', minMaxValueVariable.windowMaxHeight);
            $('.slide-input-item input[data-slide="slide-width-door"]').attr('data-min', minMaxValueVariable.doorMinWidth).attr('data-max', minMaxValueVariable.doorMaxWidth);
            $('.slide-input-item input[data-slide="slide-height-door"]').attr('data-min', minMaxValueVariable.doorMinHeight).attr('data-max', minMaxValueVariable.doorMaxHeight);

            $('.otliv-dlina').val(minMaxValueVariable.windowMinWidth+100);
            $('.podoconic-dlina').val(minMaxValueVariable.windowMinWidth+200);

        });

        $('.calculator-tabs-item').eq(0).find('label').eq(0).click();



        $(window).resize(function(){

            slidesWidthHeight();

        });

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
                        $('.podoconic-dlina').val(ui.value + 200);

                    }
                    else if(slider == 'slide-height-window'){
                        //
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

        var furnituraOkna = parseFloat(chossenProfile.furnitura[$('.calculator-tabs-item.active input:checked').data('furnituratype')][$('.calculator-tabs-item.active input:checked').data('furnitura')]);
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
        if($('.calculator-tabs-item.active label').data('door')){
            var doorFurnitura = chossenProfile.doorFurnitura[$('.calculator-tabs-item.active input:checked').data('door-furnitura')];
        }

        /* rama price by formuls */

            var ramaAllPrice = (((windowWidth+windowHeight)*2)/1000)*ramaCena;
            if($('.calculator-tabs-item.active label').data('door')){
                ramaAllPrice = ramaAllPrice + (((doorWidth+doorHeight)*2)/1000)*ramaCena;
            }

        /* /rama price by formuls */

        /* stvorki price by formuls */

            var stvorkiAllPrice = 0;
            if(furnituraOkna != 0){

                /* old formula:
                stvorkiAllPrice = (((((windowWidth/2)+windowHeight)*2)/1000)*stvorkaCena) + furnituraOkna;
                */

                stvorkiAllPrice = (((windowWidth+windowHeight-140)/500)*stvorkaCena) + furnituraOkna; //here is by -140 by new formuls version

            }
            if($('.calculator-tabs-item.active label').data('door')){
                stvorkiAllPrice = stvorkiAllPrice + (((doorWidth+doorHeight-140)/500)*stvorkaCena)+doorFurnitura;
            }

        /* /stvorki price by formuls */

        /* steklopaket price by formuls */

            var kolichestvoOkon = $('.calculator-tabs-item.active input:checked').data('kolichestvo-okon');
            var kolichestvoFurnitur = $('.calculator-tabs-item.active input:checked').data('kolichestvo-furnitur');
            var pointForKolichestvoFurnitur = 0;
            var widthAndHeightEachOfWindowPart = [];

            for(var i=0;i<kolichestvoOkon;i++){
                if(pointForKolichestvoFurnitur < kolichestvoFurnitur){
                    widthAndHeightEachOfWindowPart[i] = [(windowHeight - (atributesForProgrammer.bokovinkyShirina[1])),((windowWidth/kolichestvoOkon) - atributesForProgrammer.bokovinkyShirina[1])];
                    pointForKolichestvoFurnitur++;
                }else{
                    widthAndHeightEachOfWindowPart[i] = [(windowHeight - (atributesForProgrammer.bokovinkyShirina[0])),((windowWidth/kolichestvoOkon) - atributesForProgrammer.bokovinkyShirina[0])]
                }
            }

            var ploshadOkon = 0;

            widthAndHeightEachOfWindowPart.forEach(function(item, index){
                ploshadOkon = ploshadOkon + ((item[0]/1000)*(item[1]/1000));
            });

            if($('.calculator-tabs-item.active label').data('door')){
                ploshadOkon = ploshadOkon + (((doorWidth - atributesForProgrammer.bokovinkyShirina[1])/1000)*((windowHeight - atributesForProgrammer.bokovinkyShirina[1])/1000));
            }

            /* previous code was:

                if($('.calculator-tabs-item.active label').data('door')){
                    ploshadOkon = ploshadOkon + (((doorWidth - atributesForProgrammer.bokovinkyShirina[1])/1000)*((doorHeight - atributesForProgrammer.bokovinkyShirina[1])/1000));
                }

            */

            var steklopaketAllPrice = ploshadOkon*steklopaketCena;

        /* /steklopaket price by formuls */

        /* verticalImpost price by formuls */

            var verticalImpost = (windowHeight/1000)*impostCena; // don't used in new formuls

        /* /verticalImpost price by formuls */

        /* tip podoconika */

            var tipPodoconikaIndex = $('#izdelie6-styler option:checked').index();
            if(tipPodoconikaIndex == -1){
                tipPodoconikaIndex = 0;
            }

        /* /tip podoconika */

        /* stoimost otliva i podokonika */

            var otlivCena = parseFloat($('.otliv-dlina').val()/1000) * chossenProfile.otlivCoof[parseFloat($('.otliv-shirina option:checked').val())];

            var podoconicCena = parseFloat($('.podoconic-dlina').val());
            /* old formula:
            var podoconicCena = parseFloat($('.podoconic-dlina').val()/1000) * chossenProfile.podoconicCoof[tipPodoconikaIndex][$('.podoconic-shirina option:checked').val()];
            */
            if($('.calculator-tabs-item.active label').data('door')){
                podoconicCena = podoconicCena + doorWidth + 200;
            }
            podoconicCena = parseFloat(podoconicCena/1000)*chossenProfile.podoconicCoof[tipPodoconikaIndex][$('.podoconic-shirina option:checked').val()];

        /* /stoimost otliva i podokonika */

        /* moskitnayaSetka price by text in task */

            var moskitnayaSetkaCena = 0;

            if($('.setka-checkbox').is(':checked')){
                var shirinaMoskitnoySetkiOtRazmeraOkna = atributesForProgrammer.moskitnayaSetkaOpredeleniaPloshadi[$('.calculator-tabs-item.active input:checked').data('furnituratype')][$('.calculator-tabs-item.active input:checked').data('furnitura')]*windowWidth;
                if(shirinaMoskitnoySetkiOtRazmeraOkna != 0){
                    moskitnayaSetkaCena = (((windowHeight + shirinaMoskitnoySetkiOtRazmeraOkna)*2)/1000)*atributesForProgrammer.moskitnayaSetkaKoof;
                }

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
                /*
                //old formula
                otkosCena = (((windowHeight+(windowWidth - atributesForProgrammer.izmenshenieShiriniOtkosaOtShiriniOkna))*2)/1000)*atributesForProgrammer.koofOtkosaZaTipomDoma[tipDomaIndex];
                */
                otkosCena = ((windowWidth/1000)+(windowHeight/1000)*2)*((podoconicCena-atributesForProgrammer.izmenshenieShiriniOtkosaOtShiriniOkna)/1000)*700;
                console.log(otkosCena, ' - cena otkosa.');
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

                sendwichPrice = ((doorHeight - windowHeight - atributesForProgrammer.bokovinkyShirina[1])/1000)*((doorWidth - atributesForProgrammer.bokovinkyShirina[1])/1000)*chossenProfile.sendwichCena;

            /* /sendwich price by formuls */
        }

        /* formula obshey sumi */

            var allPrice = numberWithSpaces(parseInt(ramaAllPrice + stvorkiAllPrice + steklopaketAllPrice /*+ verticalImpost*/ + horizontalImpost+sendwichPrice+kilometrash+otlivCena+podoconicCena+moskitnayaSetkaCena+otkosCena+demontashCena+montashCena));

        $('.straday-res').text(allPrice);

        /* formula obshey sumi */


        /* consoles info about item */

        console.log(' ');
        console.log('----------------------------------------------------------');

        console.log('Rama all price coof: ' + ((windowWidth+windowHeight)*2)/1000 + ', ramaCena: ' + ramaCena + ', rama all price: ' + ramaAllPrice);
        console.log('steklopaket koof ploshady: ' + ploshadOkon + ', cena steklopaketa: ' + steklopaketCena + ', obshaya stoimost: ' + steklopaketAllPrice);
        console.log('stvorki all price: ' + stvorkiAllPrice);

        console.log('------------------------------------------------------------');

        /* /consoles info about item */


    }

    /* /calculator logic */

    /* call logic function when change, radio or checkbox */

    function callCalculatorLogic(){

        $('.contact-form-item select').change(function(){

            calcLogic();

        });

        $('#izdelie6').change(function(){

            var chossenProfileIzdelie = atributesForProgrammer.profile[$('.row-tool li.active').data('profile')][$('.cactuz:not(.none-visible) option:selected').index()];

            var tipPodoconikaIndexIzdelie = $('#izdelie6-styler option:checked').index();
            if(tipPodoconikaIndexIzdelie == -1){
                tipPodoconikaIndexIzdelie = 0;
            }

            $('.podoconic-shirina').styler('destroy');
            $('.podoconic-shirina option').remove();

            for(name in chossenProfileIzdelie.podoconicCoof[tipPodoconikaIndexIzdelie]){
                $('.podoconic-shirina').append('<option value='+name+'>'+name+'</option>');
            }
            $('.podoconic-shirina').styler();

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

            if ($inputNum.val() == '' || $inputNum.val() < parseInt($inputNum.attr('data-min'))){

                $inputNum.val($inputNum.attr('data-min'));

            }
            else if($inputNum.val() > parseInt($inputNum.attr('data-max'))){

                $inputNum.val(parseInt($inputNum.attr('data-max')));

            }

            $('.'+id).slider('value', $(this).val());

            if(id== 'slide-width-window'){
                $('.otliv-dlina').val(parseInt($(this).val())+100);
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

        $('select').styler();

        calcLogic();
        callCalculatorLogic();

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_1.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}