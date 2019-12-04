<?php
    session_start();
        if(isset(($_POST))){

            class logStr{}
            $result = new logStr();
            
            $error = '';
            $name = $_POST['name'];
            $email = $_POST['email'];
            $number = $_POST['number'];
            $message = $_POST['message'];

            if (empty($name)) {
                $result->name_log = "Пожалуйста, введите ваше Имя";
            }
            if (empty($email)) {
                $result->email_log = "Пожалуйста, введите ваш email";
            } else{
                if ($email = "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $result->email_log = "Пожалуйста, введите корректный email";
                }
            }
            if (empty($number)) {
                $result->number_log = "Пожалуйста, введите ваш номер телефона";
            }
            if (empty($message)) {
                $result->message_log = "Пожалуйста, введите текст сообщения";
            }

            foreach ($result as $key => $value) {
                if(empty($key)){
                   $error = false;
               } else{
                    $error = true;
                }
            }
            if($error == false){
            echo json_encode("Спасибо, ваши данные приняты, с вами свяжутся в ближайшее время Вы будете перенаправлены на главную страницу через 2сек.");
            }
            else{
                echo json_encode($result);
            }
        }

?>