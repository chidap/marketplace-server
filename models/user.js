import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true
    },
    mobileNo: {
        type: String,
        trim: true,
        required: 'Mobile No is required',
        unique: true
    },
    userType: {
        type: String,
        trim: true,
        required: 'User Type is required'
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 24
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}

}, 
{ timestamps: true }
);

/**
 * While saving user, we need to make sure the password is hashed, not plain password
 * hashing should be domne only in 2 situations
 * 1. If it is the first time a user is being saved / created
 * 2. User has updated/modified the existing password
 * for handling such requirments, we can use 'pre' middleware in our schema
 * this middleware/ function will run each time user is saved/ created
 * and /or password is modified/ updated
 */

 userSchema.pre('save', function(next) {
     let user = this;
     // hash password only if user is changing the password or registering for the first time
     // make sure to use this otherwise eachtime user.save() is executed, password 
     // will get auto updated and you can't login with original password

     if ( user.isModified('password') ) {
         return bcrypt.hash(user.password, 12, function (err, hash) {
             if ( err ) {
                console.log("BCRYPT HASH ERROR", err );
                return next(err);
             }
             user.password = hash;
             return next();
         });
     } else {
         return next();
     }
 });

export default mongoose.model('User', userSchema);