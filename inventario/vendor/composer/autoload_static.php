<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8cac5fb70463e1dccf50be20e1bb0c8b
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'S' => 
        array (
            'Slim' => 
            array (
                0 => __DIR__ . '/..' . '/slim/slim',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8cac5fb70463e1dccf50be20e1bb0c8b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8cac5fb70463e1dccf50be20e1bb0c8b::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit8cac5fb70463e1dccf50be20e1bb0c8b::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
