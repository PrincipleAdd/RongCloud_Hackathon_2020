
function initialize() {
  var xmlDoc;
  var xslDoc;

  xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
  xmlDoc.async = false;

  xslDoc = new ActiveXObject('Microsoft.XMLDOM');
  xslDoc.async = false;

  xmlDoc.load("xml/test.xml");
  xslDoc.load("xml/tree.xsl");

  tree.innerHTML = xmlDoc.documentElement.transformNode(xslDoc);
}

function clickOnEntity(entity){
  if(entity.open == "false")
    expand(entity);
  else
    collapse(entity);

  try
  {
	window.event.cancelBubble = "true";
  }
  catch(e)
  {}
}

function expand(entity)
{
  var oImage;

  oImage = entity.childNodes(0).all["image"];

  if(oImage!=null)
	oImage.src = entity.imageOpen;

  for(i=0; i < entity.childNodes.length; i++)
    if(entity.childNodes(i).tagName.toUpperCase()== "DIV")
      entity.childNodes(i).style.display = "block";

  entity.open = "true";
}

function collapse(entity)
{
  var oImage;
  var i;

  oImage = entity.childNodes(0).all["image"];
  if(oImage!=null)
	oImage.src = entity.image;

  for(i=0; i < entity.childNodes.length; i++){
      if(entity.childNodes(i).tagName.toUpperCase() == "DIV"){
        if(entity.id != "tree")
			entity.childNodes(i).style.display = "none";
		if(entity.childNodes(i).image)
			collapse(entity.childNodes(i));
      }
    }
  entity.open = "false";
}

function expandAll(entity){
  var oImage;
  var i;

  expand(entity, false);

  for(i=0; i < entity.childNodes.length; i++){
    if(entity.childNodes(i).tagName == "DIV"){
      expandAll(entity.childNodes(i));
    }
  }
}