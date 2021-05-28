<?php
    function enc_dec($action, $string){
        $output = false;
        $encrypt_method = "AES-256-CBC"; //Sceglie il metodo di cifratura
        $secret_key = 'u6JFs6wbVArPWB0sBTCD8baC'; //Chiavi segrete
        $secret_iv = 'NmoTYZOgjhJ4lEjSstoZ9Sh5';
        $key = hash('sha256', $secret_key); //Genera una chiave facendo l'hash (con algoritmo sha256) sulla chiave segreta
        // iv - encrypt method AES-256-CBC expects 16 bytes 
        $iv = substr(hash('sha256', $secret_iv), 0, 16); //Prende i primi 16 caratteri della stringa generata dall'altro hash
        if ( $action == 'encrypt' ) { //Se l'azione è quella di criptare allora lo fa tramite openssl
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output); //Codifica
        } else if( $action == 'decrypt' ) {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output; //Ritorna la stringa codificata (o decodificata)
    }
?>