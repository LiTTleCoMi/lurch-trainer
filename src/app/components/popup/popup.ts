import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
	visible = input.required<boolean>()
	close = output();

	closePopup() {
		this.close.emit();
	}
}
