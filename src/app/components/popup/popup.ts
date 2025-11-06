import { Component, input, output } from '@angular/core';
import { PopupPages } from '../../interfaces/popup-pages.interface';

@Component({
	selector: 'app-popup',
	imports: [],
	templateUrl: './popup.html',
	styleUrl: './popup.scss',
})
export class Popup {
	visible = input.required<boolean>();
	page = input.required<PopupPages>();
	close = output();
	pageIds: Record<PopupPages, string> = {
		instructions: 'Instructions',
	};

	closePopup() {
		this.close.emit();
	}
}
