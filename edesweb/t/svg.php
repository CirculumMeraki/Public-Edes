<style>
BODY {
background-color:#ffffff;
}
SPAN {
width:50px;
height:50px;
border:1px solid #eeeeee;
display: block;
float:left;
margin-right:20px;
margin-top:20px;
text-align:center;
vertical-align:top;
}
IMG, SVG {
-width:30px;
-min-width:30px;
max-width:50px;
-min-height:30px;
max-height:50px;
cursor:pointer;
}
</style>
<?PHP
$DirBase = $_SERVER["QUERY_STRING"];
$di = opendir($DirBase);
while( $file = readdir($di) ){
if( $file!='.' && $file!='..' ){
$ext = trim(strtolower(eFileType($file)));
if( $ext=="" ){
}else if( preg_match('/^(gif|png|jpg|jpeg)$/i', $ext) ){
$NomFile = "{$DirBase}/{$file}";
echo "<span onclick='selIcono(this)'><img src='{$NomFile}'></span>";
}else if( preg_match('/^svg$/i', $ext) ){
$NomFile = "{$DirBase}/{$file}";
echo "<span onclick='selIcono(this)' src='{$NomFile}'>";
include($NomFile);
echo '</span>';
}
}
}
closedir($di);
