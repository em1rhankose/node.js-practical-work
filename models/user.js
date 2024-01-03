const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const User = sequelize.define("user", {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Ad Soyad Girmelisiniz !"
            },
            isFullname(value) {
                if (value.split(" ").length < 2) {
                    throw new Error("Lütfen Ad Ve Soyad Bilginizi Giriniz!");
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email Daha Önce Alınmış!"
        },
        validate: {
            notEmpty: {
                msg: "Email Girmelisiniz !"
            },
            isEmail: {
                msg: "Email Olmalıdır!"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Parola Boş Geçilemez!"    
            },
            len: {
                args: [5,10],
                msg: "Parola 5, 10 Karakter Uzunluğunda Olmalıdır!"
            }
        }
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { timestamps: true});

User.afterValidate( async (user)=>{
     user.password = await bcrypt.hash(password,10);    
})

module.exports = User;