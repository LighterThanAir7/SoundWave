<?php

// const SITE_URL = "https://localhost/soundwave.loc/public_html/";
const SITE_URL = "http://localhost:8083/";
const ROOT_URL = "";
define("SERVER_ROOT", dirname(__DIR__) . '');

const DB_HOST = "soundwave-v2-db";   // Ime Docker servisa iz docker-compose.yml
const DB_PORT = "";
const DB_DATABASE = "soundwave_v2";  // Nova baza koju smo preimenovali u SQL datoteci
const DB_USERNAME = "soundwave";      // Korisnik iz docker-compose environmenta
const DB_PASSWORD = "soundwave";      // Lozinka iz docker-compose environmenta

const MAIL_DRIVER = "isMail";    // isMail, isSMTP
const MAIL_HOST = "127.0.0.1";
const MAIL_PORT = "25";            // 25, 465, 587
const MAIL_AUTH = false;            // true, false
const MAIL_USERNAME = "";
const MAIL_PASSWORD = "";
const MAIL_ENCRYPTION = "";        // ssl, tls
const MAIL_DEBUG = "0";            // 0 - off, 2 - on

const EUR_EXCHANGE_RATE = "7.53450";

?>