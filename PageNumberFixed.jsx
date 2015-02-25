// PageNumberFixed 0.1.0 - 25/02/2014
// by Gilles Hoarau (gilleshoarau.com)
// Automatically create page numbering in your Indesign documents that will be
// outlines in order to be fixed, so you can move pages around and still have
// their older number.
// Actually, it works best with A4 format. Needs lots of customization.
// Tested on Indesign CC 2014 10
// 1. You need a layer named "PNF". It will be selected automatically to insert
// the new numbering.
// 2. Select the paragraph style you want for the new page numbering.
// 3. A new color will be created "PNFYELLOW"
// 4. Execute the script and be cool !

catch (myError){};
var myDocument = app.documents.item(0);
var activeDocument = app.activeDocument;

var myPages = activeDocument.pages;
var myPagesNo = myPages.length;

//alert(myPagesNo);

var color = document.colors.itemByName("PNFYELLOW");
if(color==null){
    color = document.colors.add();
    color.name = "PNFYELLOW";
    color.colorValue = [0,0,100,0];
}

var myPageHeight = myDocument.documentPreferences.pageHeight;

with(activeDocument){
  // Loop des pages
  for(i=0;i<myPagesNo;i++) {
      var myPage = pages.item(i);

      with(activeDocument.pages.item(i)){

      // Ajout d'un textframe aux items de la page
      app.activeDocument.activeLayer=app.activeDocument.layers.itemByName("PNF");
      var myBGFrame = textFrames.add();
      var myTextFrame = textFrames.add();

     // Placement du textframe
     if(myPage.side == PageSideOptions.leftHand){
         myBGFrame.fillColor  = color;
         myBGFrame.geometricBounds = ["270mm", "6p", "61p", "0p"];
         myTextFrame.geometricBounds = ["270mm", "6p", "61p", "0p"];
      }
      else{
          myBGFrame.fillColor  = color;
          myBGFrame.geometricBounds = ["270mm", "390mm", "61p", "420mm"];
          myTextFrame.geometricBounds = ["270mm", "390mm", "61p", "420mm"];
      }

      // Custom paragraph style
      var myParagraph = myTextFrame.paragraphs.item(0);
      var myTextParagraph = myTextFrame.parentStory.paragraphs[0];

      myTextFrame.textFramePreferences.verticalJustification = Justification.CENTER_ALIGN;
      myTextFrame.contents = SpecialCharacters.autoPageNumber;
      myTextFrame.createOutlines();
     }
  }
}
