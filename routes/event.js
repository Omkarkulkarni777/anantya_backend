const express = require("express");
const Event = require("../Modal/event");

const router = express.Router();

router.post("/event", async (req, res) => {
  try {
    const { eventId } = req.body;
    const data = await Event.find({ eventId: eventId });
    res.json({ message: "Events Data Fetched Successfully", data });
  } catch (error) {
    console.error("Error in fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createevent", async (req, res) => {
  try {

    const {event}=req.body;
    const newevent = new Event({
      eventId: event.id,
      name: event.name,
      image: event.image,
      date: event.date,
      time: event.time,
      rulebook: event.rulebook,
      participateCount: event.participateCount,
      coordinator: event.coordinators.map(coordinator => ({ name: coordinator.name, contact: coordinator.contact })),
      amountfees: event.amountfees,
      ownermail:event.ownermail,
      password:event.password,
      eventDescription:event.eventDescription
    });
    
    await newevent.save();
    res.json({ message: "Events Data Added  Successfully"});
  } catch (error) {
    console.error("Error in fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
