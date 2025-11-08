import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action, BoundAction, ScrollDirection } from '../interfaces/binds.interface';

@Injectable({
	providedIn: 'root',
})
export class InputService {
	private _activatedActions = new BehaviorSubject<Set<BoundAction>>(new Set());
	activatedActions$ = this._activatedActions.asObservable();
	rebindingKey?: Action;

	private activeActions = new Set<BoundAction>();

	keyBinds: Record<Action, string> = {
		forward: 'w',
		backward: 's',
		left: 'a',
		right: 'd',
		jump: ' ',
	};
	scrollBinds: Record<ScrollDirection, Action> = {
		up: 'forward',
		down: 'jump',
	};

	constructor() {
		this.loadBinds();
	}

	private loadBinds() {
		const storedKeyBinds = localStorage.getItem('KeyBinds');
		const storedScrollBinds = localStorage.getItem('ScrollBinds');

		if (storedKeyBinds) {
			try {
				const parsed = JSON.parse(storedKeyBinds);
				if (typeof parsed === 'object' && parsed !== null) {
					for (const [key, value] of Object.entries(parsed)) {
						if (
							['forward', 'backward', 'left', 'right', 'jump'].includes(key) &&
							typeof value === 'string'
						) {
							this.keyBinds[key as Action] = value;
						} else {
							console.warn(`Ignoring invalid keyBind: ${key} -> ${value}`);
						}
					}
				}
			} catch (e) {
				console.warn('Invalid KeyBinds in localStorage, using defaults');
			}
		}

		if (storedScrollBinds) {
			try {
				const parsed = JSON.parse(storedScrollBinds);
				if (typeof parsed === 'object' && parsed !== null) {
					for (const [key, value] of Object.entries(parsed)) {
						if (
							['up', 'down'].includes(key) &&
							typeof value === 'string' &&
							['forward', 'backward', 'left', 'right', 'jump'].includes(value)
						) {
							this.scrollBinds[key as ScrollDirection] = value as Action;
						} else {
							console.warn(`Ignoring invalid scrollBind: ${key} -> ${value}`);
						}
					}
				}
			} catch (e) {
				console.warn('Invalid ScrollBinds in localStorage, using defaults');
			}
		}
	}

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
		// remove double key binds and set bind
		if (this.rebindingKey) {
			Object.keys(this.keyBinds).forEach((action) => {
				if (this.keyBinds[action as Action] === key) {
					this.keyBinds[action as Action] = '';
				}
			});
			this.keyBinds[this.rebindingKey] = key;
			this.rebindingKey = undefined;

			localStorage.setItem('KeyBinds', JSON.stringify(this.keyBinds));
		} else {
			const action = this.getActionFromKey(key);
			if (!action) return;
			const bound = this.getBoundAction(action, false);
			if (this.hasAction(bound)) return;

			this.activeActions.add(bound);
			this._activatedActions.next(new Set(this.activeActions));
		}
	}

	releaseKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action) return;

		const bound = this.getBoundAction(action, false);
		this.removeAction(bound);
		this._activatedActions.next(new Set(this.activeActions));
	}

	scroll(direction: ScrollDirection) {
		const action = this.scrollBinds[direction];
		if (!action) return;

		const bound = this.getBoundAction(action, true);
		this.activeActions.add(bound);
		this._activatedActions.next(new Set(this.activeActions));
		this.removeAction(bound);
		this._activatedActions.next(new Set(this.activeActions));
		this.updateScrollBuffer(direction);
	}

	scrollUpCount = 0;
	scrollDownCount = 0;
	scrollingUp = false;
	scrollingDown = false;
	private stopScrollingUp = setTimeout(() => {});
	private stopScrollingDown = setTimeout(() => {});
	private scrollBuffer = 70;

	updateScrollBuffer(direction: ScrollDirection) {
		if (direction === 'up') {
			clearTimeout(this.stopScrollingUp);
			this.scrollingUp = true;
			this.scrollUpCount++;
			this.stopScrollingUp = setTimeout(() => {
				this.scrollingUp = false;
				this.scrollUpCount = 0;
			}, this.scrollBuffer);
		} else {
			clearTimeout(this.stopScrollingDown);
			this.scrollingDown = true;
			this.scrollDownCount++;
			this.stopScrollingDown = setTimeout(() => {
				this.scrollingDown = false;
				this.scrollDownCount = 0;
			}, this.scrollBuffer);
		}
	}
}
