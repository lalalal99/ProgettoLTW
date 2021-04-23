<?php
    // $cipher = "aes-256-cbc"; // Definizione cifrario
    // $encryption_key = openssl_random_pseudo_bytes(32); //Generate a 256-bit encryption key
    // $iv_size = openssl_cipher_iv_length($cipher); // Generate an initialization vector 
    // $iv = openssl_random_pseudo_bytes($iv_size);
    function enc_dec($action, $string){
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'u6JFs6wbVArPWB0sBTCD8baC';
        $secret_iv = 'NmoTYZOgjhJ4lEjSstoZ9Sh5';
        // hash
        $key = hash('sha256', $secret_key);    
        // iv - encrypt method AES-256-CBC expects 16 bytes 
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        if ( $action == 'encrypt' ) {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if( $action == 'decrypt' ) {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output;
    }
?>