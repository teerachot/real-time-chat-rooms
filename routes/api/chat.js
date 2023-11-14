import express from "express";
import { check, validationResult } from "express-validator";
import ChatRoom from "../../model/ChatRoom";

const router = express.Router();

router.post(
  "/room",
  [
    check("name", "Name is reqriued").not().isEmpty(),
    check("username", "username is reqriued").not().isEmpty(),
  ],
  (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }else{
        const {name,username} = req.body;
        const newRoom = new ChatRoom(name,username);
        newRoom.save()
        return res.status(200).json({message:"success"})
      }
      
      
    } catch (error) {
      console.log("error", error);
      res.status(500).send("server error");
    }
  }
);
