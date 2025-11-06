import { Component, inject, OnInit } from '@angular/core';
import { Overlay } from "../../components/overlay/overlay";
import { StrafesInterface } from '../../interfaces/strafes.interface';
import { StrafesService } from '../../services/strafes.service';
import { Popup } from "../../components/popup/popup";

@Component({
	selector: 'app-lurch-trainer',
	imports: [Overlay, Popup],
	templateUrl: './lurch-trainer.html',
	styleUrl: './lurch-trainer.scss',
})
export class LurchTrainer implements OnInit {
	private strafesService = inject(StrafesService);
	strafes: StrafesInterface = [];
	training = false;
	popupVisible = false;
	popupPages = {
		instructions: false,
	};

	ngOnInit() {
		this.strafes = this.strafesService.strafes;
		const select = document.getElementById('strafeSelector');

		select?.addEventListener('change', (event) => {
			if (event.target instanceof HTMLSelectElement) {
				this.strafesService.updateSelectedStrafe(event.target.value);
			}
		});
	}

	toggleTraining() {
		this.training = !this.training;
	}
	showPopup() {
		this.popupVisible = true;
	}
	hidePopup() {
		this.popupVisible = false;
	}
}
