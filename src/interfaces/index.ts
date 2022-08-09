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
