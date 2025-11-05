import { Component, inject, OnInit } from '@angular/core';
import { Overlay } from "../../components/overlay/overlay";
import { StrafesInterface } from '../../interfaces/strafes.interface';
import { StrafesService } from '../../services/strafes.service';

@Component({
	selector: 'app-lurch-trainer',
	imports: [Overlay],
	templateUrl: './lurch-trainer.html',
	styleUrl: './lurch-trainer.scss',
})
export class LurchTrainer implements OnInit {
	private strafesService = inject(StrafesService);
	strafes: StrafesInterface = [];
	training = false;
	showInstructions = true;

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
	toggleShowInstructions() {
		this.showInstructions = !this.showInstructions;
	}
}
