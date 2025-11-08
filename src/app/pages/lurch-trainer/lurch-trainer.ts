import { Component, inject, OnInit } from '@angular/core';
import { Overlay } from '../../components/overlay/overlay';
import { StrafeInterface } from '../../interfaces/strafes.interface';
import { StrafesService } from '../../services/strafes.service';
import { Popup } from '../../components/popup/popup';
import { PopupPages } from '../../interfaces/popup-pages.interface';
import { InputService } from '../../services/input.service';

@Component({
	selector: 'app-lurch-trainer',
	imports: [Overlay, Popup],
	templateUrl: './lurch-trainer.html',
	styleUrl: './lurch-trainer.scss',
})
export class LurchTrainer implements OnInit {
	private strafesService = inject(StrafesService);
	private inputService = inject(InputService);
	strafes: StrafeInterface = [];
	training = false;
	protected popupVisible = false;
	protected popupPage: PopupPages = '';

	ngOnInit() {
		this.strafes = this.strafesService.strafes;
		const select = document.getElementById('strafeSelector');

		select?.addEventListener('change', (event) => {
			if (event.target instanceof HTMLSelectElement) {
				this.strafesService.updateSelectedStrafe(event.target.value);
			}
		});
	}

	toggleTraining(event: Event) {
		(event.target as HTMLElement).blur();
		this.training = !this.training;
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
