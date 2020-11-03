import { Component } from '@angular/core';
import * as math from '../../../math.min.js';
import firebase from 'firebase';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public recent: string[];
  public calc: string;
  public sol: string;
  public history: string[];
  private checkChange: any;
  constructor(public bgMode: BackgroundMode) {
    this.recent = [];
    firebase.database().ref('last10/').once("value", (snap)=> {
      snap.forEach((shot) => {
        this.recent.push(shot.val());
      });
    });
    this.checkChange = interval(500).subscribe(() => {
      firebase.database().ref('last10/').once("child_changed", (snap)=> {
        //this.recent = [];
        console.log(snap.val());
        if(snap.val() != this.recent[0]) {
          if(this.recent.unshift(snap.val())>10) {
            this.recent.pop();
          }
        }
      });
    });
    this.calc = "";
    this.sol = "";
    this.history = [];
  }
  press0() {
    this.calc += "0";
  }
  press1() {
    this.calc += "1";
  }
  press2() {
    this.calc += "2";
  }
  press3() {
    this.calc += "3";
  }
  press4() {
    this.calc += "4";
  }
  press5() {
    this.calc += "5";
  }
  press6() {
    this.calc += "6";
  }
  press7() {
    this.calc += "7";
  }
  press8() {
    this.calc += "8";
  }
  press9() {
    this.calc += "9";
  }
  pressDec() {
    this.calc += ".";
  }
  pressEquals() {
    try {
      if(this.calc != "") {
        this.sol = math.evaluate(this.calc);
        let totCal: string = this.calc+" = "+this.sol;
        this.recent = [];
        firebase.database().ref('last10/').once("value", (snap)=> {
          snap.forEach((shot) => {
            this.recent.push(shot.val());
          });
          if(this.recent.unshift(totCal)>10) {
            this.recent.pop();
          }
          console.log(this.recent);
          var updates = {};
          updates['last10'] = this.recent;
          firebase.database().ref().update(updates);
          this.history.push(totCal);
          this.calc = "";
          // console.log(this.history);
        });
      } else {
        alert("Empty Expression");
      }
    }
    catch(e) {
      alert(e);
      this.history.push(this.calc+" = Error");
      this.calc = "";
    }
  }
  pressDivide() {
    this.calc += " / ";
  }
  pressMultiply() {
    this.calc += " * ";
  }
  pressSubtract() {
    this.calc += " - ";
  }
  pressAdd() {
    this.calc += " + ";
  }
}
