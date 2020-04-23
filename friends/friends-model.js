const db = require("../data/dbConfig");

module.exports = {
	getAll,
	getBy,
	create,
	deleteFriend,
};

function getAll() {
	return db("friends");
}

function getBy(filter) {
	return db("friends").where(filter);
}

function create(friend) {
	return db("friends")
		.insert(friend)
		.then(([id]) => getBy({ id }));
}

function deleteFriend(id) {
	return getBy({ id }).then(([friend]) => {
		return db("friends")
			.where({ id })
			.del()
			.then(() => friend);
	});
}
