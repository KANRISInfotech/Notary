<?php
include("dbconnection.php");
$conn=getConnection();
$doc_id="";
if(!empty($_GET['docname'])){
    $doc_id=$_GET['docname'];
}else{
    die("document Empty");
}
    $results=mysqli_query($conn,"select * FROM `personal_info` WHERE `document_id`='$doc_id'");
    $number=mysqli_num_rows($results);
    $array=array();
    if($number>0){
        while($row=mysqli_fetch_assoc($results)){
            $array[]=array("person_name"=>$row['person_name'],"person_age"=>$row['person_age'],"person_address"=>$row['person_addr'],"person_photo"=>$row['person_photo']);
        }
        echo header('Content-type:application/json');
        echo json_encode($array);
    }
?>
