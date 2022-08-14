export interface IFarmacy {
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
	pharmacy: IFarmacy;
}

export interface IDuties {
	id: string;
	startDate: Date;
	endDate: Date;
}
