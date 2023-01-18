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
	imageUrl: string;
}

export interface IDuty {
	duty: {
		id: string;
		pharmacyId: string;
		month: string;
		startDate: string;
		endDate: string;
	};
	pharmacy: IPharmacy;
}

export interface IDuties {
	id: string;
	pharmacyId: string;
	month: string;
	startDate: string;
	endDate: string;
}
