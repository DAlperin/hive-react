var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var googPassCred = require('../googPassCred.js')

function extractProfile (profile) {
  var imageUrl = '';
  if (profile.photos && profile.photos[0] && profile.photos[0].value) {
    imageUrl = profile.photos[0].value
  }
  return {
    id: profile.id,
    email: profile.emails[0].value,
    image: imageUrl
  };
}

function strategyConfig(connection){
    passport.use(
        new GoogleStrategy(googPassCred,
            function(accessToken, refreshToken, profile, done) {
                console.log(extractProfile(profile))
                console.log("SELECT * FROM hive1617.userDirectory " +
                            "WHERE emailID REGEXP " + "'" + profile.emails[0].value + 
                            "' OR altEmailStr REGEXP '" + profile.emails[0].value + "'")
                connection.query("SELECT * FROM hive1617.userDirectory WHERE " +
                            "emailID REGEXP " + "'" + profile.emails[0].value + 
                            "' OR altEmailStr REGEXP '" + profile.emails[0].value + "'",
                    function (err,rsl,fds){
                        if(err) throw err
                        if(rsl.length > 0){
                            console.log('rsl: ')
                            console.log(rsl)
                            done(null,rsl[0])
                        } else { done(null,extractProfile(profile))}
                    }
                )
            }
        )
    )
}

module.exports = {strategyConfig:strategyConfig, passport:passport}