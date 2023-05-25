<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0">
    <title><?php wp_title("&raquo;", true, "right"); ?><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>

    <!-- Bundled CSS/JS -->
    <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/assets/style.min.css" type="text/css" media="screen"/>
    <script src="<?php bloginfo('template_directory'); ?>/assets/script.min.js" defer></script>
    <!-- Bundled CSS/JS -->

</head>
<body>
