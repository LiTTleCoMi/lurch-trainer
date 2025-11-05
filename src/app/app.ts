import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyboardService } from './services/keyboard.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('lurch-trainer');
	private keyboardService = inject(KeyboardService);

	@HostListener('window:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		this.keyboardService.pressKey(event.key.toLowerCase());
	}

	@HostListener('window:keyup', ['$event'])
	handleKeyUp(event: KeyboardEvent) {
		this.keyboardService.releaseKey(event.key.toLowerCase());
	}
}
