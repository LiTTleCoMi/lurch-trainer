import { Component, inject, OnInit } from '@angular/core';
import { Overlay } from '../../components/overlay/overlay';
import { Strafes } from '../../interfaces/strafes.interface';
import { StrafesService } from '../../services/strafes.service';
import { Popup } from '../../components/popup/popup';
import { PopupPages } from '../../interfaces/popup-pages.interface';
import { InputService } from '../../services/input.service';
import { TrainerManagerService } from '../../services/trainer-manager.service';
import { LurchDirection } from '../../components/lurch-direction/lurch-direction';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-lurch-trainer',
	imports: [Overlay, Popup, LurchDirection, NgClass],
	templateUrl: './lurch-trainer.html',
	styleUrl: './lurch-trainer.scss',
})
export class LurchTrainer implements OnInit {
	private strafesService = inject(StrafesService);
	private inputService = inject(InputService);
	protected trainerManagerService = inject(TrainerManagerService);

	strafes: Strafes = [];
	protected popupVisible = false;
	protected popupPage: PopupPages = '';

	ngOnInit() {
		this.strafes = this.strafesService.strafes;
		const select = document.getElementById('strafeSelector');

		select?.addEventListener('change', (event) => {
			if (event.target instanceof HTMLSelectElement) {
				this.trainerManagerService.updateSelectedStrafe(event.target.value);
			}
		});
	}

	toggleTraining(event: Event) {
		(event.target as HTMLElement).blur();
		this.trainerManagerService.toggleTraining();
	}
	showPopup(page: PopupPages) {
		this.popupVisible = true;
		this.popupPage = page;
	}
	hidePopup() {
		this.popupVisible = false;
		this.popupPage = '';
		this.inputService.rebindingKey = undefined;
		this.inputService.rebindingScroll = undefined;
	}
}
