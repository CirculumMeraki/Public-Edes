<?PHP
$Chart[ 'chart_rect' ] = array(
'x'		=> 200,
'y'		=> 40,
'width'	=> 150,
'height'	=> 200
);
$Chart[ 'chart_transition' ] = array(
'type'     => "spin",
'delay'    => 0,
'duration' => 0,
'order'    => "series"
);
$Chart[ 'draw' ] = array( array(
'type'	=> "text",
'color'	=> "006699",
'alpha'	=> 40,
'size'	=> 30,
'x'		=> -50,
'y'		=> 260,
'width'	=> 500,
'height'	=> 50,
'text'	=> "",
'h_align'=> "center",
'v_align'=> "middle" )
);
$Chart[ 'chart_value' ] = array(
'prefix'        => "",
'suffix'        => "%",
'decimals'      => 1,
'decimal_char'  => ".",
'separator'     => ".",
'position'      =>"outside",
'hide_zero'     => false,
'as_percentage' => false,
'font'          => "Arial",
'bold'          => true,
'size'          => 8,
'color'         => "275A78",
'alpha'         => 90
);
$Chart[ 'legend_label' ] = array(
'layout' => "vertical",
'bullet' => "circle",
'font'   => "Verdana",
'bold'   => true,
'size'   => 10,
'color'  => "00167D",
'alpha'  => 90
);
$Chart[ 'legend_rect' ] = array(
'x'              => 0,
'y'              => 50,
'width'          => 100,
'height'         => 10,
'margin'         => 5,
'fill_color'     => "478FE0",
'fill_alpha'     => 10,
'line_color'     => "808B9F",
'line_alpha'     => 25,
'line_thickness' => 1
);
$Chart[ 'legend_transition' ] = array(
'type'		=> "slide_up",
'delay'		=> 0,
'duration'	=> 1
);
$Chart[ 'series_color' ] = array(
"275A78",
"CC3333",
"32745F",
"D2B902",
"18FCF7",
"01C01E",
"FEADAB",
"B601C5",
"FED5AB",
"A2A2A2"
);
$Chart[ 'series_explode' ] = array( 15 );
?>
