import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Cohete } from '../cohete/interface';
import * as $ from 'jquery';
import { LfmapComponent } from '../lfmap/lfmap.component';

@Component({
  providers: [LfmapComponent],
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit, Cohete {

  /* Intervalo para hacer update al ChartJs */
  private intervalUpdate: any = null;
  /* Objetos Chart de tipo any*/
  public chart: any = null;
  public chart2: any = null;
  public chart3: any = null;
  public chart4: any = null;
  public chart5: any = null;
  public map: any;
  public comMap: any;
  /* Los atributos a graficar que extienden de la clase Cohete */
  constructor(private com: LfmapComponent) {
    this.comMap = com;
  }
  // Variables de eventos
  iniciarS = true;
  infoBut1 = 'Iniciar simulación';
  infoBut2 = 'Pausar simulación';
  pausa = true;
  serverInicio = false;
  csv = false;
  // Atributos cohete
  latitud: number;
  longitud: number;
  altitud: number;
  falling: number;
  temperatura: number;
  presionB: number;
  pitch: number;
  roll: number;
  yaw: number;
  acelX: number;
  acelY: number;
  acelZ: number;
  velocidad: number;

  tempMark: any;
  bateria = 100;
  caidaLibre = 'NO';
  puerto: string;

  ngOnInit(): void {
    this.puerto = window.localStorage.getItem('puertoElegido');
    console.log('El puerto serial es: ' + this.puerto);
    // Inicializacion del intervalo
    this.intervalUpdate = setInterval(function() {
      this.MostrarDatos();
    }.bind(this), 500);
    // Se crea la instacia del Chart con sus caracteristicas
    this.chart = new Chart('Altura', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Altura (m)',
            fill: false,
            data: [],
            backgroundColor: '#fff',
            borderColor: '#1AA43E'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.chart2 = new Chart('Temperatura', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperatura (°C)',
            fill: false,
            data: [],
            backgroundColor: '#fff',
            borderColor: '#1AA43E'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.chart3 = new Chart('Aceleracion', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'X (m/s²)',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          },
          {
            label: 'Y (m/s²)',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#CF70B7'
          },
          {
            label: 'Z (m/s²)',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#FFC14F'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.chart4 = new Chart('PresionB', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Presion Barometrica (mb)',
            fill: false,
            data: [],
            backgroundColor: '#727272',
            borderColor: '#1AA43E'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.chart5 = new Chart('Giro', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Elevación (pitch)',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          },
          {
            label: 'Dirección (Yaw)',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#CF70B7'
          },
          {
            label: 'Alabeo (Roll)',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#FFC14F'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.map = this.comMap.start();
    const x1 = 4.6283892;
    const y1 = -74.0654286;
    this.comMap.addPoint(this.map, x1, y1);
    this.batery();
  }

  /* Se destruye el intervalo */
  // tslint:disable-next-line:use-lifecycle-interface
  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

  /* Funcion que imprime los datos al ChartJS o graficas */
  private MostrarDatos(): void {
    let horaChart: any = new Date();
    // Se obtiene la hora cada segundo
    horaChart = horaChart.getHours() + ':'
      + ((horaChart.getMinutes() < 10) ? '0' + horaChart.getMinutes() : horaChart.getMinutes()) + ':'
      + ((horaChart.getSeconds() < 10) ? '0' + horaChart.getSeconds() : horaChart.getSeconds());
    // Se le pasa a la grafica la hora
    if (!this.iniciarS) {
      this.chart.data.labels.push(horaChart);
      this.chart2.data.labels.push(horaChart);
      this.chart3.data.labels.push(horaChart);
      this.chart4.data.labels.push(horaChart);
      this.chart5.data.labels.push(horaChart);
    }

    if (this.chart.data.labels.length > 15) {
      this.chart.data.labels.shift();
      this.chart.data.datasets[0].data.shift();
      this.chart2.data.labels.shift();
      this.chart2.data.datasets[0].data.shift();
      this.chart3.data.labels.shift();
      this.chart3.data.datasets[0].data.shift();
      this.chart3.data.datasets[1].data.shift();
      this.chart3.data.datasets[2].data.shift();
      this.chart4.data.labels.shift();
      this.chart4.data.datasets[0].data.shift();
      this.chart5.data.labels.shift();
      this.chart5.data.datasets[0].data.shift();
      this.chart5.data.datasets[1].data.shift();
      this.chart5.data.datasets[2].data.shift();
    }
    // Se le envia al chart la data
    this.chart.data.datasets[0].data.push(this.altitud);
    this.chart2.data.datasets[0].data.push(this.temperatura);
    this.chart3.data.datasets[0].data.push(this.acelX);
    this.chart3.data.datasets[1].data.push(this.acelY);
    this.chart3.data.datasets[2].data.push(this.acelZ);
    this.chart4.data.datasets[0].data.push(this.presionB);
    this.chart5.data.datasets[0].data.push(this.pitch);
    this.chart5.data.datasets[1].data.push(this.yaw);
    this.chart5.data.datasets[2].data.push(this.roll);
    if (this.serverInicio){
      if (this.tempMark !== undefined) {
        this.com.removeMark(this.map, this.tempMark);
      }
      this.tempMark = this.comMap.addPoint(this.map, this.latitud, this.longitud);
    }
    // Se hace el update esto sucede cada 0.5 segundos
    this.chart.update();
    this.chart2.update();
    this.chart3.update();
    this.chart4.update();
    this.chart5.update();
  }


  /* Metodo para conectarse al Servidor por medio del protocolo TCP*/
  ConexionServer() {
    // Se declara un nuevo Socket donde se le pasa el IP del server y el puerto
    const socket = new WebSocket('ws://localhost:3000');
    this.serverInicio = true;
    // Se abre el Socket para conectarse al servidor
    socket.onopen = () => {
      // Prueba de envio de informacion al servidor
      socket.send('COM5');
    };
    // Evento que me retorna la informacion del servidor
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      this.altitud = data.Altitude;
      this.temperatura = data.Temperature_1;
      this.acelX = data.Accelerometer_X;
      this.acelY = data.Accelerometer_Y;
      this.acelZ = data.Accelerometer_Z;
      this.presionB = data.Barometric_Pressure;
      this.velocidad = data.Accelerometer_Y + (data.Accelerometer_Y / 2);
      this.longitud = data.longitude;
      this.latitud = data.latitude;
      this.pitch = data.pitch;
      this.roll = data.rueda;
      this.yaw = data.yaw;
      this.bateria = this.bateria - 0.5;
      this.velox(this.velocidad);
    };
    // Si el socket se cierra se envia la alerta de conexion perdida con el servidor
    socket.onclose = () => {
      // alert('Conexion perdida o cerrada');
    };
  }

  cambioS() {
    // Se carga de primeras la conexion al servidor
    this.ConexionServer();
    this.infoBut1 = 'Nueva simulación';
    this.iniciarS = !this.iniciarS;
    const inicio = document.getElementById('start') as HTMLInputElement;
    inicio.checked = true;
    this.csv = false;
  }

  cambioP() {
    const stop = document.getElementById('stop') as HTMLInputElement;
    const reinicio = document.getElementById('start') as HTMLInputElement;
    if (this.pausa) {
      this.infoBut2 = 'Reanudar simulación';
      this.pausa = !this.pausa;
      stop.checked = true;
    } else {
      this.infoBut2 = 'Pausar simulación';
      this.pausa = !this.pausa;
      reinicio.checked = true;
    }
  }

  nuevaSimu() {
    const stop = document.getElementById('stop') as HTMLInputElement;
    this.iniciarS = !this.iniciarS;
    stop.checked = true;
    this.serverInicio = false;
    this.csv = true;
    setTimeout(this.reini, 2000);
  }

  reini() {
    const fin = document.getElementById('reset') as HTMLInputElement;
    fin.click();
  }

  velox(velo: number) {
    let spdvalue = velo;

    const initDegree = -120;
    const lastDegree = 120;
    let rotateDeg;
    if (spdvalue <= 120) {
      rotateDeg = initDegree + Math.round(spdvalue);
    } else if (spdvalue > 120 && spdvalue < 240) {
      rotateDeg = Math.round(spdvalue) - lastDegree;
    } else {
      spdvalue = 0;
    }

    $('#sui').css('-webkit-transform', 'rotate(-120deg)');
    $('#sui').css({
      transition: 'transform 3s',
      transform: 'rotate(' + rotateDeg + 'deg)'
    });
    $('#SUICIRCLE').css({
      transition: 'transform 3s',
      transform: 'rotate(' + rotateDeg + 'deg)'
    });
    setTimeout(() => { $('#sui').css({ transition: 'none' }); }, 3000);
    setTimeout(() => { $('#SUICIRCLE').css({ transition: 'none' }); }, 3000);

    // tslint:disable-next-line:no-shadowed-variable
    (($) => {
      $.fn.countTo = function(options) {
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // tslint:disable-next-line: one-variable-per-declaration
        const loops = Math.ceil(options.speed / options.refreshInterval),
          increment = (options.to - options.from) / loops;

        return $(this).each(function() {
          const _THIS = this;
          let loopCount = 0;
          let value = options.from;
          const interval = setInterval(updateTimer, options.refreshInterval);

          function updateTimer() {
            value += increment;
            loopCount++;
            $(_THIS).html(value.toFixed(options.decimals));

            if (typeof (options.onUpdate) === 'function') {
              options.onUpdate.call(_THIS, value);
            }

            if (loopCount >= loops) {
              clearInterval(interval);
              value = options.to;

              if (typeof (options.onComplete) === 'function') {
                options.onComplete.call(_THIS, value);
              }
            }
          }
        });
      };

      $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
      };
    })($);

    // tslint:disable-next-line: no-shadowed-variable
    $(($) => {
      $('.speedplus').countTo({
        from: 0,
        to: spdvalue,
        speed: 150,
        refreshInterval: 20,
        onComplete(value) {
          // tslint:disable-next-line: no-console
          console.debug(this);
        }
      });
    });
  }
  batery() {
    const progressbar = $('#progressbar');
    const max = progressbar.attr('max');
    const time = 1800;

    const loading = () => {
      // tslint:disable-next-line:no-shadowed-variable
      // Aca en value se variando segun el valor que llegue xd
      const value = this.bateria;
      const addValue = progressbar.val(value);
      $('.progress-value').html(value + '%');

      if (value === max) {
        clearInterval(animate);
        $('.battery-top').animate({
          backgroundColor: '#1AA43E'
        }, {
          duration: 1800,
          complete() {
            $(progressbar).after('<span class="bolt"><img src="https://lh3.googleusercontent.com/-E0iV9FqcfF8/UxO28lt_LcI/AAAAAAAAAP4/cy7nW4s8Y9Y/s64-no/lightning.png" alt=""></span>');
          }
        });
      }

    };

    const animate = setInterval(() => {
      loading();
    }, time);
  }

  reload(){
    window.location.reload();
  }
}
