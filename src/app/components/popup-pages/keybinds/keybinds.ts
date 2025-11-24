import { Component, inject } from '@angular/core';
import { InputService } from '../../../services/input.service';
import { Action, ScrollDirection } from '../../../interfaces/actions.interface';

@Component({
	selector: 'app-keybinds',
	imports: [],
	templateUrl: './keybinds.html',
	styleUrl: './keybinds.scss',
})
export class Keybinds {
	protected inputService = inject(InputService);

	protected listenMode(event: Event, action: Action) {
		setTimeout(() => (event.target as HTMLElement).blur());
		this.inputService.rebindingKey = action;
	}

	protected actionIsListening(action: Action): boolean {
		return action === this.inputService.rebindingKey;
	}

	protected requestScrollRebind(direction: ScrollDirection) {
		if (this.inputService.rebindingScroll === direction) {
			this.inputService.rebindingScroll = undefined;
		} else {
			this.inputService.rebindingScroll = direction;
		}
	}

	protected rebindingScrollDirection(direction: ScrollDirection): boolean {
		return this.inputService.rebindingScroll === direction;
	}
}
