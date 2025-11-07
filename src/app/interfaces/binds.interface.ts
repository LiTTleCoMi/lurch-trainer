export type Action = 'forward' | 'backward' | 'left' | 'right' | 'jump';
export type ScrollDirection = 'up' | 'down';
export interface BoundAction {
	action: Action;
	useScroll: boolean;
}