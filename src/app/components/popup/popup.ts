import { Component, input, output } from '@angular/core';
import { PopupPages } from '../../interfaces/popup-pages.interface';
import { Instructions } from "../popup-pages/instructions/instructions";
import { Keybinds } from "../popup-pages/keybinds/keybinds";

@Component({
	selector: 'app-popup',
	imports: [Instructions, Keybinds],
	templateUrl: './popup.html',
	styleUrl: './popup.scss',
})
export class Popup {
	visible = input.required<boolean>();
	page = input.required<PopupPages>();
	close = output();
	pageNames: Record<PopupPages, string> = {
		instructions: 'Instructions',
		keybinds: 'Keybinds',
		settings: 'Settings',
		'': '',
	};

	closePopup() {
		this.close.emit();
	}
}
