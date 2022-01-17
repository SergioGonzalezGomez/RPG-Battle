const characters = [
    {
      "id": 1,
      "name": "Humano",
      "avatar": "./assets/humano.jpg",
      "damage": [
        "6d6",
        "2d10",
        "1d20"
      ],
      "critic": 10,
      "defense": 10,
      "vitality": 250
    },
    {
      "id": 2,
      "name": "Enano",
      "avatar": "./assets/enano.jpg",
      "damage": [
        "8d4",
        "3d10"
      ],
      "critic": 9,
      "defense": 15,
      "vitality": 325
    },
    {
      "id": 3,
      "name": "Licántropo",
      "avatar": "./assets/licantropo.jpg",
      "damage": [
        "4d10",
        "2d20"
      ],
      "critic": 10,
      "defense": 4,
      "vitality": 250
    },
    {
      "id": 1,
      "name": "Orco",
      "avatar": "./assets/orco.jpg",
      "damage": [
        "3d20"
      ],
      "critic": 15,
      "defense": 12,
      "vitality": 300
    },
    {
      "id": 1,
      "name": "Elfo",
      "avatar": "./assets/elfo.jpg",
      "damage": [
        "12d6"
      ],
      "critic": 6,
      "defense": 8,
      "vitality": 225
    }
];

let clicks = 0;
let jugador1;
let jugador2;
let resetButton$$;
let fightButton$$;


const presentacion$$ = document.createElement('div');
presentacion$$.classList.add("presentacion");
document.body.appendChild(presentacion$$);

function charactersF () {
    if (resetButton$$ != undefined) { //Eliminar el resetButton si ya existía
        resetButton$$.remove();
    }

    presentacion$$.innerHTML = "";
    clicks = 0;

    for (let i = 0; i < characters.length; i++) { //Presentacion de personajes
       const divPersonaje$$ = document.createElement('div');
       divPersonaje$$.innerHTML = `<img src="${characters[i].avatar}">
                                    <h4>${characters[i].name}</h4>
                                    <h4>ATRIBUTOS</h4>
                                    <h5>DAÑO: ${characters[i].damage.join(" ")}</h5>
                                    <h5>CRITICO: ${characters[i].critic}</h5>
                                    <h5>DEFENSA: ${characters[i].defense}</h5>
                                    <h5>VIDA: ${characters[i].vitality}</h5>`;
        divPersonaje$$.classList.add("divPersonaje");
        presentacion$$.appendChild(divPersonaje$$);
    };
    const tablero$$ = document.querySelectorAll(".divPersonaje"); //Seleccion de pjs para añadirles el evento
    for (let j = 0; j < tablero$$.length; j++) {
        tablero$$[j].addEventListener('click', () => {
            if (clicks == 0) { //cuando nadie esta seleccionado se selecciona al primer jugador
                jugador1 = j;
                tablero$$[j].style.border = "2px solid red";
                clicks++;
            } else if(clicks == 1 && j != jugador1){ //cuando se selecciona un jugador distinto al jugador1 se le asigna como jugador2
                jugador2 = j;
                tablero$$[j].style.border = "2px solid red";
                clicks++;
                fightButton$$ = document.createElement('button'); //se crea el boton de lucha al ya estar ambos luchadores
                fightButton$$.innerText = "FIGHT!";
                fightButton$$.classList.add("fightButton");
                fightButton$$.addEventListener('click', fight);
                document.body.appendChild(fightButton$$);
            } else if (clicks == 1 && j == jugador1){ //si clickeas el jugador que ya habías seleccionado, se deselecciona
                clicks--;
                jugador1 = undefined;
                tablero$$[j].style.border = "none";
            } else if (clicks == 2 && j == jugador1){//si teniendo los dos seleccionados clickas en el primero este se deselecciona y el jugador 2  pasa a ser el jugador 1
                clicks--;
                jugador1 = jugador2;
                jugador2 = undefined;
                tablero$$[j].style.border = "none";
                fightButton$$.remove();
            } else if (clicks == 2 && j == jugador2){ //si teniendo los dos seleccionados clickas en el segundo, se deselecciona
                clicks--;
                jugador2 = undefined;
                tablero$$[j].style.border = "none";
                fightButton$$.remove();
            };
        });
    };

    function fight(){
        fightButton$$.remove();
        presentacion$$.innerHTML = "";
//creacion de div de luchador1
        const jugador1$$ = document.createElement('div');
        jugador1$$.innerHTML = `<img src="${characters[jugador1].avatar}">
                                <h4>${characters[jugador1].name}</h4>
                                <h4>ATRIBUTOS</h4>
                                <h5>DAÑO: ${characters[jugador1].damage.join(" ")}</h5>
                                <h5>CRITICO: ${characters[jugador1].critic}</h5>
                                <h5>DEFENSA: ${characters[jugador1].defense}</h5>
                                <h5>VIDA: ${characters[jugador1].vitality}</h5>`;
        jugador1$$.classList.add("jugadores");
        presentacion$$.appendChild(jugador1$$);
//creacion del div de la vida de luchador1
        const marcadorJ1$$ = document.createElement('div');
        const vidaJ1$$ = document.createElement('h3');
        vidaJ1$$.innerText = `VIDA \n ${characters[jugador1].vitality}`;
        vidaJ1$$.classList.add('marcador');
        marcadorJ1$$.appendChild(vidaJ1$$);
        presentacion$$.appendChild(marcadorJ1$$);
//creacion del div del combate
        const combate$$ = document.createElement('div');
        combate$$.classList.add("combate");
        presentacion$$.appendChild(combate$$);
//creacion del div de la vida del luchador2
        const marcadorJ2$$ = document.createElement('div');
        const vidaJ2$$ = document.createElement('h3');
        vidaJ2$$.innerText = `VIDA \n ${characters[jugador2].vitality}`;
        vidaJ2$$.classList.add('marcador');
        marcadorJ2$$.appendChild(vidaJ2$$);
        presentacion$$.appendChild(marcadorJ2$$);
//creacion del div de luchador2
        const jugador2$$ = document.createElement('div');
        jugador2$$.innerHTML = `<img src="${characters[jugador2].avatar}">
                                <h4>${characters[jugador2].name}</h4>
                                <h4>ATRIBUTOS</h4>
                                <h5>DAÑO: ${characters[jugador2].damage.join(" ")}</h5>
                                <h5>CRITICO: ${characters[jugador2].critic}</h5>
                                <h5>DEFENSA: ${characters[jugador2].defense}</h5>
                                <h5>VIDA: ${characters[jugador2].vitality}</h5>`;
        jugador2$$.classList.add("jugadores");
        presentacion$$.appendChild(jugador2$$);

        const marcadores$$ = document.querySelectorAll(".marcador");//array para tener acceso a los marcadores de vida de los luchadores
        let luchador1 = Object.assign( {}, characters[jugador1]);//variables creadas para no alterar los objetos ORIGINALES
        let luchador2 = Object.assign( {}, characters[jugador2]);
        let luchadores = [luchador1, luchador2];//array para tener acceso a las estadisticas de los luchadores
       
        let turno = tirarDado(2)-1; //turno aleatorio(0 ó 1)
     
        combate$$.innerText = "";

        ataque();

        function ataque() {
            let daño = 0;
            combate$$.innerText += `Ataca ${luchadores[turno].name}: `;
            for (let k = 0; k < luchadores[turno].damage.length; k++) {
               let dados = luchadores[turno].damage[k].split("d"); //separamos el numero de dados y el numero de caras
                for (let h = 0; h < parseInt(dados[0]); h++) {//numero de veces que se tira el dado
                    let tirada = tirarDado(parseInt(dados[1]));//numero de caras que tiene el dado
                    combate$$.innerText += `+${tirada} `;
                    if (tirada == luchadores[turno].critic){
                        combate$$.innerText += ` * 2`;
                        tirada = tirada * 2; // si es critico se multiplica por dos
                        combate$$.innerText += ` = ${tirada}`;
                    }
                    daño = daño + tirada;
                };
            };
            combate$$.innerText += ` = ${daño}`;
            combate$$.innerText += ` - Defensa (${luchadores[1-turno].defense})`; //1-turno es el defensor en todos los turnos
            daño = daño - luchadores[1-turno].defense;
            combate$$.innerText += ` = ${daño} \n`;
        
            luchadores[1-turno].vitality = luchadores[1-turno].vitality - daño;
            marcadores$$[1-turno].innerText = `VIDA \n ${luchadores[1-turno].vitality}`;

            setTimeout(()=> {
                if (luchadores[1-turno].vitality > 0){//si el defensor sigue con vida cambia el turno y se repite la funcion ataque
                    turno = 1 - turno;
                    ataque();
                } else { //si el defensor esta muerto aparece el boton reset y se informa del ganador del combate
                    combate$$.innerText += `\n ${luchadores[turno].name.toUpperCase()} HA GANADO EL COMBATE!`;
                    resetButton$$ = document.createElement('button');
                    resetButton$$.innerText = "RESET GAME";
                    resetButton$$.addEventListener('click', charactersF);
                    document.body.appendChild(resetButton$$);
                };
            },1000);//cada turno dura un segundo
        };
    };
};

charactersF();

function tirarDado(n){
    return Math.floor(Math.random()*n)+1; //devuelve un numero aleatorio entre 1 y n
}

