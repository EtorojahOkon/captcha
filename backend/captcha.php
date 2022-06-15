<?php
/**
 * @Initializations
*/
$string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
session_start();


/**
 * @Request Handlers
*/
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST["verfy_captcha"])) {

        if (!isset($_SESSION["captcha_length"]) || !isset($_SESSION["captcha"])) {
            echo json_encode(["status" =>  "error", "message" => "Invalid captcha"]);
        } 
        elseif (empty($_POST["submission"])) {
            echo json_encode(["status" =>  "error", "message" => "Please fill in Captcha field"]);
        }
        elseif (!preg_match('/[a-zA-Z0-9]/', $_POST["submission"])) {
            echo json_encode(["status" =>  "error", "message" => "Invalid Captcha Characters"]);
        }
        else {
            $submission = trim($_POST["submission"]);
            
            if ($_SESSION["captcha"] == $submission) {
                unset($_SESSION["captcha"]);
                echo json_encode(["status" =>  "success", "message" => "Captcha validated"]);
            } 
            else {
                echo json_encode(["status" =>  "error", "message" => "Wrong Captcha Submission"]);
            }
            
        }
        
    }
}
else {
    if (isset($_GET["get_captcha"]) && isset($_GET["length"])) {
        $length = intval($_GET["length"]);
        $str = substr(str_shuffle($string), 0, $length);
        $_SESSION["captcha"] = $str;
        echo json_encode(["status" =>  "success", "message" => $str]);
    }
}



?>