<?php
    /*Billedskalering foregår med nedenstående funktioner.*/
function get_image_sizes($sourceImageFilePath, $maxResizeWidth, $maxResizeHeight) {

  // Get the width and height of the original image
  $size = getimagesize($sourceImageFilePath);
  if($size === FALSE) return FALSE; // Error condition
  $origWidth = $size[0];
  $origHeight = $size[1];

  // Change dimensions to fit maximum width and height
  $resizedWidth = $origWidth;
  $resizedHeight = $origHeight;
  if($resizedWidth > $maxResizeWidth) {
    $aspectRatio = $maxResizeWidth / $resizedWidth;
    $resizedWidth = round($aspectRatio * $resizedWidth);
    $resizedHeight = round($aspectRatio * $resizedHeight);
  }
  if($resizedHeight > $maxResizeHeight) {
    $aspectRatio = $maxResizeHeight / $resizedHeight;
    $resizedWidth = round($aspectRatio * $resizedWidth);
    $resizedHeight = round($aspectRatio * $resizedHeight);
  }
  
  // Return an array with the original and resized dimensions
  return array($origWidth, $origHeight, $resizedWidth, 
    $resizedHeight);
}


//Creating the Resized Image
function create_resized_image (){
	//resize image
	$sizes = get_image_sizes($sourceImageFilePath, $maxResizeWidth, $maxResizeHeight);
	$origWidth = $sizes[0];
	$origHeight = $sizes[1];
	$resizedWidth = $sizes[2];
	$resizedHeight = $sizes[3];
	//create new image
	$imageOutput = imagecreatetruecolor($resizedWidth, $resizedHeight);
	if($imageOutput === FALSE) return FALSE; // Error condition
	//copy the rescaled image
	$result = imagecopyresampled($imageOutput, $imageSource, 0, 0, 0, 0, $resizedWidth, $resizedHeight, $origWidth, $origHeight);
	if($result === FALSE) return false; // Error condition
	// Write out the JPEG file with the highest quality value
	$result = imagejpeg($imageOutput, $outputPath, 100);
	if($result === FALSE) return false; // Error condition
		
}
?>
