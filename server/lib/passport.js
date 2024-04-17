global.passport = require('passport')
global.LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcryptjs')
const UserRepository = require('../repository/UserRepository')

const Repository = new UserRepository()

class Passport {
  constructor(app) {
    this.app = app
    this.initialize()
  }

  initialize() {
    global.passport.use(
      new global.LocalStrategy(
        {
          usernameField: 'username',
          passwordField: 'password'
        },
        async (username, password, done) => {
          const user = await Repository.Find({ Email: username })

          if (!user) {
            return done(null, false, {
              message: 'Username or password incorrect.'
            })
          } else {
            const validPassword = bcrypt.compareSync(password, user.Password)

            if (!validPassword) {
              return done(null, false, {
                message: 'Username or password incorrect.'
              })
            }

            const dbUser = {
              id: user._id.toString(),
              FirstName: user.FirstName,
              MiddleName: user.MiddleName,
              LastName: user.LastName,
              Email: user.Email
            }

            return done(null, dbUser)
          }
        }
      )
    )

    global.passport.serializeUser(function(user, done) {
      done(null, user.id)
    })

    global.passport.deserializeUser(async (id, done) => {
      try {
        const user = await Repository.Find({ _id: id })

        const dbUser = {
          _id: user._id.toString(),
          FirstName: user.FirstName,
          MiddleName: user.MiddleName,
          LastName: user.LastName,
          Email: user.Email
        }

        done(null, dbUser)
      } catch (err) {
        done(err, null)
      }
    })
  }
}

module.exports = Passport
