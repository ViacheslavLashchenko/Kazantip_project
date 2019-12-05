$(document).ready(function() {
	$('.window, .window2').paroller();

	let timer = null;
	$('.menu-right-button').click(
		function() {
			$(this).toggleClass('menu-right-button_active');
			$('.nav-overlay').toggleClass('open');
			$('body').toggleClass('noscroll')
			$('.nav-container ul li:first-child').toggleClass('animation');
			timer = setInterval(function() {
			// Находим текущий элемент
			let cur = $('.nav-container ul li.animation');
			// Берем следующий элемент
			let next = cur.next();
			// Устанавливаем найденному элементу нужный класс
			next.addClass('animation');
			}, 120);
		}
    )

    let designers = $('.designers'), timeoutId;
    $('#des').hover(function() {
        clearTimeout(timeoutId);
        designers.fadeIn(400);
    }, function() {
        timeoutId = setTimeout($.proxy(designers,'fadeOut'), 1000)
    });
    designers.mouseenter(function() {
        clearTimeout(timeoutId); 
    }).mouseleave(function() {
        designers.fadeOut();
    });

    function validationForm(){
        let id = $(this).attr('id');
        let val = $(this).val().trim();
        switch(id) {
            // Проверка поля "Имя"
            case 'text-name':
                let rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

                    // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
                    // то добавляем этому полю класс .not_error,
                    // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

                if (!val.length) {
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите ваше Имя").fadeIn();
                }

                else if (val.length < '2' || !rv_name.test(val)) {
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите коректное Имя").fadeIn();
                }
                else {
                    $(this).addClass('not_error')
                    .css('border-color','green')
                    .css('box-shadow','0px 0px 5px green');
                    $(this).next().fadeOut();
                }
                break;

            // Проверка email
            case 'text-email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (!val.length) {
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите ваш email").fadeIn();
                }
                else if (!rv_email.test(val)) {
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите коректный email").fadeIn();
                } else {
                    $(this).addClass('not_error')
                    .css('border-color','green')
                    .css('box-shadow','0px 0px 5px green');
                    $(this).next().fadeOut();
                }
                break;

            case 'text-number':
                var rv_number = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if (!val.length) {
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите ваш номер телефона").fadeIn();
                } else if (!rv_number.test(val)) {
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите коректный номер телефона").fadeIn();
                } else {
                   $(this).addClass('not_error')
                   .css('border-color','green')
                   .css('box-shadow','0px 0px 5px green');
                   $(this).next().fadeOut();
                }
                break;

            case 'message':
                if (!val.length) {    
                    $(this).removeClass('not_error').addClass('error')
                    .css('border-color','red')
                    .css('box-shadow','0px 0px 5px red');
                    $(this).next().text("Пожалуйста, введите текст сообщения").fadeIn();
                } else if (val.length > 5000) {
                   $(this).removeClass('not_error').addClass('error')
                   .css('border-color','red')
                   .css('box-shadow','0px 0px 5px red');
                   $(this).next().text("Пожалуйста, уменьшите обьем вашего сообщения до 5000 символов").fadeIn();
                } else {
                    $(this).addClass('not_error')
                    .css('border-color','green')
                    .css('box-shadow','0px 0px 5px green');
                    $(this).next().fadeOut();
                }
                break;
        } // end switch(... 
    } //end function validationFunction

    $('input[type="text"], [type="tel"], [type="email"], textarea').val('');
    // Устанавливаем обработчик потери фокуса для всех полей ввода текста
    $('input#text-name, input#text-email, input#text-number, textarea#message').unbind().blur(function() {
        validation_form();
    }); // end blur()

    // Теперь отправим наше письмо с помощью AJAX
    $('form#feedback-form').submit(function(e) {

        // Запрещаем стандартное поведение для кнопки submit
        e.preventDefault();

        // После того, как мы нажали кнопку "Отправить", делаем проверку,
        // если кол-во полей с классом .not_error равно 3 (так как у нас всего 3 поля), то есть все поля заполнены верно,
        // выполняем наш Ajax сценарий и отправляем письмо адресату

        if ($('.not_error').length == $('.el_form').length) {
            let name = $('#text-name').val();
            let email = $('#text-email').val();
            let number = $('#text-number').val();
            let message = $('#message').val();
            // Eще одним моментом является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
            // и вызываем метод .serialize().
            // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.
            $.ajax({
            	url: "validation_form.php",
                type: "POST",
                dataType: "text",
            	data: {'name': name, 'email': email, 'number': number, 'message': message},
            	success: function(data) {
                    let checkResultObj = JSON.parse(data);
                    alert(checkResultObj);
                    setTimeout(function() {
                        window.location.replace("index.php");
                    },2000);
                },
                error: function() {
                    alert("Ваше сообщение не отправлено!")
                }
            });// end ajax({...}
        } else {
            $('.el_form').each(function() {
                validation_form();
            });         
            // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
            // останавливая отправку сообщения в невалидной форме
        	return false;
        }

    }); // end submit()

});// end script