<?php
include("dbconnection.php");
$conn=getConnection();
    $result=mysqli_query($conn,"select * from `document` ORDER BY `document_id` ASC");
    $num=mysqli_num_rows($result);
    $array=array();
    if($num>0){
        while($row=mysqli_fetch_assoc($result)){
            $array[]=array("id"=>$row['document_id'],"name"=>$row['document_name']);
        }
        echo header('Content-type:application/json');
        echo json_encode($array);
    }
?>