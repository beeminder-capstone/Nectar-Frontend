/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectMetricPage } from '../select-metric/select-metric';

import { User } from '../../providers/user';

import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

declare var window: any;

@Component({
	selector: 'page-connect-integration',
	templateUrl: 'connect-integration.html'
})

export class ConnectIntegrationPage {
	constructor(public navCtrl: NavController, public user: User, @Inject(EnvVariables) public envVariables) { }
	providers: any;
	searchproviders: any;
	providersbackend: any;


	ionViewWillEnter() {
		this.user.setnectarUser();

		this.providersbackend = this.user.getIntergrations();

		this.providers = [];

		for (let provider of this.providersbackend) {
			let temp = this.user.getProvider(provider.name);

			let style = this.user.getIntergrationStatus(temp) == true ? 'logo' : 'logo greyed';

			let aprovider = {
				name: provider.name,
				metrics: provider.metrics,
				title: temp.title,
				url: temp.url,
				style: style
			};

			this.providers.push(aprovider);
		}

		this.searchproviders = this.providers;
	}

	selectIntegration(baseUrl, integration) {
		//if user isn't logged in, open oauth page
		if (!this.user.getIntergrationStatus(integration)) {
			//open oauth page
			this.IntegrationLogin(baseUrl, integration.name).catch(() => {
				alert('You must login to ' + integration.title + ' before you can create a new goal. If you are having issues, try logging in at: ' + baseUrl + '/credentials/new?provider_name=' + integration.name + '.');
				this.navCtrl.pop();
				return;
			});
			//once they login, continue to the metric page
		}

		if (integration.metrics == null) {
			integration.metrics = [];
		}

		this.navCtrl.push(SelectMetricPage, {
			integration: integration
		});
	}

	public IntegrationLogin(baseUrl, integrationTitle): Promise<any> {
		return new Promise(function (resolve, reject) {
			let browserRef = window.cordova.InAppBrowser.open(baseUrl + '/credentials/new?provider_name=' + integrationTitle, "_blank", "location=no");

			browserRef.addEventListener("loadstart", (event) => {
				if ((event.url).indexOf(baseUrl + '/credentials/' + integrationTitle) === 0) {
					browserRef.close();
					resolve();
				}
			});

			browserRef.addEventListener("exit", function (event) {
				reject();
			});
		});
	}

	getItems(ev: any) {
		this.searchproviders = this.providers;

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.searchproviders = this.searchproviders.filter((item) => {
				return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

}
