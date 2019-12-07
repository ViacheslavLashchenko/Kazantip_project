<?php
    session_start();
        if(!empty($_POST)) {
            function test_input($data) {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }

            $error = '';
            $result = [];
    
            if (empty($_POST['name'])) {
                $result['name_log'];
            } else {
                $name = test_input($_POST['name']);
                if (!preg_match("/^[a-zA-Zа-яА-Я]+$/", $name)) {
                    $result['name_log'];
                }
            }
            if (empty($_POST['email'])) {
                $result['email_log'];
            } else {
                $email = test_input($_POST['email']);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $result['email_log'];
                }
            }
            if (empty($_POST['number'])) {
                $result['number_log'];
            } else {
                $number = test_input($_POST['number']);
                if (!preg_match("/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/", $number)) {
                    $result['name_log'];
                }
            }
            if (empty($_POST['message'])) {
                $result['message_log'];
            } else {
                $message = test_input($_POST['message']);
            }

            foreach ($result as $key => $value) {
                if (empty($key)) {
                   $error = false;
                } else {
                    $error = true;
                }
            }

            if ($error == false) {
                echo json_encode(1);
            } else {
                echo json_encode(0);
            }
        }
        
?>