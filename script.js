$(document).ready(function () {
    $('.constructor__buttonLink').click(function (e) {
        e.preventDefault();

        let parent = $(this).parent('li');
        let tab = $(this).data('tab');

        $('.constructor__buttonWrapper').removeClass('constructor__buttonWrapper__active');
        parent.addClass('constructor__buttonWrapper__active');
        $('.constructor__contentWrapper .constructor__contentBlock').addClass('d-none');
        $('.constructor__contentBlock__' + tab).removeClass('d-none');

    });

    let currBg = 'Loft'; //текущий фон
    let currMenu = 'generatorEditText'; //текущий активный пункт меню
    let currLines = 1; //количество строк
    let currFont = 'fontBadScript'; //текущий выбранный шрифт
    let currColor = 'Blue' //текущий выбранный цвет
    let currPanel = 'None'; //текущая панель
    let currCable = 'White'; //цвет кабеля
    let currPanelType = 'Square'; //тип подложки
    let currInputWidth = 90;
    let currInputHeight = 20;
    let currWidth = 90;
    let currHeight = 20;
    let currFontSize = 32;

    let fontsData = new Object();
    fontsData['fontBadScript'] = {
        'letterWidth': 10,
        'stringHeight': 20,
    };
    fontsData['fontDidact'] = {
        'letterWidth': 12,
        'stringHeight': 18,
    };
    fontsData['fontKatherine'] = {
        'letterWidth': 15,
        'stringHeight': 22,
    };
    fontsData['fontRedis'] = {
        'letterWidth': 12,
        'stringHeight': 18,
    };
    fontsData['fontNickainley'] = {
        'letterWidth': 11,
        'stringHeight': 19,
    };
    fontsData['fontRealize'] = {
        'letterWidth': 10,
        'stringHeight': 21,
    };

    let colorNames = {
        'Blue': 'Голубой',
        'Orange': 'Оранжевый',
        'White': 'Белый',
        'WarmWhite': 'Бежевый',
        'Green': 'Зеленый',
        'DarkBlue': 'Синий',
        'Purple': 'Фиолетовый',
        'Pink': 'Розовый',
        'Yellow': 'Желтый',
    };

    let fontNames = {
        'fontBadScript': 'Bad Script',
        'fontDidact': 'Didact Gothic',
        'fontKatherine' : 'Katherine Plus',
        'fontRedis' : 'Redis',
        'fontNickainley': 'Nickainley',
        'fontRealize': 'Realize My Passion',
    };


    let cableColorNames = {
        'White': 'Белый провод',
        'Black': 'Черный провод',
        'Transparent': 'Прозрачный провод',
    };

    let panelNames = {
        'None': 'Нет панели',
        'Acrylic': 'Акриловая панель',
        'Alluminium': 'Аллюминиевая панель',
        'Wooden': 'Деревянная панель',
    };

    let panelTypeNames = {
        'Square': 'Прямоугольная',
        'Figure': 'Фигурная',
    };

    function setResultTextInfo(inputText) {
        let stringHeight = fontsData[currFont]['stringHeight']; //высота строки
        let letterWidth = fontsData[currFont]['letterWidth']; //ширина буквы
        let letterPrice = 1900; //цена за букву
        let minPrice = 6900;
        let currBreaks = (inputText.match(new RegExp("\n", "g")) || []).length; //Вычисление количества переносов строк
        currHeight = (currBreaks + 1) * stringHeight; //вычисление новой высоты
        let currSplit = inputText.split("\n"); //разбивка строк на массив
        let longestString = currSplit.sort(function (a, b) { return b.length - a.length; })[0]; //нахождение самой длинной строки
        currWidth = longestString.length * letterWidth; //вычисление новой ширины
        if (currWidth == 0) currWidth = 9 * letterWidth; //подстановка плейсхолдера

        let currOutputWidth = 0;
        let currOutputHeight = 0;

        if (currWidth != currInputWidth) {
            let scale = currInputWidth/currWidth;
            let newFontSize = Math.round(32 * scale);
            currOutputWidth = currInputWidth;
            currOutputHeight = Math.round(stringHeight * scale);
            $("#generatorResultText").css("font-size",newFontSize + "px");
        } else {
            $("#generatorResultText").css("font-size","32px");
            currBreaks = (inputText.match(new RegExp("\n", "g")) || []).length; //Вычисление количества переносов строк
            currOutputHeight = (currBreaks + 1) * stringHeight; //вычисление новой высоты
            currOutputWidth = longestString.length * letterWidth; //вычисление новой ширины
            if (currOutputWidth == 0) currOutputWidth = 9 * letterWidth; //подстановка плейсхолдера
        }

        $("#resultTextHeight").html(currOutputHeight); //установка высоты вывески в меню
        $("#resultTextWidth").html(currOutputWidth); //установка ширины вывески в меню
        $("#inputWidth").val(currOutputWidth);
        $("#inputHeight").val(currOutputHeight);
    }

    function setFormValues() {
        let form = $("#form416146559");
        let inputs = form.children(".t-form__inputsbox").first();
        let currSize = $("#resultTextWidth").html() + "x" + $("#resultTextHeight").html() + "см";
        inputs.children("input[name='Text']").val($("#generatorTextInput").val());
        inputs.children("input[name='Font']").val(fontNames[currFont]);
        inputs.children("input[name='Size']").val(currSize);
        inputs.children("input[name='Color']").val(colorNames[currColor]);
        inputs.children("input[name='Cable']").val(cableColorNames[currCable]);
        inputs.children("input[name='Panel']").val(panelNames[currPanel] + ' (' + panelTypeNames[currPanelType] + ')');
        console.log(form.serialize());
    }

    //вычисление и установка ширины поля для текста
    function setTextWidth() {
        let currScreenWidth = $(window).width();
        let currTextWidth = 0;
        if (currScreenWidth > 780) {
            currWidth = $("#generatorContainer").width(); //ширина контейнера
            currTextWidth = currWidth - 415; //ширина контейнера без меню
        } else {
            currTextWidth = $("#generatorContainer").width();
            if (currBg == 'Loft') currTextWidth = currTextWidth * 0.7;
        }
        $("#generatorTextContainer").width(currTextWidth); //установка ширины текста
    }

    //Вычисление и установка высоты текста
    function setTextHeight(inputText) {
        let currBreaks = (inputText.match(new RegExp("\n", "g")) || []).length; //Вычисление количества переносов строк
        currHeight = (currBreaks + 1) * 40; //вычисление новой высоты
        let currMargin = (-1) * (currHeight * 0.5); //вычисление нового отступа
        $("#generatorResultText").css("height",currHeight); //установка высоты
        $("#generatorTextContainer").css("margin-top",currMargin); //установка отступа
    }


    setResultTextInfo('Ваш текст');
    setFormValues();

    //Изменение текста
    $("#generatorTextInput").keyup(function(e) {
        let currText = $(this).val(); //текущий текст
        let formatText = currText.replace(new RegExp('\n', 'g'),"<br>"); //замена переносов строки на html
        if (formatText == '') formatText = 'Ваш текст'; //Если пустой текст
        $("#generatorResultTextSpan").html(formatText); //Подстановка текста
        //setTextHeight(currText); //Установка высоты поля вывода
        setResultTextInfo(currText); //установка высоты вывески в меню
        if (currText == '') currText = 'Ваш текст'; //Если пустой текст
        //$("textarea.t330__input").val(currText); //добавление текста в форму
        setFormValues();
    });

    //клик по кнопке шрифта
    $(".constructor__fontPickerButton").click(function(e) {
        let currPickedFont = $(this).data("font"); //текущий выбраный шрифт
        if (currFont != currPickedFont) { //если шрифт не совпадает с текущим
            $(".constructor__fontPickerButton").removeClass("pickerActive"); //снятие класса активности со старого цвета
            let currText = $("#generatorTextInput").val(); //текущий текст
            $("#generatorResultText").removeClass(currFont); //убрать текущий класс шрифта
            $("#generatorResultText").addClass(currPickedFont); //назначить новый класс шрифта
            $(this).addClass("pickerActive"); //добавить класс активности к кнопке
            currFont = currPickedFont; //записать новый класс шрифта
            setResultTextInfo(currText); //установка высоты вывески в меню
            ////$(".t330__input[name='font']").val(fontNames[currFont] + currSize); //установка шрифта в форме
            setFormValues();
        }
    });

    //клик по кнопке выбора размера
    $(".constructor__sizePickerButton").click(function(e) {
        $(".constructor__sizePickerButton").removeClass("pickerActive"); //снятие класса активности со старого цвета
        let currSizePreset = $(this).data('size');
        if (currSizePreset == 'small') {
            //currTextWidth
            currInputWidth = currWidth * 0.75;
        }
        if (currSizePreset == 'medium') {
            //currTextWidth
            currInputWidth = currWidth;
        }
        if (currSizePreset == 'large') {
            //currTextWidth
            currInputWidth = currWidth * 1.25;
        }
        console.log(currWidth + ' ' + currInputWidth);
        let currText = $("#generatorTextInput").val(); //текущий текст
        setResultTextInfo(currText); //установка высоты вывески в меню
        //cablePanelInfo = cableColorNames[currCable] + '; ' + panelNames[currPanel] + ' (' + panelTypeNames[currPanelType] + ')'; //строка для инпута
        ////$(".t330__input[name='font']").val(fontNames[currFont] + currSize); //установка шрифта в форме
        $(this).addClass("pickerActive"); //добавить класс активности к кнопке
        setFormValues();
    });

    $("#inputWidth").on('keyup change', function(e) { //изменение инпута ширины
        let currParsedWidth = $("#inputWidth").val(); //получение введенной ширины
        let newWidth = parseInt(currParsedWidth);
        if (isNaN(newWidth)) newWidth = 0;
        let currScale = newWidth/currWidth; //вычисление текущего масштаба
        let newHeight = Math.round(currHeight * currScale); //вычисление новой высоты
        let newFontSize = currFontSize * currScale; //вычисление нового размера шрифта
        $("#inputHeight").val(newHeight); //запись нового значения высоты
        $("#resultTextWidth").html(newWidth);  //запись нового значения ширины (в нижний блок)
        $("#resultTextHeight").html(newHeight);  //запись нового значения высоты (в нижний блок)
        $("#generatorResultText").css("font-size",newFontSize + "px"); //установка размера шрифта в генераторе
        setFormValues();
    });

    $("#inputHeight").on('keyup change', function(e) { //изменение инпута высоты
        let currParsedHeight = $("#inputHeight").val(); //получение ткущей высоты (в инпуте)
        let newHeight = parseInt(currParsedHeight);
        if (isNaN(newHeight)) newHeight = 0;
        let currScale = newHeight/currHeight; //вычисление текущего масштаба
        let newWidth = Math.round(currWidth * currScale); //вычисление новой высоты
        let newFontSize = currFontSize * currScale; //вычисление нового размера шрифта
        $("#inputWidth").val(newWidth); //запись нового значения высоты
        $("#resultTextWidth").html(newWidth);  //запись нового значения ширины (в нижний блок)
        $("#resultTextHeight").html(newHeight);  //запись нового значения высоты (в нижний блок)
        $("#generatorResultText").css("font-size",newFontSize + "px"); //установка размера шрифта в генераторе
        setFormValues();
    });

    //клик по кнопке выбора цвета
    $(".constructor__colorPickerButton").click(function(e) {
        let currPickedColor = $(this).data("color"); //текущий выбраный цвет
        if (currColor != currPickedColor) { //если цвет не совпадает с текущим
            $(".constructor__colorPickerButton").removeClass("pickerActive"); //снятие класса активности со старого цвета
            $("#generatorResultText").removeClass('color' + currColor); //убрать текущий цвет шрифта
            $("#generatorResultText").addClass('color' + currPickedColor); //назначить новый цвет шрифта
            $("#generatorBgColor").removeClass('bg' + currColor); //убрать текущий цвет фона
            $("#generatorBgColor").addClass('bg' + currPickedColor); //назначить новый цвет фона
            $(this).addClass("pickerActive"); //добавить класс активности к кнопке
            currColor = currPickedColor; //записать новый цвет шрифта
            //$(".t330__input[name='color']").val(colorNames[currColor]); //установка шрифта в форме
            setFormValues();
        }
    });

    //клик по кнопке выбора цвета кабеля
    $(".constructor__cablePickerButton").click(function(e) {
        $(".constructor__cablePickerButton").removeClass("pickerActive"); //снятие класса активности со старого цвета
        currCable = $(this).data('color');
        cablePanelInfo = cableColorNames[currCable] + '; ' + panelNames[currPanel] + ' (' + panelTypeNames[currPanelType] + ')'; //строка для инпута
        //$(".t330__input[name='panel']").val(cablePanelInfo); //установка шрифта в форме
        $(this).addClass("pickerActive"); //добавить класс активности к кнопке
        setFormValues();
    });

    //клик по кнопке выбора подложки
    $(".constructor__panelPickerButton").click(function(e) {
        let currPickedPanel = $(this).data("panel"); //текущая выбранная подложка
        if (currPanel != currPickedPanel) { //если не совпадает с текущей
            $(".constructor__panelPickerButton").removeClass("pickerActive"); //снятие класса активности со старой подложки
            $("#generatorTextContainer").removeClass('panel' + currPanel); //убрать текущий класс панели
            $("#generatorTextContainer").addClass('panel' + currPickedPanel); //назначить новый класс панели
            $(this).addClass("pickerActive"); //добавить класс активности к кнопке
            currPanel = currPickedPanel; //записать новый тип панели
            let cablePanelInfo = cableColorNames[currCable] + '; ' + panelNames[currPanel] + ' (' + panelTypeNames[currPanelType] + ')'; //строка для инпута
            //$(".t330__input[name='panel']").val(cablePanelInfo); //установка шрифта в форме
            let currText = $("#generatorTextInput").val(); //текущий текст
            setResultTextInfo(currText);
            setFormValues();
        }
    });

    //клик по кнопке выбора типа подложки
    $(".constructor__panelTypePickerButton").click(function(e) {
        let currPickedPanelType = $(this).data("panel"); //текущая выбранная подложка
        if (currPanelType != currPickedPanelType) { //если не совпадает с текущей
            $(".constructor__panelTypePickerButton").removeClass("pickerActive"); //снятие класса активности со старой подложки
            $(this).addClass("pickerActive"); //добавить класс активности к кнопке
            currPanelType = currPickedPanelType; //записать новый тип панели
            let cablePanelInfo = cableColorNames[currCable] + '; ' + panelNames[currPanel] + ' (' + panelTypeNames[currPanelType] + ')'; //строка для инпута
            //$(".t330__input[name='panel']").val(cablePanelInfo); //установка шрифта в форме
            let currText = $("#generatorTextInput").val(); //текущий текст
            setResultTextInfo(currText);
            setFormValues();
        }
    });

    $('.constructor__bgPickerButton').click(function (e) {
        e.preventDefault();
        let currBg = $(this).data('bg');
        $('.constructor__resultBg').addClass('d-none');
        $('.constructor__resultBg__' + currBg).removeClass('d-none');
        $('.constructor__bgPickerButton').removeClass('pickerActive');
        $(this).addClass('pickerActive');
    });

    $('.constructor__lightsSwitch').click(function (e) {
       e.preventDefault();
       if ($(this).hasClass('constructor__lightsSwitch__off')) {
           $(this).removeClass('constructor__lightsSwitch__off');
           $(this).addClass('constructor__lightsSwitch__on');
       } else {
           $(this).removeClass('constructor__lightsSwitch__on');
           $(this).addClass('constructor__lightsSwitch__off');
       }
       $('.generatorBgLights').toggleClass('generatorBgLightsActive');
    });

});
