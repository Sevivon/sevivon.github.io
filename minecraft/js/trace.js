const BLOCS    = ["wool","stained_hardened_clay","stained_glass","concrete","concrete_powder","glazed_terracotta","shulker_box"];
const COULEURS = ["white","orange","magenta","light_blue","yellow","lime","pink","gray","silver","cyan","purple","blue","brown","green","red","black"];

function initialiserFormulaire()
{
	var i;
	
	for ( i = 0 ; i < BLOCS.length ; i++ )
		$("#bloc").append($("<option></option>").attr("value",BLOCS[i]).html(BLOCS[i]));
	
	for ( i = 0 ; i < COULEURS.length ; i++ )
		$("#couleur").append($("<option></option>").attr("value",COULEURS[i]).html(COULEURS[i]));
	
	$("#bloc option[value=wool]").prop("selected",true);
	$("#couleur option[value=black]").prop("selected",true);
}

function verifierSaisieMin()
{
	var xMin = parseInt($("#xMin").val());
	var xMax = parseInt($("#xMax").val());
	
	if ( isNaN(xMin) || xMin > xMax )
		$("#xMin").val(xMax);
	else
		$("#xMin").val(xMin);
}

function verifierSaisieMax()
{
	var xMin = parseInt($("#xMin").val());
	var xMax = parseInt($("#xMax").val());
	
	if ( isNaN(xMax) || xMin > xMax )
		$("#xMax").val(xMin);
	else
		$("#xMax").val(xMax);
}

function verifierSaisieEchelle()
{
	var valeur = parseInt($(this).val());
	
	if ( isNaN(valeur) || valeur < 1 )
		$(this).val(1);
	else
		$(this).val(valeur);
}

function genererFonction()
{	
	var expression = $("#expression").val().replace(/\s/g,"");
	var xMin       = parseInt($("#xMin").val());
	var xMax       = parseInt($("#xMax").val());
	
	var bloc       = $("#bloc").val();
	var couleur    = $("#couleur").val();
	var echelleX   = parseInt($("#echelleX").val());
	var echelleZ   = parseInt($("#echelleZ").val());
	
	if ( expression === "" ) expression = "x";
	$("#expression").val(expression);
	
	if ( isNaN(xMin) ) xMin = 0;
	if ( isNaN(xMax) ) xMax = 10;
	if ( xMin > xMax ) xMax = xMin;
	
	if ( isNaN(echelleX) || echelleX < 1 ) echelleX = 1;
	if ( isNaN(echelleZ) || echelleZ < 1 ) echelleZ = 1;
	
	var fonction = "";
	var dx, dz, y;
	
	try
	{
		var f = math.compile(expression);
		
		for ( dx = 0 ; dx <= echelleX*(xMax-xMin) ; dx++ )
		{
			y = f.eval({x:xMin+dx/echelleX});
			
			if ( Number.isFinite(y) )
			{
				dz = Math.round(echelleZ*y);
				fonction += "setblock ~-"+dx+" ~ ~"+dz+" "+bloc+" color="+couleur+"\n";
			}
		}
	}
	catch (e)
	{
		//alert(e.message);
	}
	
	$("#fonction").html(fonction);
}

$(document).ready(function()
{
	initialiserFormulaire();
	$("#expression").change(function(){ if ( /^\s$/.test($(this).val()) ) $(this).val("x"); });
	$("#xMin").change(verifierSaisieMin);
	$("#xMax").change(verifierSaisieMax);
	$("#echelleX, #echelleZ").change(verifierSaisieEchelle);
	$("#boutonGenerer").click(genererFonction);
	new Clipboard("#boutonCopier");
});