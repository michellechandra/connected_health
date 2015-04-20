/*
 Standalone Sketch to use with a Arduino Fio and a
 Sharp Optical Dust Sensor GP2Y1010AU0F

 Blog: http://arduinodev.woofex.net/2012/12/01/standalone-sharp-dust-sensor/
 Code: https://github.com/Trefex/arduino-airquality/

 For Pin connections, please check the Blog or the github project page
 Authors: Cyrille Médard de Chardon (serialC), Christophe Trefois (Trefex)
 Changelog:
   2012-Dec-01:  Cleaned up code

 This work is licensed under the
 Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
 To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/
 or send a letter to Creative Commons, 444 Castro Street, Suite 900,
 Mountain View, California, 94041, USA.
*/

int measurePin = 0;
int ledPower = 12;

int samplingTime = 280;
int deltaTime = 40;
int sleepTime = 9680;

float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;

void setup() {
  Serial.begin(9600);
  pinMode(ledPower, OUTPUT);
  Serial.setTimeout(10);

}

void loop() {
  while (Serial.available()) {

    // 0 - 3.3V mapped to 0 - 1023 integer values
    // recover voltage
    calcVoltage = voMeasured * (3.3 / 1024.0);

    // linear equation taken from http://www.howmuchsnow.com/arduino/airquality/
    // Chris Nafis (c) 2012
    dustDensity = 0.17 * calcVoltage - 0.1;

    int channel = Serial.parseInt();

    if (channel >= 0 && channel < 12 ) {
      int sensor1 = digitalWrite(channel, LOW); // power on the LED
      delayMicroseconds(samplingTime);

      delayMicroseconds(deltaTime);
      digitalWrite(channel, HIGH); // turn the LED off
      delayMicroseconds(sleepTime);

      int sensor2  = analogRead(channel); // read the dust value
      
      Serial.println(calcVoltage);

      //  Serial.print("Raw Signal Value (0-1023): ");
     // Serial.println(sensor2);

      //  Serial.print(" - Voltage: ");
      //Serial.println(sensor1);

       //Serial.print(" - Dust Density: ");
        //Serial.println(dustDensity);

        delay(1000);
    }
  }
}
