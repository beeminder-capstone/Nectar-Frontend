import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { IStopwatch } from './istopwatch';
import { User } from './../../providers/user';
 
 
@Component({
	selector: 'page-stopwatch',
	templateUrl: 'stopwatch.html'
})
export class StopwatchPage {
 
	timeInSeconds: number;
	public stopwatch: IStopwatch;
	goal: any;
 
	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private user: User
	) {
		this.goal = this.navParams.data;
	}
 
	ngOnInit() {
		this.initStopwatch();
	}
 
	hasFinished() {
		return this.stopwatch.hasFinished;
	}
 
	initStopwatch() {
		this.timeInSeconds = 0;
 
		this.stopwatch = <IStopwatch>{
			seconds: this.timeInSeconds,
			runTimer: false,
			hasStarted: false,
			hasFinished: false,
			secondsRemaining: this.timeInSeconds
		};
 
		this.getSecondsAsDigitalClock(this.stopwatch.secondsRemaining);
	}
 
	startStopwatch() {
		this.stopwatch.secondsRemaining = Math.floor(new Date().getTime() / 1000) - this.stopwatch.secondsRemaining;
		
		this.stopwatch.hasStarted = true;
		this.stopwatch.runTimer = true;
		this.stopwatchTick();
	}
 
	pauseStopwatch() {
		this.stopwatch.runTimer = false;
		
		let t = Math.floor(new Date().getTime() / 1000);
		this.getSecondsAsDigitalClock(t - this.stopwatch.secondsRemaining);
		this.stopwatch.secondsRemaining = t - this.stopwatch.secondsRemaining;
	}
 
	resumeStopwatch() {
		this.startStopwatch();
	}
 
	stopwatchTick() {
		setTimeout(() => {
			if (!this.stopwatch.runTimer) { return; }
			let t = Math.floor(new Date().getTime() / 1000);
			this.getSecondsAsDigitalClock(t - this.stopwatch.secondsRemaining);
			this.stopwatchTick();
		}, 1000);
	}
 
	getSecondsAsDigitalClock(inputSeconds: number) {
		var sec_num = inputSeconds; // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num % 3600) / 60);
		var seconds = sec_num % 3600 % 60;
		var hoursString = hours.toString();
		var minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
		var secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
		this.stopwatch.displayTime = hoursString + ':' + minutesString + ':' + secondsString;
	}
	
	confirm() {
		this.pauseStopwatch();
		
		let value = (this.stopwatch.secondsRemaining / 3600).toString();

		this.user.addDatapointPromptConfirm(this.goal, value, this.dismiss.bind(this));
	}

	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}
	
}