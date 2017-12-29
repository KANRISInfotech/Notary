<?php
$rawData = $_POST['imgBase64'];
$filteredData = explode(',', $rawData);
$unencoded = base64_decode($filteredData[1]);
$time_stamp=time();
$file_name="../images/temp/".$time_stamp;
createimage($unencoded,$file_name);
function createimage($unencoded,$file_name){
//Create the image
$fp = fopen($file_name.'.png', 'w');
fwrite($fp, $unencoded);
fclose($fp);
}
echo $time_stamp;
?>