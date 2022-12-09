<?= 34*2; ?>
<table id="GetCondition" border=0px cellspacing=0px cellpadding=0px class=TOOLBAR no=SubLista style="padding-left:5px; padding-right:5px; padding-bottom:2px; text-align:center">
<tr><td>
<table border=0px cellspacing=0px cellpadding=0px style="width:100%;background:transparent;"><tr>
<th style="width:100%;background:transparent;white-space:nowrap;cursor:default">Condición multiple</th>
<th style="width:1px; background:transparent">
<i class="ICONWINDOW" onclick="_EditConditionClose()" title="Cerrar ventana">5</i>
</th></tr>
</table>
</td></tr>
<tr><td>
<form name="GETCONDITION">
<table class="BROWSE NO_SHADOW" style="border-collapse:separate;">
<tr style="cursor:default"><th style="cursor:default">Condición</th><th style="cursor:default">Valor</th></tr>
<tr>
<td align="center">
<INPUT NAME="_cnd_type_1" id="_cnd_type_1" TYPE="HIDDEN" onfocus=S.key("CN")>
<span class="SELECTINPUT" onclick=S.key("S")>
<INPUT NAME="_INPUT__cnd_type_1" id="_INPUT__cnd_type_1" SIZE=2 MAXLENGTH=2 class="EDITABLE" onfocus=S.key("S")>
</span>
<DIV class="SELECT EDITABLE SCROLLBAR">
<TABLE INIT=0 id="_cnd_type_1_TABLE" width=1px cols=2><COL id=o><COL>
<TR v="" r=0><TD><TD>&nbsp;
<TR v=">" r=1><TD>><TD>>
<TR v=">=" r=2><TD>>=<TD>>=
<TR v="<" r=3><TD><<TD><
<TR v="<=" r=4><TD><=<TD><=
<TR v="<>" r=5><TD><><TD><>
<TR v="=" r=6><TD>=<TD>=
</TABLE>
</DIV>
</td>
<td style="width:100px;height:1px;text-align:center"><nobr>
<input type="text" id="_cnd_value_1" name="_cnd_value_1" class="EDITABLE" onkeypress=ePattern() onkeydown=ePatternDel() style="border:0px;width:100px">
<i class="ICONINPUT">,</i>
</td>
</tr>
<tr>
<td align="center">
<INPUT NAME="_cnd_type_2" id="_cnd_type_2" TYPE="HIDDEN" onfocus=S.key("CN")>
<span class="SELECTINPUT" onclick=S.key("S")>
<INPUT NAME="_INPUT__cnd_type_2" id="_INPUT__cnd_type_2" SIZE=2 MAXLENGTH=2 class="EDITABLE" onfocus=S.key("S")>
</span>
<DIV class="SELECT EDITABLE SCROLLBAR">
<TABLE INIT=0 id="_cnd_type_2_TABLE" width=1px cols=2><COL id=o><COL>
<TR v="" r=0><TD><TD>&nbsp;
<TR v=">" r=1><TD>><TD>>
<TR v=">=" r=2><TD>>=<TD>>=
<TR v="<" r=3><TD><<TD><
<TR v="<=" r=4><TD><=<TD><=
<TR v="<>" r=5><TD><><TD><>
<TR v="=" r=6><TD>=<TD>=
</TABLE>
</DIV>
</td>
<td style="width:100px;height:1px;text-align:center"><nobr>
<input type="text" id="_cnd_value_2" name="_cnd_value_2" class="EDITABLE" onkeypress=ePattern() onkeydown=ePatternDel() style="border:0px;width:100px">
<i class="ICONINPUT">,</i>
</td>
</tr>
<tr>
<td align="center">
<INPUT NAME="_cnd_type_3" id="_cnd_type_3" TYPE="HIDDEN" onfocus=S.key("CN")>
<span class="SELECTINPUT" onclick=S.key("S")>
<INPUT NAME="_INPUT__cnd_type_3" id="_INPUT__cnd_type_3" SIZE=2 MAXLENGTH=2 class="EDITABLE" onfocus=S.key("S")>
</span>
<DIV class="SELECT EDITABLE SCROLLBAR">
<TABLE INIT=0 id="_cnd_type_3_TABLE" width=1px cols=2><COL id=o><COL>
<TR v="" r=0><TD><TD>&nbsp;
<TR v=">" r=1><TD>><TD>>
<TR v=">=" r=2><TD>>=<TD>>=
<TR v="<" r=3><TD><<TD><
<TR v="<=" r=4><TD><=<TD><=
<TR v="<>" r=5><TD><><TD><>
<TR v="=" r=6><TD>=<TD>=
</TABLE>
</DIV>
</td>
<td style="width:100px;height:1px;text-align:center"><nobr>
<input type="text" id="_cnd_value_3" name="_cnd_value_3" class="EDITABLE" onkeypress=ePattern() onkeydown=ePatternDel() style="border:0px;width:100px">
<i class="ICONINPUT">,</i>
</td>
</tr>
</table>
</form>
</td></tr>
<tr><td align=center >
<?=eAddButton("U", "Modificar", "_EditConditionOk()", "Aceptar las condiciones");?>
</td></tr>
</table>
