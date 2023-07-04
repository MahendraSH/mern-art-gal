//  after login we will create a cookie and send it to the client
//  cooki contains the jwt token of loginToken 

const jwtcooki = async (res, statuscode, user) => {
    const loginToken = await user.getJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.Cookie_Expire * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,  //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
    };


    res.status(200).cookie("loginToken", loginToken, options).json({
        success: true,
        user,
        // loginToken,
    });

};

module.exports = jwtcooki;
//  these cookies are stored in the browser and sent to the server.
//  cookies conatin the jwt token of loginToken which we decode give back
//  the id of the user  

