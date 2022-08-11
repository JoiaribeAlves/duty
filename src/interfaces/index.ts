export interface IFarmacy {
	id?: string;
	name: string;
	telephone: string;
	whatsapp?: string;
	address: {
		street: string;
		number: number;
		district: string;
		complement?: string;
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
	pharmacy: {
		name: string;
		telephone: string;
		whatsapp: string;
		address: {
			street: string;
			number: number;
			district: string;
			complement: string;
			linkToMap: string;
		};
	};
}

export interface IDuties {
	duties: IDuty[];
}
