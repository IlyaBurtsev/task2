import { v4 as uuidv4 } from 'uuid';

 export class User {
	constructor (user) {
		this.id = uuidv4();
		this.name = user.name;
		this.surname = user.surname;
		this.avatar = user.avatar;
	}

	userToString(){
		return this.name + ' ' + this.surname
	}


	getId () {
		return this.id
	}
}