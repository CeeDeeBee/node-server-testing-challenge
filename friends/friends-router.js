const router = require("express").Router();

const Friends = require("./friends-model");

router.get("/", (req, res) => {
	Friends.getAll()
		.then((friends) => res.status(200).json(friends))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.post("/", (req, res) => {
	if (req.body.name && req.body.birthday) {
		Friends.create(req.body)
			.then(([friend]) => res.status(201).json(friend))
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err.message });
			});
	} else {
		res.status(401).json({ message: "Friend must include name and birthday" });
	}
});

module.exports = router;
