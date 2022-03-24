// module.exports = (req, res, next) => {
//     if (!req.session.isLogged) {
//         return res.status(401).json({
//             data: 'error al iniciar sesion',
//             status: 404,
//         })
//     }
//     next();
// }