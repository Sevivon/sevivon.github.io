function genererFonction()
{
	$("#fonction").html("test "+(+1));
	
	var largeur  = parseInt($("#largeur").val());
	var hauteur  = parseInt($("#hauteur").val());
	var bloc     = $("#bloc").val();
	var couleur1 = $("#couleur1").val();
	var couleur2 = $("#couleur2").val();
	
	console.log(largeur+1);
	console.log(bloc);
	
	var fonction = "fill ~ ~ ~ ~"+(largeur-1)+" ~ ~"+(hauteur-1)+" "+bloc+" color="+couleur2+"\n";
	
	var dx, dz;
	
	for ( dx = 0 ; dx < largeur ; dx++ )
		for ( dz = dx%2 ; dz < hauteur ; dz+=2 )
			fonction += "setblock ~"+dx+" ~ ~"+dz+" "+bloc+" color="+couleur1+"\n";
	
	$("#fonction").html(fonction);
}

$(document).ready(function()
{
	$("#boutonGenerer").click(genererFonction);
	new Clipboard("#boutonCopier");
});