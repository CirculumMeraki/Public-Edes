<?PHP
$Chart[ 'chart_rect' ] = array(
'x'=>100,
'y'=>40,
'width'=>350,
'height'=>200
);
$Chart[ 'axis_category' ] = array(
'size'=>12,
'color'=>"7D490F",
'alpha'=>80,
'font'=>"arial",
'bold'=>true,
'skip'=>0 ,
'orientation'=>"horizontal" );
$Chart[ 'axis_value' ] = array(
'min'=>0,
'max'=>120,
'font'=>"arial",
'bold'=>true,
'size'=>10,
'color'=>"1A018B",
'alpha'=>100,
'steps'=>6,
'prefix'=>"",
'suffix'=>"",
'decimals'=>0,
'separator'=>".",
'show_min'=>true );
$Chart["chart_border"]	= array( "top_thickness"=>0,
"bottom_thickness"=>2,
"left_thickness"=>2,
"right_thickness"=>0,
"color"=>"808B9F" );
$Chart[ 'chart_grid_h' ] = array(
'thickness' => 1,
'color'     => "808B9F",
'alpha'     => 25,
'type'      => "solid"
);
$Chart[ 'chart_grid_v' ] = array(
'thickness' => 1,
'color'     => "808B9F",
'alpha'     => 0,
'type'      => "solid"
);
$Chart[ 'legend_transition' ] = array(
'type'     => "slide_right",
'delay'    => 1,
'duration' => 1
);
$Chart[ 'chart_transition' ] = array(
'type'     => "spin",
'delay'    => 0,
'duration' => 0,
'order'    => "series"
);
$Chart[ 'chart_value' ] = array(
'prefix'        => "",
'suffix'        => "",
'decimals'      => 0,
'decimal_char'  => ".",
'separator'     => ".",
'position'      => "outside",
'hide_zero'     => false,
'as_percentage' => false,
'font'          => "Arial",
'bold'          => true,
'size'          => 12,
'color'         => "8B0101",
'alpha'         => 100
);
$Chart[ 'draw' ] = array( array(
'type'		=> "text",
'transition'=> 'zoom',
'delay'		=> 1,
'duration'	=> 1,
'color'		=> "000000",
'alpha'		=> 10,
'font'		=> "arial",
'rotation'	=> -90,
'bold'		=> true,
'size'		=> 55,
'x'			=> 20,
'y'			=> 300,
'width'		=> 300,
'height'		=> 250,
'text'		=> "",
'h_align'	=> "left",
'v_align'	=> "top"
),
array(
'type'=>"text",
'transition'=> 'slide_left',
'delay'		=> 1,
'duration'	=> 1,
'color'		=> "000033",
'alpha'		=> 50,
'font'		=> "arial",
'rotation'	=> -90,
'bold'		=> true,
'size'		=> 16,
'x'			=> 15,
'y'			=> 230,
'width'		=> 300,
'height'		=> 50,
'text'		=> "",
'h_align'	=> "center",
'v_align'	=> "middle"
),
array(
'type'		=> "text",
'transition'=> 'slide_down',
'delay'		=> 1,
'duration'	=> 1,
'color'		=> "2F8A4A",
'alpha'		=> 10,
'font'		=> "arial",
'rotation'	=> 0,
'bold'		=> true,
'size'		=> 40,
'x'			=> 200,
'y'			=> 30,
'width'		=> 300,
'height'		=> 50,
'text'		=> "",
'h_align'	=> "center",
'v_align'	=> "middle" )
);
$Chart[ 'legend_label' ] = array(
'layout' => "horizontal",
'bullet' => "circle",
'font'   => "Verdana",
'bold'   => true,
'size'   => 12,
'color'  => "00167D",
'alpha'  => 90
);
$Chart[ 'legend_rect' ] = array(
'x'              => 100,
'y'              => 5,
'width'          => 350,
'height'         => 10,
'margin'         => 5,
'fill_color'     => "478FE0",
'fill_alpha'     => 10,
'line_color'     => "808B9F",
'line_alpha'     => 25,
'line_thickness' => 1
);
$Chart[ 'series_color' ] = array( "cc5511" );
$Chart[ 'series_gap' ] = array(
'bar_gap' => 60,
'set_gap' => 30
);
?>
