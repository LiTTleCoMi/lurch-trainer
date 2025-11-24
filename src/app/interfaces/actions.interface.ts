export enum Action {
	Forward = 'forward',
	Backward = 'backward',
	Left = 'left',
	Right = 'right',
	Jump = 'jump',
}
export enum InputType {
	Key = 'key',
	Scroll = 'scroll',
}
export enum ScrollDirection {
	Up = 'up',
	Down = 'down',
}
export interface BoundAction {
	action: Action;
	useScroll: boolean;
}
