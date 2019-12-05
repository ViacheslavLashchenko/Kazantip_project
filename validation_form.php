<?php
    session_start();
        if(!empty($_POST)){

            $result = [];
            $error = '';
            $name = trim($_POST['name']);
            $email = trim($_POST['email']);
            $number = trim($_POST['number']);
            $message = trim($_POST['message']);

            if (empty($name)) {
                $result['name_log'] = "Пожалуйста, введите ваше Имя";
            }
            if (empty($email)) {
                $result['email_log'] = "Пожалуйста, введите ваш email";
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