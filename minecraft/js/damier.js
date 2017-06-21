const BLOCS    = ["wool","stained_hardened_clay","stained_glass","concrete","concrete_powder","glazed_terracotta","shulker_box"];
const COULEURS = ["white","orange","magenta","light_blue","yellow","lime","pink","gray","silver","cyan","purple","blue","brown","green","red","black"];

function initialiserFormulaire()
{
	var i;
	
	for ( i = 0 ; i < BLOCS.length ; i++ )
		$("#bloc").append($("<option></option>").attr("value",BLOCS[i]).html(BLOCS[i]));
	
	for ( i = 0 ; i < COULEURS.length ; i++ )
		$("#couleur1, #couleur2").append($("<option></option>").attr("value",COULEURS[i]).html(COULEURS[i]));
	
	$("#bloc option[value=wool]").prop("selected",true);
	$("#couleur1 option[value=white]").prop("selected",true);
	$("#couleur2 option[value=black]").prop("selected",true);
}

function verifierDimensions()
{
	var largeur = parseInt($("#largeur").val());
	var hauteur = parseInt($("#hauteur").val());
	var valeur  = parseInt($(this).val());
	
	if ( isNaN(valeur) || valeur < 1 || largeur*hauteur > 32768 )
		$(this).val(1);
}

function genererFonction()
{	
	var largeur  = parseInt($("#largeur").val());
	var hauteur  = parseInt($("#hauteur").val());
	var bloc     = $("#bloc").val();
	var couleur1 = $("#couleur1").val();
	var couleur2 = $("#couleur2").val();
	
	var fonction = "fill ~ ~ ~ ~"+(largeur-1)+" ~ ~"+(hauteur-1)+" "+bloc+" color="+couleur2+"\n";
	var dx, dz;
	
	for ( dx = 0 ; dx < largeur ; dx++ )
		for ( dz = dx%2 ; dz < hauteur ; dz+=2 )
			fonction += "setblock ~"+dx+" ~ ~"+dz+" "+bloc+" color="+couleur1+"\n";
	
	$("#fonction").html(fonction);
}

$(document).ready(function()
{
	initialiserFormulaire();
	$("#largeur, #hauteur").change(verifierDimensions);
	$("#boutonGenerer").click(genererFonction);
	new Clipboard("#boutonCopier");
});