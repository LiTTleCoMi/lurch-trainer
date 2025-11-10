import { Component, inject } from '@angular/core';
import { Input } from '../../../interfaces/binds.interface';
import { TrainerManagerService } from '../../../services/trainer-manager.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-settings',
	imports: [FormsModule],
	templateUrl: './settings.html',
	styleUrl: './settings.scss',
})
export class Settings {
	Input = Input; // so the template can access Input.Key and Input.Scroll
	protected trainerManager = inject(TrainerManagerService);

	saveSettings() {
		localStorage.setItem("Settings", JSON.stringify(this.trainerManager.settings));
	}
}
