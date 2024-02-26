const express = require("express");
const Event = require("../Modal/event");

const router = express.Router();

router.post("/event", async (req, res) => {
  try {
    const { eventId } = req.body;
    const data = await Event.find({ eventId: eventId });
    res.json({ message: "Events Fetched Successfully", data });
  } catch (error) {
    console.error("Error in fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createevent", async (req, res) => {
  try {

    const {event}=req.body;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const formattedTime = currentDate.toTimeString().slice(0, 8); 

    const newevent = new Event({
      eventId:event.id,
      name:event.name,
      image: event.image,
      date: formattedDate,
      time: formattedTime,
      rulebook:event.rulebook,
    });

    await newevent.save();
    res.json({ message: "Events Data Successfully"});
  } catch (error) {
    console.error("Error in fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
