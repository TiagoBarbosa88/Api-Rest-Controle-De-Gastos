import admin from "firebase-admin";


export async function authenticateToken(request,response, next) {

    const jwt = request.headers.authorization;
    if(!jwt){
        response.status(401).json({message: "Usuário não autorizado"});
        return
    }

    let decodeIdToken = "";
    try {
        decodeIdToken = await admin.auth().verifyIdToken(jwt, true);
    }catch(e) {
        response.status(401).json({message: "Usuário não autorizado"});
        return
    }
    request.user = {
        uid: decodeIdToken.sub
    }

    next();
}