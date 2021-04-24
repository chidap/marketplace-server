import User from '../models/user';

export const register = async(req, res ) => {
    //console.log(req.body);
    const { name, email, mobileNo, userType, password } = req.body;

    //////Validations
    if( !name ) return res.status(400).send('Name is required');
    if( !email ) return res.status(400).send('Email is required');
    if( !mobileNo ) return res.status(400).send('mobileNo is required');
    if( !userType ) return res.status(400).send('User Type is required');
    if( !password || password.length < 8 ) return res.status(400).send('Password is required and should be min 8 characters long' );

    let userExist = await User.findOne({ email}).exec()
    if ( userExist ) return res.status(400).send('Email is taken');

    ///////   Register //////////////////////
    const user = new User( req.body);
    try {
        await user.save();
        console.log('USER CREATED SUCCESSFULLy!', user );
        return res.json({ ok: true});
    } catch (err) {
        console.log('CREATE USER FAILED!', err);
        return res.status(400).send('Error. Try again.');
    }
};