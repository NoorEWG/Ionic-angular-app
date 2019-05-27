import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(
    private bluetoothSerial:  BluetoothSerial 
    ) {}

  getBluetoothDevices() {
    let list = this.bluetoothSerial.list;
    // console.log(JSON.stringify(list));
    return list;
  }

  getBluetoothData(macAddress: string) {
    this.bluetoothSerial.connectInsecure(macAddress).subscribe((data) =>{
      console.log(JSON.stringify(data));
      //this.bluetoothSerial.subscribeRawData().subscribe((data) => { alert("Subscription : " + JSON.stringify(data))});
      });
  }
}
