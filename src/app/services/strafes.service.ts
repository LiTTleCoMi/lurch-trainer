import { Injectable } from '@angular/core';
import { StrafesInterface, StrafeItem } from '../interfaces/strafes.interface';

@Injectable({
	providedIn: 'root',
})
export class StrafesService {
	strafes: StrafesInterface = [
		{
			name: 'Forward RAS',
			directions: {
				direction1: ['a', 'aw', 'awd', 'd', 'ds'],
				direction2: ['d', 'dw', 'dwa', 'a', 'as'],
			},
		},
		{
			name: 'Backward RAS',
			directions: {
				direction1: ['a', 'as', 'asd', 'sd'],
				direction2: ['d', 'ds', 'dsa', 'sa'],
			},
		},
	];

	selectedStrafe: StrafeItem = this.strafes[0];

	updateSelectedStrafe(strafeName: string) {
		const strafe = this.strafes.filter((strafe) => strafe.name == strafeName);
		if (!strafe || strafe.length == 0) return;
		this.selectedStrafe = strafe[0];
		console.log(this.selectedStrafe.name);
	}
}
