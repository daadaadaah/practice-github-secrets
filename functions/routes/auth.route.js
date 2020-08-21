import express from 'express';

import auth from '../services/auth.service';

const router = express.Router();

router.post("/login", async (request, response) =>  {

  const { uid, email, photoURL } = request.body;

  const user = { 
    uid, 
    email, 
    photoURL 
  };

  const isUser = await auth.login(user.uid);

  if(isUser.exists) { // 이미 가입된 회원이 로그인 한 경우
    return response.status(201).json({ 
      message: "login successfully",
      body : {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
      }
    });
  }

  const newUser = {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: new Date().toISOString()
  };

  try {
    
    await auth.signup(newUser);

    return response.status(201).json({ 
      message: "signup successfully",
      body : {
        uid: newUser.uid,
        email: newUser.email,
        photoURL: newUser.photoURL,
      }
    });

  } catch (error) {
      return response.status(500).send(error);  
  }
});

export default router;