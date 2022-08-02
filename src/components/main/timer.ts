export class Timer {
	targetDate: string | number | Date;

	constructor(targetDate: string) {
		this.targetDate = targetDate;
	}

	get actualDate() {
		return new Date();
	}

	get futureDate() {
		return new Date(this.targetDate);
	}

	get timeStampDiff() {
		return this.futureDate.getTime() - this.actualDate.getTime();
	}

	get days() {
		return Math.floor(this.timeStampDiff / (24 * 60 * 60 * 1000));
	}

	get hours() {
		return Math.floor(this.timeStampDiff / (60 * 60 * 1000));
	}

	get minutes() {
		return Math.floor(this.timeStampDiff / (60 * 1000));
	}

	get seconds() {
		return Math.floor(this.timeStampDiff / 1000);
	}

	get total() {
		const days = this.days;
		const hours = this.hours % 24;
		const minutes = this.minutes % 60;
		const seconds = this.seconds % 60;

		return [days, hours, minutes, seconds];
	}
}
