<?php
function getConnection(){
    $server="localhost";
    $user="root";
    $pass="";
    $dbname="notary";
    $conn=new mysqli($server,$user,$pass,$dbname);
    if($conn->connect_error){
        die("connection failed".$conn->connect_error);
    }
    else{
        return $conn;
    }
}
?>