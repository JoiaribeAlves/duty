export interface IFarmacy {
	_id: string;
	name: string;
	telephone: string;
	address: {
		street: string;
		number: number;
		district: string;
		complement: string;
		linkToMap: string;
		zipCode: string;
		city: string;
		state: string;
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
		address: {
			street: string;
			number: number;
			district: string;
			complement: string;
		}
	}
}

export interface IDuties {
	duties: IDuty[];
}
