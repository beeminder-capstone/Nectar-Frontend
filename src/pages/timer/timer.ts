import { Component, Input } from '@angular/core';
import { ITimer } from './itimer';


@Component({
	selector: 'timer',
	templateUrl: 'timer.html'
})
export class TimerComponent {

	@Input() timeInSeconds: number;
	@Input() square: boolean;
	@Input() rectangle: boolean;
	public timer: ITimer;

	constructor() {
	}

	ngOnInit() {
		let time = new Date().getTime();

		this.initTimer(time);

		setTimeout(() => {
			this.startTimer();
		}, 1000 - (time % 1000))
	}

	hasFinished() {
		return this.timer.hasFinished;
	}

	initTimer(time: number) {
		if (!this.timeInSeconds) { this.timeInSeconds = 0; }

		this.timer = <ITimer>{
			seconds: this.timeInSeconds,
			runTimer: false,
			hasStarted: false,
			hasFinished: false,
			secondsRemaining: parseInt(this.timeInSeconds.toString(), 10)
		};

		this.getSecondsAsDigitalClock(this.timer.secondsRemaining, time);
	}

	startTimer() {
		this.timer.hasStarted = true;
		this.timer.runTimer = true;
		this.timerTick();
	}

	/*pauseTimer() {
		this.timer.runTimer = false;
	}*/

	/*resumeTimer() {
		this.startTimer();
	}*/

	timerTick() {
		let time = new Date().getTime();

		setTimeout(() => {
			if (!this.timer.runTimer) { return; }
			this.getSecondsAsDigitalClock(this.timer.secondsRemaining, time);
			this.timerTick();
		}, 1000 - (time % 1000));
	}

	getSecondsAsDigitalClock(inputSeconds: number, time: number) {
		let t = Math.ceil(time / 1000);

		var sec_num = inputSeconds - t; // don't forget the second param
		var days = Math.floor(sec_num / 86400);
		var hours = Math.floor((sec_num % 86400) / 3600);
		var minutes = Math.floor((sec_num % 86400 % 3600) / 60);
		var seconds = sec_num % 86400 % 3600 % 60;
		var stringtop = '';
		var stringbottom = '';
		if (days > 0) {
			stringtop = days.toString() + 'd';
			stringbottom = hours.toString() + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's';
		}
		else if (hours > 0) {
			stringtop = hours.toString() + 'h';
			stringbottom = minutes.toString() + 'm ' + seconds.toString() + 's';
		}
		else if (minutes > 0) {
			stringtop = minutes.toString() + 'm';
			stringbottom = seconds.toString() + 's';
		}
		else if (seconds > 0)
			stringtop = seconds.toString() + 's';
		this.timer.displayTimetop = stringtop;
		this.timer.displayTimebottom = stringbottom;
	}

}