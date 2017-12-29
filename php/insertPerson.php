<?php

include("dbconnection.php");
$conn=getConnection();

if(!empty($_GET['name'])){
    $name=$_GET['name'];
}else{
    die("Name Empty");
}
if(!empty($_GET['age'])){
    $age=$_GET['age'];
}else{
    die("enter age");
}
if(!empty($_GET['add'])){
    $add=$_GET['add'];
}else{
    die("fill address");
}
if(!empty($_GET['photo_id'])){
    $file_name= $_GET['photo_id'];
}else{
    die("click photo");
}
if(!empty($_GET['document_id'])){
    $doc_id= $_GET['document_id'];
}else{
    die("document id");
}

$sql="INSERT INTO `personal_info`(`person_name`, `person_age`, `person_addr`, `person_photo`, `document_id`) VALUES ('$name','$age','$add','$file_name','$doc_id')";
if($conn->query($sql)==TRUE){
    echo"success";
}
else{
    echo"failed".$sql.'</br>'.$conn->error;
}
?>