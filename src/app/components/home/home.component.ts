import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  url = 'http://localhost:5000/ports';
  random = 0;
  desblo = false;
  hardware = false;
  modal = false;
  infoButon = 'Comenzar';
  infoButon2 = 'Comenzar';
  ports: any;
  puertoElegido: string;

  constructor(private http: HttpClient) { }

  fondos = [
    {
      img: 'https://images4.alphacoders.com/848/848687.png',
      info: 'CanSat UD - The best simulation in the world'
    },
    {
      img: 'https://i.pinimg.com/originals/69/bb/2b/69bb2bb47af7044aec809cc4e62997e1.jpg',
      info: 'Desarrollado por la Universidad Distrital FJC'
    },
    {
      img: 'https://img.wallpapersafari.com/desktop/1920/1080/97/63/Hv4kZr.jpg',
      info: 'Modo de simulacion con datos aleatorios y modo real conectado con Hardware'
    }
  ];

  infodatos = [
    {
      nombre: 'Velocidad',
      img: './src/assets/img/Velocidad.png',
      info: 'Se registra cada 0.5 segundos la velocidad que lleva el cohete, en caso que la velocidad que se analice no tenga logica se dara la respectiva alerta.'
    },
    {
      nombre: 'Aceleración',
      img: './src/assets/img/Aceleracion.png',
      info: 'Las aceleraciones que va presentando el cohete en las tres dimensiones'
    },
    {
      nombre: 'Altura',
      img: './src/assets/img/Altura.png',
      info: 'Se grafica la altura que va alcanzado el cohete cada 0.5 segundos'
    },
    {
      nombre: 'Temperatura',
      img: './src/assets/img/Temperatura.png',
      info: 'La temperatura que va registrando el dispositivo, obtenida mediante sensores.'
    },
    {
      nombre: 'Tiempo',
      img: './src/assets/img/Tiempo.png',
      info: 'Se registra el tiempo de toda la simulación desde su inicio hasta finalizar.'
    },
    {
      nombre: 'Giroscopio',
      img: './src/assets/img/Giroscopio.png',
      info: 'Los datos de orientacion del dispositivo en el espacio de representan mediante un gráfico en tres dimensiones.'
    }
  ];

  ngOnInit(): void {
    console.log(this.httpGetPorts(this.url));
  }


  httpGetPorts(theUrl){
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open( 'GET', theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      this.ports = xmlHttp.responseText;
      console.log(typeof(xmlHttp.responseText));
      return xmlHttp.responseText;
  }

  imagen() {
    return this.fondos[2].img;
  }

  generar() {
    this.random++;
    if (this.random >= 3) {
      this.random = 0;
    }
  }

  toSimul(){
    document.getElementById('seccion1').scrollIntoView({behavior: 'smooth'});
    document.getElementById('prueba').style.border = '2px ridge #ffffff';
    document.getElementById('prueba').className += ' animated infinite pulse slowe';
  }

  toHard(){
    document.getElementById('seccion2').scrollIntoView({behavior: 'smooth'});
    document.getElementById('prueba2').style.border = '2px ridge #ffffff';
    document.getElementById('prueba2').className += ' animated infinite bounce slow';
  }

  change(){
    this.desblo = !this.desblo;
    const boton = document.getElementById('prueba2') as HTMLButtonElement;
    boton.disabled = true;
    if (this.desblo){
      this.infoButon = 'Ocultar';
    }else{
      this.infoButon = 'Comenzar';
      boton.disabled = false;
    }
  }

  change2(){
    this.hardware = !this.hardware;
    const boton = document.getElementById('prueba') as HTMLButtonElement;
    const sele = document.getElementById('sel');
    sele.style.display = 'block';
    boton.disabled = true;
    this.cargaPorts();
    if (this.hardware){
      this.infoButon2 = 'Ocultar';
    }else{
      this.infoButon2 = 'Comenzar';
      boton.disabled = false;
      sele.style.display = 'none';
    }
  }

  cargaPorts(){
    const select = document.getElementById('puertos');
    const divi = this.ports.split(',');

    for(let d of divi) {
      const com = d.substr(2, 5);
      const option = document.createElement('option');
      option.value = com;
      option.innerHTML = com;

      select.appendChild(option);
    }
  }

  seleccionPuerto(){
    const sel = document.getElementById('puertos') as HTMLSelectElement;
    this.puertoElegido = sel.value;

    if(this.puertoElegido !== undefined && this.puertoElegido !== ''){
      console.log(this.puertoElegido);
      window.localStorage.setItem('puertoElegido', this.puertoElegido);
    }
  }

}


