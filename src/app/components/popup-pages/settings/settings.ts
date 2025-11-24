import { Component, inject } from '@angular/core';
import { InputType } from '../../../interfaces/actions.interface';
import { TrainerManagerService } from '../../../services/trainer-manager.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-settings',
	imports: [FormsModule],
	templateUrl: './settings.html',
	styleUrl: './settings.scss',
})
export class Settings {
	Input = InputType; // so the template can access Input.Key and Input.Scroll
	protected trainerManager = inject(TrainerManagerService);

	saveSettings() {
		localStorage.setItem('Settings', JSON.stringify(this.trainerManager.settings));
		// Display and hide success message
		const saveStatus = document.getElementById('save-status');
		if (saveStatus) {
			saveStatus.style.display = 'block';
			setTimeout(() => {
				saveStatus.style.display = 'none';
			}, 3000);
		}
	}
}
