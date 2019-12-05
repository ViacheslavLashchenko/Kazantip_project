<?php
    session_start();
        if(!empty($_POST)){
            $error = '';
            $result = [];
            $name = trim($_POST['name']);
            $email = trim($_POST['email']);
            $number = trim($_POST['number']);
            $message = trim($_POST['message']);

            if (empty($name)) {
                $result['name_log'];
            }
            if (empty($email)) {
                $result['email_log'];
            }
            if (empty($number)) {
                $result['number_log'];
            }
            if (empty($message)) {
                $result['message_log'];
            }
            foreach ($result as $key => $value) {
                if(empty($key)){
                   $error = false;
               } else{
                    $error = true;
                }
            }
            if($error == false) {
                echo json_encode(1);
            } else {
                echo json_encode(0);
            }
        }
        
?>