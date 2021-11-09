<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Page Not found</title>
    <link rel="stylesheet" href="style/css/404.css">
</head>
<body>
    <h1 class="title">Opps, theres been an error</h1>

    <p class="message">File at <span class="file"><?php echo $_SERVER['REQUEST_URI'] ?></span> not found</p>

    <a href="<?php
        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
            $prot = "https://";
        else
            $prot = "http://";
        echo $prot.$_SERVER['HTTP_HOST'];
    ?>">Back Home</a>
</body>
</html>