import { serviceMock } from "../../entities/serviceMock/serviceMock";
import { showError } from "../../models/error/metodError";

class ServiceRepository{
	getServiceInfo(){
		showError('getServiceInfo')
	}
}

class ServiceRepositoryMock extends ServiceRepository{
	constructor(toxinService){
		super();
		this.serviceInfo = toxinService;
	}

	getServiceInfo(){
		return this.serviceInfo;
	}
}

export function getServiceRepository(){
	return new ServiceRepositoryMock(serviceMock)
}