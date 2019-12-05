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

    
    $('input[type="text"], [type="tel"], [type="email"], textarea').val('');
    // Устанавливаем обработчик потери фокуса для всех полей ввода текста
    $('input#text-name, input#text-email, input#text-number, textarea#message').unbind().blur(function() {
        let id = $(this).attr('id');
        let val = $(this).val().trim();
        switch(id) {
            case 'text-name':
                let rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение
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

            case 'text-email':
                let rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
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
                let rv_number = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
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
    }); // end blur()

    // Теперь отправим наше письмо с помощью AJAX
    $('form#feedback-form').submit(function(e) {

        // Запрещаем стандартное поведение для кнопки submit
        e.preventDefault();

        if ($('.not_error').length == $('.el_form').length) {
            let name = $('#text-name').val();
            let email = $('#text-email').val();
            let number = $('#text-number').val();
            let message = $('#message').val();
            
            $.ajax({
            	url: "validation_form.php",
                type: "POST",
                dataType: "text",
            	data: {'name': name, 'email': email, 'number': number, 'message': message},
            	success: function(data) {
                    let checkResultObj = JSON.parse(data);
                    if(checkResultObj) {
                        alert("Спасибо, ваши данные приняты, с вами свяжутся в ближайшее время. Вы будете перенаправлены на главную страницу");
                        window.location.replace("index.php");
                    } else {
                        alert("Упс! Что то пошло не так. Попробуйте написать нам позже");
                    }
                        
                },
                error: function() {
                    alert("Ваше сообщение не отправлено!")
                }
            });// end ajax({...}
        } else {
            $('.el_form').each(function(){
                let id = $(this).attr('id');
                let val = $(this).val().trim();
                switch(id) {
                    case 'text-name':
                        let rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение
                        if (!val.length) {
                            $(this).removeClass('not_error').addClass('error')
                            .css('border-color','red')
                            .css('box-shadow','0px 0px 5px red');
                            $(this).next().text("Пожалуйста, введите ваше Имя").fadeIn();
                        } else if (val.length < '2' || !rv_name.test(val)) {
                            $(this).removeClass('not_error').addClass('error')
                            .css('border-color','red')
                            .css('box-shadow','0px 0px 5px red');
                            $(this).next().text("Пожалуйста, введите коректное Имя").fadeIn();
                        } else {
                            $(this).addClass('not_error')
                            .css('border-color','green')
                            .css('box-shadow','0px 0px 5px green');
                            $(this).next().fadeOut();
                        }
                        break;

                    case 'text-email':
                        let rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                        if (!val.length) {
                            $(this).removeClass('not_error').addClass('error')
                            .css('border-color','red')
                            .css('box-shadow','0px 0px 5px red');
                            $(this).next().text("Пожалуйста, введите ваш email").fadeIn();
                        } else if (!rv_email.test(val)) {
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
                        let rv_number = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
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
            });         
            // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
            // останавливая отправку сообщения в невалидной форме
        	return false;
        }

    }); // end submit()

});// end script