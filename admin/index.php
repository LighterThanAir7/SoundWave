<?php 

################################################################################
# ime   : index.php
# opis  : Pocetna stranica     
# autor : Benjamin Babić
# datum : 06/06/2023
################################################################################

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

session_start();
date_default_timezone_set("Europe/Zagreb");

// detekcija sto se zeli ucitati
include("page2include.php");

// Functions 
require('inc/Functions.php');

// instanca klase za komunikaciju sa bazom 
$db = MysqlDB::getInstance();

// login provjera
include("sec/secure.php");

echo '<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Soundwave - Admin Panel</title>

    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/themes/base/jquery-ui.min.css" />

    <!-- jQuery -->
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>

    <!-- Popper.JS -->
    <script src="js/popper.min.js"></script>    

    <!-- Bootstrap JS -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Font Awesome JS -->
    <script defer src="js/all.min.js"></script>
</head>

<body>';

    include("menu.php");

    echo '
    <main class="container-fluid">';

        include($page2include);

    echo '
    </main>';

echo '
    <!-- Custom JS -->
    <script defer src="js/script.js?v='.filemtime("js/script.js").'"></script>   
</body>
</html>';