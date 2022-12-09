<?PHP
$Chart[ 'chart_rect' ] = array(
'x'      => 100,
'y'      => 40,
'width'  => 350,
'height' => 200
);
$Chart[ 'axis_category' ] = array(
'size'        => 8,
'color'       => "808B9F",
'alpha'       => 100,
'font'        => "arial",
'skip'        => 0 ,
'orientation' => "diagonal_up"
);
$Chart[ 'axis_ticks' ] = array(
'value_ticks'     => true,
'category_ticks'  => true,
'major_thickness' => 2,
'minor_thickness' => 1,
'minor_count'     => 1,
'major_color'     => "000000",
'minor_color'     => "222222" ,
'position'        => "outside"
);
$Chart[ 'axis_value' ] = array(
'min'          => 10,
'max'          => 200,
'steps'        => 5,
'prefix'       => "",
'suffix'       => "",
'decimals'     => 0,
'decimal_char' => ",",
'separator'    => ".",
'show_min'     => true,
'font'         => "Arial",
'bold'         => true,
'size'         => 12,
'color'        => "1A018B",
'alpha'        => 100,
'orientation'  => ""
);
$Chart["chart_border"] = array(
"top_thickness"    => 0,
"bottom_thickness" => 2,
"left_thickness"   => 2,
"right_thickness"  => 0,
"color"            => "808B9F"
);
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
$Chart[ 'chart_pref' ] = array(
'rotation_x' => 20,
'rotation_y' => 20
);
$Chart[ 'chart_transition' ] = array(
'type'     => "drop",
'delay'    => 0.6,
'duration' => 1,
'order'    => "series"
);
$Chart[ 'chart_value' ] = array(
'hide_zero'     => true,
'color'         => "8B0101",
'alpha'         => 100,
'size'          => 20,
'position'      => "cursor",
'prefix'        => "",
'suffix'        => "",
'decimals'      => 0,
'separator'     => ".",
'as_percentage' => true
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
$Chart[ 'series_gap' ] = array(
'bar_gap' => 15,
'set_gap' => 15
);
?>
