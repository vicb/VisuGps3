<?php

if (isset($_GET['url'])) {

    $headers = array(
        'Accept: */*'
    );

    if (isset($_GET['referer'])) {
        $headers[] = 'Referer: ' . sanitizeHeader($_GET['referer']);
    }

    $opts = array(
        'http' => array(
            'header'     => implode("\r\n", $headers) . "\r\n",
            'user-agent' => 'VisuGps3',
            'timeout'    => 5
        )
    );

    if (isset($_GET['content-type'])) {
        header("Content-Type: " . sanitizeHeader($_GET['content-type']));
    }

    readfile($_GET['url'], false, stream_context_create($opts));
}

function sanitizeHeader($header) {
    return preg_replace('/[\r\n]/', '', $header);
}
