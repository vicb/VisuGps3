<?php

if (array_key_exists('track', $_GET)) {
    readfile(__DIR__ . '/../tests/fixtures/tracks/json/' . $_GET['track']);
}
