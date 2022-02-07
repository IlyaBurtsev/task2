
export class ToxinService{
	constructor(service){
		this.serviceFee = service.serviceFee;
		this.discount = service.discount;
		this.additionalServiceFee = service.additionalServiceFee;
	}

	getServiceFee(){
		return this.serviceFee;
	}

	getDiscount(){
		return this.discount;
	}

	getAdditionalServiceFee(){
		return this.additionalServiceFee;
	}
}