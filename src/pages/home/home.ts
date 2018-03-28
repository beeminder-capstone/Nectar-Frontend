/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, MenuController, LoadingController, ModalController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { GoalDetailsPage } from '../goal-details/goal-details';
import { GoalFilterPage } from '../goal-filter/goal-filter';
import { AddGoalPage } from '../add-goal/add-goal';
import { EditGoalPage } from '../edit-goal/edit-goal';
import { EditIntegrationPage } from '../edit-integration/edit-integration';
import { User } from './../../providers/user';
import { NetworkService } from '../../providers/network-service';
import { TimerComponent } from '../timer/timer';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	@ViewChildren(TimerComponent) timer: QueryList<TimerComponent>;

	icons: string[];
	goals: any = [];
	filtergoals: any = [];
	searchgoals: any = [];
	username: string;
	filters: Array<{ title: string, name: string, isChecked: boolean }> = [
		{ title: "Frontburner Goals", name: "frontburner", isChecked: true },
		{ title: "Backburner Goals", name: "backburner", isChecked: true },
		{ title: "Manual Goals", name: "manual", isChecked: true },
		{ title: "Integration Goals", name: "integration", isChecked: true }
	];

	constructor(public navCtrl: NavController, public menu: MenuController, public loading: LoadingController, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public storage: Storage, private speechRecognition: SpeechRecognition, private user: User, private networkService: NetworkService) {
		this.menu.swipeEnable(true);

		this.storage.get('username').then((value) => {
			this.username = value;
		});
	}

	ngOnInit() {
		this.user.setnectarUser();

		let loader = this.loading.create({
			content: 'Loading&hellip;',
		});

		loader.present().then(() => {
			this.user.getUser().subscribe((auser) => {
				this.goals = [];

				for (let goal of auser.goals) {
					this.user.getGoal(goal).subscribe((agoal) => {
						agoal.integration = this.user.getIntergration(agoal);
						agoal.icon = agoal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + agoal.integration + ".png";

						this.goals.push(agoal);
					}, err => {
						if (err) {
							console.error(err);
						}
					});
				}

				this.filtergoals = this.searchgoals = this.goals;
			}, err => {
				if (err) {
					console.error(err);
					alert('An error occurred getting your Beeminder goals: ' + JSON.stringify(err) + '.');
				}
			}, () => {
				loader.dismiss();
			});
		});
	}

	itemTapped(goal) {
		this.navCtrl.push(GoalDetailsPage, { goal: goal });
	}

	itemPressed(goal) {
		if (goal.integration == null) {
			let actionSheet = this.actionSheetCtrl.create({
				title: goal.slug,
				buttons: [
					{
						text: 'Edit Beeminder Goal',
						handler: () => {
							if (this.networkService.noConnection())
								this.networkService.showNetworkAlert();

							this.navCtrl.push(EditGoalPage, { goal: goal });
						}
					},
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							//console.log('Cancel clicked');
						}
					}
				]
			});

			actionSheet.present();
		} else {
			let integrationgoal = this.user.getIntergrationGoal(goal);
			let integration = 'Integration: ' + this.user.getProvider(goal.integration).title;
			let metric = 'Metric: ' + this.user.getMetric(goal.integration, integrationgoal.metric_key).title;

			let actionSheet = this.actionSheetCtrl.create({
				title: goal.slug,
				buttons: [
					{
						text: 'Edit Beeminder Goal',
						handler: () => {
							if (this.networkService.noConnection())
								this.networkService.showNetworkAlert();

							this.navCtrl.push(EditGoalPage, { goal: goal });
						}
					},
					{
						text: 'Edit Integration',
						handler: () => {
							if (this.networkService.noConnection())
								this.networkService.showNetworkAlert();

							this.navCtrl.push(EditIntegrationPage, { goal: goal, integration: integration, metric: metric });
						}
					},
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							//console.log('Cancel clicked');
						}
					}
				]
			});

			actionSheet.present();
		}
	}

	presentFilter() {
		this.filtergoals = this.goals;

		let modal = this.modalCtrl.create(GoalFilterPage, this.filters);
		modal.present();

		modal.onWillDismiss((data: any[]) => {
			if (data) {
				this.filters = data;

				let frontburner = this.filters.find(f => f.name == "frontburner").isChecked;
				let backburner = this.filters.find(f => f.name == "backburner").isChecked;
				let manual = this.filters.find(f => f.name == "manual").isChecked;
				let integration = this.filters.find(f => f.name == "integration").isChecked;

				this.filtergoals = this.filtergoals.filter((item) => {
					if (item.burner == "frontburner" && !frontburner)
						return false;
					else if (item.burner == "backburner" && !backburner)
						return false;
					else if (item.integration == null && !manual)
						return false;
					else if (item.integration != null && !integration)
						return false;

					return true;
				});

				this.searchgoals = this.filtergoals;
			}
		});

	}

	getItems(ev: any) {
		this.searchgoals = this.filtergoals;

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.searchgoals = this.searchgoals.filter((item) => {
				return (item.slug.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
		}
	}

	reload(goal: any) {
		this.user.getGoal(goal.slug).subscribe((data) => {
			goal = data;

			goal.integration = this.user.getIntergration(goal);
			goal.icon = goal.integration == null ? "assets/Nectar Logo/nectar.svg" : "assets/logos/" + goal.integration + ".png";

			let index = this.filtergoals.findIndex(g => g.slug == goal.slug);
			this.goals[index] = goal;

			let filter = this.filtergoals.findIndex(g => g.slug == goal.slug);

			if (filter > -1)
				this.filtergoals[filter] = goal;

			let search = this.searchgoals.findIndex(g => g.slug == goal.slug);

			if (search > -1)
				this.searchgoals[search] = goal;
		}, err => {
			if (err) {
				console.error(err);
			}
		});
	}

	voiceCommand() {
		// Check feature available
		this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
			if (!available) {
				alert('Voice commands are not available.');
				return;
			}

			// Check permission
			this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
				if (hasPermission) {
					this.startRecognition();
				} else {
					// Request permissions
					this.speechRecognition.requestPermission().then(() => {
						this.startRecognition();
					}, () => {
						alert('Speech recognition permission is required.');
					});
				}
			});
		});
	}

	startRecognition() {
		// Start the recognition process
		this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
			for (let match of matches) {
				if (match && match.trim() != '') {
					match = match.toLowerCase();

					if ('create goal' == match) {
						this.addGoal();
						return;
					} else if (RegExp(/^add [0-9]+(\.[0-9]+)? to [a-z0-9\-]+$/i).test(match)) {
						let split = match.split(" ");

						let goal = this.goals.find(g => g.slug == split[3]);

						if (goal) {
							let value = parseFloat(split[1]).toString();

							this.user.addDatapointPromptConfirm(goal, value, (goal: any) => { this.reload(goal); });
						} else {
							alert('The Beeminder goal ' + split[3] + ' does not exist.');
						}

						return;
					}
				}
			}

			alert('The voice command is not valid.');
		}, (onerror) => {
			//alert('An error occurred during speech recognition: ' + onerror);
			console.error(onerror);
		});
	}

	addGoal() {
		this.navCtrl.setRoot(AddGoalPage);
	}
}
