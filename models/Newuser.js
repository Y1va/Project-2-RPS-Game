const {Model, DataTypes} = require ('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Newuser extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

// create class for page 2 of wireframe, This creates the  tablew for the databass.
//Use bcrypt node to encrypt the password when typed in.

Newuser.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNUll: false,
            validate: {
                isAlpha: true,
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNUll: false, 
            validate: {
                isAlpha: true,
            }
        },
        birthday: {
            type: DataTypes.STRING,
            validate: {
                isBefore: "2024-03-03",
                // change to current date
                isDate: true,
            }
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                isIn: { 
                    args: [['male, female']],
                    msg: "Either male or female"
            }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNUll: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNUll: false,
            validate: {
                isAlphanumeric: true,
            }
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
    },
    {
        // hooks when passing through new user data to be saved into database.
        hooks: {
            beforeCreate: async (newUserPassword) => {
                newUserPassword.password = await bcrypt.hash(newUserPassword.password, 10);
                return newUserPassword;
            },
            beforeCreate: async (newUsername) => {
               return newUsername;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Newuser',
    }
);

module.exports = Newuser;


// New User should have 
// First name, Lastname, Birthday, Gender, Username, Password(bycrypt), confirmpassword

