<?php
include("dbconnection.php");
$conn=getConnection();
session_start();
if(!empty($_GET['docname'])){
    $docname=$_GET['docname'].' - '.time();
}else{
    die("document Empty");
}
$sql="INSERT INTO `document`(`document_name`) VALUES ('$docname')";
if($conn->query($sql)==TRUE){
    getid($conn,$docname);
}
else{
    echo"faild".$sql.'</br>'.$conn->error;
}
function getid($conn,$docname){
$result=mysqli_query($conn,"select `document_id` from `document` where `document_name`='$docname'");
$num=mysqli_num_rows($result);
if($num>0){
    while($row=mysqli_fetch_assoc($result)){
        $id=$row['document_id'];
        echo $id;
    }
}
}
?>
