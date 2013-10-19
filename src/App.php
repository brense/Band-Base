<?php

// include framework DefaultApplication class
require_once('..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'framework' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'DefaultApplication.php');

// the custom application class
class App extends DefaultApplication {
    
    protected static $_instance;
    
    public static function __callStatic($method, $properties){
        if(empty(self::$_instance))
            self::$_instance = new self();
        
        if(method_exists(self::$_instance, $method))
            return call_user_func_array(array(self::$_instance, $method), $properties);
    }
    
}

// configure the application
$app = new App(array(
    // application configuration
    'database' => array(
        'type' => 'mysql',
        'host' => 'localhost',
        'name' => 'bandbase',
        'user' => 'roxy',
        'pswd' => '182419tt'
    )
));

// add the routes
$app->addRoute('GET', ':all', function($all){
    $rootUrl = App::get('rootUrl');
    include('..' . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . 'home.php');
});

// run the application
$app->run();