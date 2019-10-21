$(document).ready(function () {
	$('.window, .window2').paroller();
});

$(document).ready(function () {
	var timer = null;
	$('.menu-right-button').click(
		function(){
			$(this).toggleClass('menu-right-button_active');
			$('.nav-overlay').toggleClass('open');
			$('body').toggleClass('noscroll')
			$('.nav-container ul li:first-child').toggleClass('animation');
			timer = setInterval(function() {
			// Находим текущий элемент
			var cur = $('.nav-container ul li.animation');
			// Берем следующий элемент
			var next = cur.next();
			// Устанавливаем найденному элементу нужный класс
			next.addClass('animation');
			}, 120);
		})
})

var designers = $('.designers'),
    timeoutId;
$('#des').hover(function(){
    clearTimeout(timeoutId);
    designers.fadeIn(400);
}, function(){
    timeoutId = setTimeout($.proxy(designers,'fadeOut'), 1000)
});
designers.mouseenter(function(){
    clearTimeout(timeoutId); 
}).mouseleave(function(){
    designers.fadeOut();
}); 



$(document).ready(function(){
	$('input[type="text"],[type="tel"],[type="email"], textarea').val('');

     // Устанавливаем обработчик потери фокуса для всех полей ввода текста
     $('input#text-name, input#text-email, input#text-number, textarea#message').unbind().blur( function(){

        // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
        var id = $(this).attr('id');
        var val = $(this).val();

        switch(id)
        {
                      // Проверка поля "Имя"
                      case 'text-name':
                         var rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

                         // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
                         // то добавляем этому полю класс .not_error,
                         // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

                         if(val.length > 2 && val != '' && rv_name.test(val))
                         {
                         	$(this).addClass('not_error')
                         	.css('border-color','green')
                         	.css('box-shadow','0px 0px 5px green');
                         	
                         }

                       // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
                       // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации

                       else
                       {
                       	$(this).removeClass('not_error').addClass('error')
                       	.css('border-color','red')
                        .css('box-shadow','0px 0px 5px red');
                       }
                       break;
                     // Проверка email
                     case 'text-email':
                     var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                     if(val != '' && rv_email.test(val))
                     {
                     	$(this).addClass('not_error')
                         	.css('border-color','green')
                         	.css('box-shadow','0px 0px 5px green');
                     }
                     else
                     {
                     	$(this).removeClass('not_error').addClass('error')
                       	.css('border-color','red')
                        .css('box-shadow','0px 0px 5px red');
                     }
                     break;

                     case 'text-number':
                     var rv_number = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                     if(val != '' && rv_number.test(val))
                     {
                     	$(this).addClass('not_error')
                         	.css('border-color','green')
                         	.css('box-shadow','0px 0px 5px green');
                     }
                     else
                     {
                     	$(this).removeClass('not_error').addClass('error')
                       	.css('border-color','red')
                        .css('box-shadow','0px 0px 5px red');
                     }
                     break;
                     		// Проверка поля "Сообщение"
                     		case 'message':
                     		if(val != '' && val.length < 5000)
                     		{
                     			$(this).addClass('not_error')
                         	.css('border-color','green')
                         	.css('box-shadow','0px 0px 5px green');
                     		}
                     		else
                     		{
                     			$(this).removeClass('not_error').addClass('error')
		                       	.css('border-color','red')
		                        .css('box-shadow','0px 0px 5px red');
                     		}
                     		break;

                     		       } // end switch(...)

                     		     }); // end blur()
// Теперь отправим наше письмо с помощью AJAX
$('form#feedback-form').submit(function(e){

         // Запрещаем стандартное поведение для кнопки submit
         e.preventDefault();

         // После того, как мы нажали кнопку "Отправить", делаем проверку,
         // если кол-во полей с классом .not_error равно 3 (так как у нас всего 3 поля), то есть все поля заполнены верно,
         // выполняем наш Ajax сценарий и отправляем письмо адресату

         if($('.not_error').length == $('.el_form').length){
            // Eще одним моментом является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
            // и вызываем метод .serialize().
            // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.
            $.ajax({
            	url: "contacts.php",
                type: "POST",
                dataType:"text",
            	data: $(this).serialize(),
            	success: function(data) {
                        alert('Данные' + data + 'отправлены');
                },
                error: function() {
                    alert("Ваше сообщение не отправлено!")
                }
            })
        } // end ajax({...}
        // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
        // останавливая отправку сообщения в невалидной форме
        else {
        	return false;
        }

   }); // end submit()

 });// end script
