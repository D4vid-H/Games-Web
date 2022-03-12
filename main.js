const LUCHADORUNO = {
  id: "uno",
  nombre: "Superman",
  Golpe_Bajo: 11,
  Golpe_Fuerte: 20,
  vida: 100,
  golpe_Especial: 50,
};

const LUCHADORDOS = {
  id: "dos",
  nombre: "Batman",
  Golpe_Bajo: 10,
  Golpe_Fuerte: 22,
  vida: 100,
  golpe_Especial: 50,
};

const imgBatmanGolpe_Fuerte = "batmanfuerte.jpg";
const imgBatmanGolpe_Bajo = "batmandebil.jpg";
const imgBatmanGolpe_Especial = "batmanespecial.jpg";
const imgBatmanWin = "batmanwin.jpg";
const imgSupermanGolpe_Fuerte = "supermanfuerte.jpg";
const imgSupermanGolpe_Bajo = "supermandebil.jpg";
const imgSupermanGolpe_Especial = "supermanespecial.jpg";
const imgSupermanWin = "supermanwin.jpg";

const golpeSuperman = (superman, batman) => {

  const tipoGolpe = Object.getOwnPropertyNames(superman);
  let { vida } = batman;
  Math.ceil(Math.random() * 50) + 1 === 16 && (vida = 
    perderVida(
      vida,
      superman.golpe_Especial,
      imgSupermanGolpe_Especial,
      superman,
      tipoGolpe[5],
      batman
    ));

  vida =
    Math.ceil(Math.random() * 5) + 1 === 3
      ? perderVida(
          vida,
          superman.Golpe_Fuerte,
          imgSupermanGolpe_Fuerte,
          superman,
          tipoGolpe[3],
          batman
        )
      : perderVida(
          vida,
          superman.Golpe_Bajo,
          imgSupermanGolpe_Bajo,
          superman,
          tipoGolpe[2],
          batman
        );

  batman.vida = vida;
};

const golpeBatman = (batman, superman) => {

  const tipoGolpe = Object.getOwnPropertyNames(batman);
  let { vida } = superman;
  Math.ceil(Math.random() * 50) + 1 === 16 &&  (vida = perderVida(vida, batman.golpe_Especial, imgBatmanGolpe_Especial, batman, tipoGolpe[5],superman));

  vida = Math.ceil(Math.random() * 5) + 1 === 3 ? perderVida(vida, batman.Golpe_Fuerte, imgBatmanGolpe_Fuerte, batman, tipoGolpe[3],superman) : perderVida( vida, batman.Golpe_Bajo, imgBatmanGolpe_Bajo, batman, tipoGolpe[2],superman);

  superman.vida = vida;
};

const perderVida = (vida, golpe, img, luchadoruno, tipoGolpe, luchadordos) => {
  console.log(`Se activo el golpe ${golpe}`);  
  vida = vida - golpe;
  dibujarEscena(img, luchadoruno, tipoGolpe, luchadordos, vida);
  return vida;
};

const dibujarEscena = (image, luchadoruno, tipoGolpe, luchadordos, vida) => {
  vida < 0 && (vida = 0);
  const div = document.createElement("div");
  div.setAttribute("class", "recuadro__img");
  document.body.appendChild(div).innerHTML = `
              <div class="text__formato">
                   
                    <img class="align-left" src="./img/${image}">
                    
                    <div class="container-bocadillo">
                        <div class="bocadillo-redondo">
                            ${luchadordos.nombre}
                            <div class="progress" style="width: 100%">
                              <div class="progress-bar" role="progressbar" style="width: ${vida}%" aria-valuenow="${vida}" aria-valuemin="0" aria-valuemax="150">${vida}</div>                              
                            </div>
                            ${luchadoruno.nombre}
                            <div class="progress" style="width: 100%">                            
                              <div class="progress-bar" role="progressbar" style="width: ${luchadoruno.vida}%" aria-valuenow="${luchadoruno.vida}" aria-valuemin="0" aria-valuemax="150">${luchadoruno.vida}</div>
                            </div>
                            ${luchadoruno.nombre} conecta un ${tipoGolpe}                            
                        </div> 
                        <img src="./img/pow.png" class="pow">
                    </div>
              </div>   
          `;
};

do {

  Math.ceil(Math.random() * (5 - 3)) + 0 === 1
    ? golpeSuperman(LUCHADORUNO, LUCHADORDOS)
    : golpeBatman(LUCHADORDOS, LUCHADORUNO);
    debugger
} while (LUCHADORUNO.vida >= 0 && LUCHADORDOS.vida >= 0);

LUCHADORDOS.vida <= 0
  ? dibujarEscena(imgSupermanWin, LUCHADORUNO, "Golpe_Mortal",LUCHADORDOS, 0)
  : dibujarEscena(imgBatmanWin, LUCHADORDOS, "Golpe_Mortal",LUCHADORUNO, 0);

