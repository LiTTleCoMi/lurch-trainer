import { Injectable } from '@angular/core';
import { StrafeInterface, StrafeItem } from '../interfaces/strafes.interface';

@Injectable({
	providedIn: 'root',
})
export class StrafesService {
	strafes: StrafeInterface = [
		{
			name: 'Forward RAS',
			directions: {
				direction1: [
					['left'],
					['left', 'forward'],
					['left', 'forward', 'right'],
					['right'],
					['right', 'backward'],
				],
				direction2: [
					['right'],
					['right', 'forward'],
					['right', 'forward', 'left'],
					['left'],
					['left', 'backward'],
				],
			},
		},
		{
			name: 'Backward RAS',
			directions: {
				direction1: [
					['left'],
					['left', 'backward'],
					['left', 'backward', 'right'],
					['backward', 'right'],
				],
				direction2: [
					['right'],
					['right', 'backward'],
					['right', 'backward', 'left'],
					['backward', 'left'],
				],
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
