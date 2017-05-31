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
		this.initTimer();
		
		setTimeout(() => {
			this.startTimer();
		}, 1000)
	}
 
	hasFinished() {
		return this.timer.hasFinished;
	}
 
	initTimer() {
		if(!this.timeInSeconds) { this.timeInSeconds = 0; }
 
		this.timer = <ITimer>{
			seconds: this.timeInSeconds,
			runTimer: false,
			hasStarted: false,
			hasFinished: false,
			secondsRemaining: this.timeInSeconds
		};
 
		this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
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
		setTimeout(() => {
			if (!this.timer.runTimer) { return; }
			this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
			this.timerTick();
		}, 1000);
	}
 
	getSecondsAsDigitalClock(inputSeconds: number) {
		let t = Math.floor(new Date().getTime() / 1000);
		
		var sec_num = parseInt(inputSeconds.toString(), 10) - t; // don't forget the second param
		var days = Math.floor(sec_num / 86400);
		var hours = Math.floor((sec_num % 86400) / 3600);
		var minutes = Math.floor((sec_num % 86400 % 3600) / 60);
		var seconds = sec_num % 86400 % 3600 % 60;
		var stringtop = '';
		var stringbottom = '';
		if(days > 0) {
			stringtop = days.toString() + 'd';
			stringbottom = hours.toString() + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's';
		}
		else if(hours > 0) {
			stringtop = hours.toString() + 'h';
			stringbottom = minutes.toString() + 'm ' + seconds.toString() + 's';
		}
		else if(minutes > 0) {
			stringtop = minutes.toString() + 'm';
			stringbottom = seconds.toString() + 's';
		}
		else if(seconds > 0)
			stringtop = seconds.toString() + 's';
		this.timer.displayTimetop = stringtop;
		this.timer.displayTimebottom = stringbottom;
	}
	
}