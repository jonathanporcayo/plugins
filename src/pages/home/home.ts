import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import {Camera, CameraOptions} from '@ionic-native/camera';

import { Geolocation } from '@ionic-native/geolocation';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 
  pdfObj = null;


  public photos : any;
  public base64Image : string;

  latitude:number ;
  longitude:number ;
 
 
  constructor( public sqlite: SQLite
,    public geolocation: Geolocation,private camera: Camera,private barcodeScanner: BarcodeScanner,public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }
 


  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
 
  scan() {
 
    this.barcodeScanner.scan().then((barcodeData) => {

      alert(barcodeData.text);
    })
  }


  takePhoto() {
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }
  getlocalizacion(){
 
    this.geolocation.getCurrentPosition().then(position =>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      alert( this.latitude +"/////"+ this.longitude );
  },error=>{
      console.log('error',error);
  });

  }



  

}