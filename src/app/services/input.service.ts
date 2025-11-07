import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action, BoundAction } from '../interfaces/binds.interface';

@Injectable({
	providedIn: 'root',
})
export class InputService {
	private _activatedActions = new BehaviorSubject<Set<BoundAction>>(new Set());
	activatedActions$ = this._activatedActions.asObservable();

	private activeActions = new Set<BoundAction>();

	keyBinds: Record<Action, string> = {
		forward: 'w',
		backward: 's',
		left: 'a',
		right: 'd',
		jump: ' ',
	};

	scrollBinds: Record<Action, 'up' | 'down' | ''> = {
		forward: 'up',
		backward: '',
		left: '',
		right: '',
		jump: 'down',
	};

	private getActionFromKey(key: string): Action | undefined {
		return (Object.keys(this.keyBinds) as Action[]).find(
			(action) => this.keyBinds[action] === key
		);
	}

	private getBoundAction(action: Action, isScroll = false): BoundAction {
		return { action, useScroll: isScroll };
	}

	private hasAction(action: Action): boolean {
		return [...this.activeActions].some((a) => a.action === action);
	}

	private removeAction(action: Action) {
		this.activeActions = new Set([...this.activeActions].filter((a) => a.action !== action));
	}

	pressKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action || this.hasAction(action)) return;

		this.activeActions.add(this.getBoundAction(action, false));
		this._activatedActions.next(new Set(this.activeActions));
	}

	releaseKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action) return;

		this.removeAction(action);
		this._activatedActions.next(new Set(this.activeActions));
	}

	scroll(direction: 'up' | 'down') {
		const action = (Object.keys(this.scrollBinds) as Action[]).find(
			(a) => this.scrollBinds[a] === direction
		);

		if (!action) return;

		// Simulate a quick scroll action (momentary press)
		const bound = this.getBoundAction(action, true);
		this.activeActions.add(bound);
		this._activatedActions.next(new Set(this.activeActions));

		// Remove it after a short timeout
		setTimeout(() => {
			this.removeAction(action);
			this._activatedActions.next(new Set(this.activeActions));
		}, 10);
	}
}
