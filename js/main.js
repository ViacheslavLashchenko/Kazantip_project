$(document).ready(function () {
	$('.window, .window2').paroller();
});




$(document).ready(function () {
$('.menu-right-button').on('click', function(e){
	e.preventDefault;
	$(this).toggleClass('menu-right-button_active');
	$('.nav-overlay').toggleClass('open');
$('.nav-container ul li:nth-child(1)').toggleClass('animation');
  setInterval(function() {
    // Находим текущий элемент и убираем у него класс
    var cur = $('li.animation');
    // Берем следующий элемент
    var next = cur.next();
    // Устанавливаем найденному элементу нужный класс
    next.addClass('animation');
  }, 120);
});
});
