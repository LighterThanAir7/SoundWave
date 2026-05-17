<?php

################################################################################
# ime   : Functions
# opis  : Skripta s misc funkcijama
# autor : Ivan Bozajic
# datum : 10/2021
################################################################################

spl_autoload_register(function ($class) {
    $file = 'inc/' . $class . '.class.php';

    if (file_exists($file)) {
        include $file;
    }
    elseif (file_exists("../" . $file)) {
        include "../" . $file; 
    } else {
        include 'admin/' . $file;
    }
});