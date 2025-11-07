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

	private hasAction(action: BoundAction): boolean {
		return [...this.activeActions].some(
			(a) => a.action === action.action && a.useScroll === action.useScroll
		);
	}

	private removeAction(action: BoundAction) {
		this.activeActions = new Set(
			[...this.activeActions].filter(
				(a) => !(a.action === action.action && a.useScroll === action.useScroll)
			)
		);
	}

	pressKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action) return;
		const bound = this.getBoundAction(action, false);
		if (this.hasAction(bound)) return;

		this.activeActions.add(bound);
		this._activatedActions.next(new Set(this.activeActions));
	}

	releaseKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action) return;

		const bound = this.getBoundAction(action, false);
		this.removeAction(bound);
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
		this.removeAction(bound);
		this._activatedActions.next(new Set(this.activeActions));
	}
}
