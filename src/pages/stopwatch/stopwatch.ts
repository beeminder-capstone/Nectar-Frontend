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
		this.stopwatch.secondsRemaining = new Date().getTime() - this.stopwatch.secondsRemaining;

		this.stopwatch.hasStarted = true;
		this.stopwatch.runTimer = true;
		this.stopwatchTick();
	}

	pauseStopwatch() {
		if (this.stopwatch.runTimer) {
			this.stopwatch.runTimer = false;

			let time = new Date().getTime();
			this.getSecondsAsDigitalClock(time - this.stopwatch.secondsRemaining);
			this.stopwatch.secondsRemaining = time - this.stopwatch.secondsRemaining;
		}
	}

	resumeStopwatch() {
		this.startStopwatch();
	}

	stopwatchTick() {
		setTimeout(() => {
			if (!this.stopwatch.runTimer) { return; }
			this.getSecondsAsDigitalClock(new Date().getTime() - this.stopwatch.secondsRemaining);
			this.stopwatchTick();
		}, 1000 - ((new Date().getTime() - this.stopwatch.secondsRemaining) % 1000));
	}

	getSecondsAsDigitalClock(inputSeconds: number) {
		inputSeconds = Math.floor(inputSeconds / 1000);
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

		let value = Math.floor(this.stopwatch.secondsRemaining / 1000);

		if (this.goal.yaxis.indexOf("minutes") > -1 || this.goal.yaxis.indexOf("mins") > -1)
			value = (value / 60);
		else
			value = (value / 3600);

		this.user.addDatapointPromptConfirm(this.goal, value.toString(), (data?: any) => { this.dismiss(data); });
	}

	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}

}