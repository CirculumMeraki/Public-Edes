<?PHP  //Chart 'Line'
$Chart[ 'chart_rect' ] = array(
'x'		=> 100,
'y'		=> 40,
'width'	=> 350,
'height'	=> 200
);
$Chart[ 'axis_category' ] = array(
'size'			=> 10,
'color'			=> "7D490F",
'alpha'			=> 80,
'font'			=> "arial",
'bold'			=> true,
'skip'			=> 0 ,
'orientation'	=> "horizontal"
);
$Chart[ 'axis_ticks' ] = array(
'value_ticks'		=> true,
'category_ticks'	=> true,
'major_thickness'	=> 2,
'minor_thickness'	=> 1,
'minor_count'		=> 1,
'major_color'		=> "000000",
'minor_color'		=> "222222",
'position'			=> "outside"
);
$Chart[ 'axis_value' ] = array(
'min'			=> 0,
'max'			=> 120,
'font'		=> "arial",
'bold'		=> true,
'size'		=> 12,
'color'		=> "1A018B",
'alpha'		=> 100,
'steps'		=> 6,
'prefix'		=> "",
'suffix'		=> "",
'decimals'	=> 0,
'separator'	=> ".",
'show_min'	=> true
);
$Chart[ 'chart_grid_h' ] = array(
'alpha'		=> 10,
'color'		=> "000000",
'thickness'	=> 1,
'type'		=> "solid"
);
$Chart[ 'chart_grid_v' ] = array(
'alpha'		=> 10,
'color'		=> "000000",
'thickness'	=> 1,
'type'		=> "solid"
);
$Chart[ 'chart_pref' ] = array(
'line_thickness'	=> 2,
'point_shape'		=> "none",
'fill_shape'		=> false
);
$Chart["chart_border"] = array(
"top_thickness"	=> 0,
"bottom_thickness"=> 2,
"left_thickness"	=> 2,
"right_thickness"	=> 0,
"color"				=> "808B9F"
);
$Chart[ 'chart_value' ] = array(
'prefix'			=> "",
'suffix'			=> "",
'decimals'		=> 0,
'separator'		=> ".",
'position'		=> "cursor",
'hide_zero'		=> true,
'as_percentage'=> false,
'font'			=> "arial",
'bold'			=> true,
'size'			=> 12,
'color'			=> "8B0101",
'alpha'			=> 100
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
$Chart[ 'legend_transition' ] = array(
'type'     => "slide_right",
'delay'    => 1,
'duration' => 1
);
$Chart[ 'series_color' ] = array( "cc5511" );
?>
