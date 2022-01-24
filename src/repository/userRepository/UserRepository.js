
import { usersMock } from "../../entities/userMock/users";


class UserRepository {


	getUsers() {
		showError('getUsers');
	}

	getUserById (id) {
		showError('getUserById(id)');
	}

	getUserByName(name) {
		showError('getUserByName(name)')
	}

	getCurrentUser(){
		showError('getCurrentUser')
	}

}

class UserRepositoryMock extends UserRepository {

	constructor(users, currentUser) {
		super();
		this.users = users
		this.currentUser = currentUser;
	}

	setCurrentUser (user){
		this.currentUser = user;
	}

	getUsers(){
		return this.users;
	}

	getCurrentUser(){
		return this.currentUser
	}

	getUserById(id){
		return this.users.find(user => user.id === id);
	}

	getUserByName(name){
		return this.users.find(user => user.name === name)
	}

}

export function getUserRepository() {
	const repositoryMock = new UserRepositoryMock(usersMock);
	repositoryMock.setCurrentUser(usersMock.find(user => user.name === 'Юлий'));
	return repositoryMock;
}