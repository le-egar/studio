// Etablir canvas
var canvas = new fabric.Canvas("c", {
  selection: true,
});
canvas.backgroundColor="white";
canvas.renderTop();
var liste = canvas.getObjects();


// Boutons pour ajouter les éléments au canvas
let buttons = document.querySelectorAll('.bouton')
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    var imgAjout = event.target.id;
    var objet = new fabric.Image(imgAjout, {
        left: 50,
        top: 50,
    });    
    canvas.add(objet);
  });
});


// Contrôle pour supprimer les éléments sélectionnés 
    // Nouveau contrôle
var croix = document.getElementById("croix");
fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetX: 16,
    offsetY: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });

    // Fonction supprimer
function deleteObject() {
var activeObject = canvas.getActiveObjects();
  canvas.discardActiveObject();
  canvas.remove(...activeObject);
  canvas.requestRenderAll();
}

  // Supprimer avec Touche Suppr
document.addEventListener("keydown", function(e) {
  if (e.key == "Delete") {
    deleteObject();
  }
});

    // Rendu de la croix
function renderIcon(ctx, left, top, fabricObject) {
var size = this.cornerSize;
ctx.save();
ctx.translate(left, top);
ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
ctx.drawImage(croix, -size/2, -size/2, size, size);
ctx.restore();
}


// Mettre objet sélectionné au premier plan
canvas.on("before:selection:cleared", function(e) {
  e.target.bringToFront();
});


// Texte

  // Sélection couleur
var txtC = document.getElementById("txtcolor");
var txtB = document.getElementById("bkgcolor");
txtC.addEventListener("change", onChangeColor);
function onChangeColor() {
  console.log(this.value);
}
txtB.addEventListener("change", onChangeColor);
function onChangeColor() {
  console.log(this.value);
}


  // Ajout du texte
var txt = document.getElementById('txt');
var add = document.getElementById('ajouter');
add.addEventListener('click', function(){
  var texteContenu = txt.value;
  var texteCouleur = txtC.value;
  var texteFond = txtB.value;
  var text = new fabric.Text(texteContenu, {
    fill: texteCouleur,
    backgroundColor: texteFond,
  });
  canvas.add(text);
});


// Nommer et télécharger bd
var titreTxt = document.getElementById('titre');
var imageSaver = document.getElementById('lnkDownload');
imageSaver.addEventListener('click', saveImage, false);
function saveImage(e) {
    this.href = canvas.toDataURL({
        format: 'png',
        quality: 0.8
    });
    if (titreTxt.value === '') {
      this.download ='mabd.png'
    } else {
    this.download = titreTxt.value + '.png'}
}


// Overlay pour les cases de la BD
var overlay = 'overSix';
overChange(overlay);
function overChange(overlay) {
  canvas.getObjects().forEach(function(e) {
    if(e.id == 'tl') {
        canvas.remove(e);
    } else if(e.id == 'tr') {
      canvas.remove(e);
    } else if(e.id == 'ml') {
    canvas.remove(e);
    } else if(e.id == 'mr') {
    canvas.remove(e);
    } else if(e.id == 'bl') {
    canvas.remove(e);
    } else if(e.id == 'br') {
    canvas.remove(e);
    };
  }); 
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'overlay') {
        canvas.remove(o);
    }});
  if (overlay.value === '1') {
    document.getElementsByClassName('quatre')[0].style.display = "none";
    document.getElementsByClassName('quatre')[1].style.display = "none";
    document.getElementsByClassName('six')[0].style.display = "none";
    document.getElementsByClassName('six')[1].style.display = "none";
    document.getElementsByClassName('deux')[0].style.display = "none";
    $(document).ready(function() {
      $("#fonds").find("[id^='ong']").hide(); // Hide all content
      $("#ongs li").attr("id",""); //Reset id's
      $("#ongs li:first").attr("id","current"); // Activate the first tab
      $("#fonds #ong1").show(); // Show first tab's content
      var scroll = document.getElementById('fonds'); scroll.scrollTo(0,0); // Scroll reset
    });

    // console.log('rien');
  } else if (overlay.value === '2') {
    document.getElementsByClassName('quatre')[0].style.display = "block";
    document.getElementsByClassName('quatre')[1].style.display = "block";
    document.getElementsByClassName('deux')[0].style.display = "block";
    document.getElementsByClassName('six')[0].style.display = "none";
    document.getElementsByClassName('six')[1].style.display = "none";
    $(document).ready(function() {
      $("#fonds").find("[id^='ong']").hide(); // Hide all content
      $("#ongs li").attr("id",""); //Reset id's
      $("#ongs li:first").attr("id","current"); // Activate the first tab
      $("#fonds #ong1").show(); // Show first tab's content
      var scroll = document.getElementById('fonds'); scroll.scrollTo(0,0); // Scroll reset
    });
    var overQuatre = document.getElementById("overQuatre");
    var out_frame = new fabric.Image(overQuatre, {
      width: 800,
      height: 800,
      selectable: false,
      evented: false,
      id: 'overlay'
      });
      canvas.add(out_frame);
      canvas.on('selection:cleared', function() {
        out_frame.bringToFront();
        });
      // console.log('ajouté Quatre');
  } else {
    document.getElementsByClassName('quatre')[0].style.display = "block";
    document.getElementsByClassName('quatre')[1].style.display = "block";
    document.getElementsByClassName('six')[0].style.display = "block";
    document.getElementsByClassName('six')[1].style.display = "block";
    document.getElementsByClassName('deux')[0].style.display = "block";
    $(document).ready(function() {
      $("#fonds").find("[id^='ong']").hide(); // Hide all content
      $("#ongs li").attr("id",""); //Reset id's
      $("#ongs li:first").attr("id","current"); // Activate the first tab
      $("#fonds #ong1").show(); // Show first tab's content
      var scroll = document.getElementById('fonds'); scroll.scrollTo(0,0); // Scroll reset
    });
    var overSix = document.getElementById("overSix");
    var out_frame = new fabric.Image(overSix, {
      width: 800,
      height: 800,
      selectable: false,
      evented: false,
      id: 'overlay'
      });
      canvas.add(out_frame);
      canvas.on('selection:cleared', function(e) {
        out_frame.bringToFront();
        });
      // console.log('ajouté Six');
  }

};



// Pour ajout fond
let fonds = document.querySelectorAll('.fond')
fonds.forEach((fnd) => {
  fnd.addEventListener("click", (event) => {
    var nbrecase = document.querySelector('input[name="o"]:checked').value;
    if (nbrecase === '1') {
      var nbrecase = 'u';
    } else if (nbrecase === '2') {
      var nbrecase = 'q';
    } else if (nbrecase === '3') {
      var nbrecase = 's';
    };
    var fondAjout = document.getElementById('temp');
    var fichier = event.target.id;
    var position = event.target.parentElement.parentElement.id;
    canvas.getObjects().forEach(function(o) {
      if(o.id == position) {
          canvas.remove(o);
      }});
    var posX = '0';
    var posY = '0';
    if (nbrecase === 's') {
      if (position === 'tr') {
        posX = '396';
      } else if (position === 'ml') {
        posY = '266';
      } else if (position === 'mr') {
        posY = '262';
        posX = '406';
      } else if (position === 'bl') {
        posY = '546';
      } else if (position === 'br') {
        posY = '538';
        posX = '404';
      };
    } else if (nbrecase === 'q') {
      if (position === 'tr') {
        posX = '404';
      } else if (position === 'ml') {
        posY = '382';
      } else if (position === 'mr') {
        posY = '402';
        posX = '404';
      };
    } else if (nbrecase === 'u') {
      posX = '0';
      posY = '0';
    };
    var objet = new fabric.Image(fondAjout, {
        id: position,
        left: posX,
        top: posY,
    });
    canvas.add(objet);
    objet.set({selectable:false, id:position});
    objet.setSrc('/images/PNGs/fonds/' + fichier + '/' + nbrecase + position + fichier + '.png',
    function () {
      objet.set('dirty', true);
      canvas.renderAll();
      },objet.toObject()
    );
    objet.sendToBack();
    canvas.renderAll();
  });
});

function changeFond(e) {
  var fondC = e.value;
  canvas.backgroundColor=fondC;
  canvas.renderAll();
}



// Upload image
function upload(e) {
  var url = URL.createObjectURL(e.target.files[0]);
     fabric.Image.fromURL(url, function(img) {
      img.scaleToWidth(200, false);
      canvas.add(img);
     });
}