/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function(req, res, next) {
        if (req.param('id')) {
            Team.findOne(req.param('id'), function foundTeam(err, team) {
                if (err) return next(err);
                if (!team) return next();
                return res.json({team: team});
            });
        } else {
            Team.find(function foundTeams(err, teams) {
                if (err) return next(err);
                return res.json({teams: teams});
            });
        }
    }
};

