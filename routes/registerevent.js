const express = require("express");
const User = require("../Modal/user_table");
const {checkUser} =require("../middleware/checkuser");

const router = express.Router();

router.post("/registerevent", checkUser, async (req, res) => {
  try {
    const { eventId, user,type} = req.body;
    const groupdata = await User.findOne({ eventId: eventId })
      .sort({ groupId: -1 })
      .exec();
    let groupId = 1;
    if (groupdata) {
      groupId = groupdata.groupId + 1;
    }

    await Promise.all(
      user.map(async (item) => {
        const newUser = new User({
          eventId: eventId,
          groupId: groupId,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          contactNumber: item.contactNumber,
          dept: item.dept,
          college: item.college,
          paid:(type==="PCCOE" ? true :false)
     });
        return newUser.save();
      })
    );

    res.json({ message: "Register Successfully" });
  } catch (error) {
    console.error("Error in user registration route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/register_data_event", async (req, res) => {
  try {
    const { eventId} = req.body;
    const result=User.find({eventId:eventId});
    res.json({ message: "Event Data Fetched Successfully",data:result});
  } catch (error) {
    console.error("Error in user registration route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
