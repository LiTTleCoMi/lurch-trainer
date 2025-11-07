import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Actions } from '../interfaces/binds.interface';

@Injectable({
	providedIn: 'root',
})
export class KeyboardService {
	private _activatedActions = new BehaviorSubject<Set<Actions>>(new Set());
	activatedActions$ = this._activatedActions.asObservable();

	private activeActions = new Set<Actions>();

	// action → key map
	actionBinds: Record<Actions, Set<string>> = {
		forward: new Set(['w']),
		backward: new Set(['s']),
		left: new Set(['a']),
		right: new Set(['d']),
		jump: new Set([' ']),
	};

	private getActionFromKey(key: string): Actions | undefined {
		return (Object.keys(this.actionBinds) as Actions[]).find((action) =>
			this.actionBinds[action].has(key)
		);
	}

	pressKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action || this.activeActions.has(action)) return;

		this.activeActions.add(action);
		this._activatedActions.next(new Set(this.activeActions));
	}

	releaseKey(key: string) {
		const action = this.getActionFromKey(key);
		if (!action) return;

		this.activeActions.delete(action);
		this._activatedActions.next(new Set(this.activeActions));
	}
}
