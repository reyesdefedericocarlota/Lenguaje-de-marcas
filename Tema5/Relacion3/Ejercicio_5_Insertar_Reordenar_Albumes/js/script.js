const lista = document.getElementById("albumes");

const nuevoAlbum = document.createElement("li");
nuevoAlbum.textContent = '"Xapomelon" - La Pegatina';

const talco = document.getElementById("talco"); 
lista.insertBefore(nuevoAlbum, talco);

const otroAlbum = document.createElement("li");
otroAlbum.textContent = '"Street Gigs" - The Locos';
lista.appendChild(otroAlbum);