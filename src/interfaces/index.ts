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

export interface IFarmacies {
	pharmacies: IFarmacy[];
}

export interface IDuty {
	duty: {
		startDate: string;
		endDate: string;
	};
	pharmacy: IFarmacy;
}

export interface IDuties {
	duties: IDuty[];
}
