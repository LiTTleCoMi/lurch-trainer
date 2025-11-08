import { Component, inject } from '@angular/core';
import { InputService } from '../../../services/input.service';
import { Action, ScrollDirection } from '../../../interfaces/binds.interface';

@Component({
	selector: 'app-keybinds',
	imports: [],
	templateUrl: './keybinds.html',
	styleUrl: './keybinds.scss',
})
export class Keybinds {
	private inputService = inject(InputService);
	protected rebindingScroll?: ScrollDirection;

	protected listenMode(event: Event, action: Action) {
		setTimeout(() => (event.target as HTMLElement).blur());
		this.inputService.rebindingKey = action;
	}

	protected actionIsListening(action: Action): boolean {
		return action === this.inputService.rebindingKey;
	}

	protected rebindScroll(action: Action) {
		if (!this.rebindingScroll) return;
		this.inputService.scrollBinds[this.rebindingScroll] = action;
		this.rebindingScroll = undefined;
		
		localStorage.setItem('ScrollBinds', JSON.stringify(this.inputService.scrollBinds));
	}

	protected rebindScrollDirection(direction: ScrollDirection) {
		this.rebindingScroll = direction;
	}

	protected rebindingScrollDirection(direction: ScrollDirection): boolean {
		return this.rebindingScroll === direction;
	}
}
