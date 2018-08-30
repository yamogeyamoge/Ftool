function radioON(){
 
	var $input = $('<input type="radio" name="test" value="1" />').attr("checked", false );
	var $label = $('<label>1</label>')
	$("#quiz").html($input).append($label);
	var $input = $('<input type="radio" name="test" value="2" />').attr("checked", false );
	var $label = $('<label>2</label>')
	$("#quiz").append($input).append($label);
	var $input = $('<input type="radio" name="test" value="3" />').attr("checked", false );
	var $label = $('<label>3</label>')
	$("#quiz").append($input).append($label);

}

function radioOFF(){
	$("#quiz").empty();
}
