import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputService } from './services/input.service';
import { ScrollDirection } from './interfaces/actions.interface';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('lurch-trainer');
	private keyboardService = inject(InputService);

	constructor() {
		window.addEventListener('wheel', (event) => this.handleWheel(event));
	}

	private handleWheel(event: WheelEvent) {
		const direction = event.deltaY < 0 ? ScrollDirection.Up : ScrollDirection.Down;
		this.keyboardService.scroll(direction);
	}

	@HostListener('window:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		this.keyboardService.pressKey(event.key.toLowerCase());
	}

	@HostListener('window:keyup', ['$event'])
	handleKeyUp(event: KeyboardEvent) {
		this.keyboardService.releaseKey(event.key.toLowerCase());
	}
}
