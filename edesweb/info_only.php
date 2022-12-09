{$header}
<style>
body, html {
height: 100%;
width: 100%;
background: #eeeeee;
overflow: hidden;
cursor: pointer;
}
table {
width: 100%;
height: 100%;
font-family: helvetica;
}
SPAN {
background: #D9534F;
color: #ffffff;
border: 1px solid #C02E29;
padding: 20px;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 10px;
box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
-moz-box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
-webkit-box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
}
</style>
</head>
<body>
<table border=0px>
<tr>
<td align="center" valign="middle">
<span>
{$message}
</span>
</td>
</tr>
</table>
{$historyPushState}
</body>
</html>
