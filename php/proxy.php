<?php

if (isset($_GET['url'], $_GET['referer'], $_GET['content-type'])) {
    $opts = array(
        'http' => array(
            'header'     => "Accept: */*\r\n" .
                            "Referer: ${_GET['referer']}\r\n",
            'user-agent' => 'VisuGps3',
            'timeout'    => 5
        )
    );

    header("Content-Type: ${_GET['content-type']}");
    readfile($_GET['url'], false, stream_context_create($opts));
}