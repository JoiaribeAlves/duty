export interface IPharmacy {
	id: string;
	name: string;
	telephone: string;
	whatsapp: string;
	address: {
		city: string;
		state: string;
		street: string;
		number: number;
		district: string;
		complement: string;
		linkToMap: string;
	};
}

export interface IDuty {
	duty: {
		startDate: Date;
		endDate: Date;
	};
	pharmacy: IPharmacy;
}

export interface IDuties {
	id: string;
	startDate: Date;
	endDate: Date;
}

export interface IUser {
	user?: string;
	token?: string;
}

export interface IContext {
	loading: boolean;
	errorMsg: boolean;
	authenticated: boolean;
	user: IUser | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}
