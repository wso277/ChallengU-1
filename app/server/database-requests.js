var db = require('./database-setup.js');

var getCategories = function (callback) {
    db.query("SELECT * FROM Category", [], callback);
};

var getUser = function (username,callback) {
    db.query("SELECT * FROM RegisteredUser WHERE username=" + "'" + username + "'", [], callback);
};

var insertChallenge = function (data, callback) {
    var name = data.name;
    var difficulty = data.difficulty;
    var type = data.type;
    var desc;
    if (data.description != "" && data.description != undefined) {
        desc = data.description;
    } else {
        desc = "";
    }

    var categories = [];
    for (var i = 0; i < data.category.length; i++) {
        categories[i] = data.category[i];
    }

    db.insertChallenge(name, difficulty, type, desc, categories, callback);
};

var getChallenge = function(challengeID, callback) {
    var queries = [];
    var     args = [];

    queries.push("SELECT username, content, difficulty, target, type" +
        "FROM Challenge INNER JOIN RegisteredUser" +
        "WHERE challengeID = $1::int");
    args.push([challengeID]);

    queries.push("SELECT name" +
        "FROM Category INNER JOIN ChallengeCategory" +
        "WHERE challengeID = $1::int");
    args.push([challengeID]);

    queries.push("SELECT rating" +
        "FROM RateChallenge" +
        "WHERE challengeID = $1::int");
    args.push([challengeID]);

    queries.push("SELECT username, content" +
        "FROM Comment INNER JOIN RegisteredUser" +
        "WHERE challengeID = $1::string");
    args.push([challengeID]);

    queries.push("SELECT Category.name" +
        "FROM ChallengeProof" +
        "WHERE challengeID = $1::string");
    args.push([challengeID]);

    db.transaction(queries, args, callback);
}

exports.getCategories = getCategories;
exports.getUser = getUser;
exports.insertChallenge = insertChallenge;
exports.getChallenge = getChallenge;
