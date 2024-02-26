const express = require("express");
const User = require("../Modal/user_table");
const path = require("path");
const {checkUser} =require("../middleware/checkuser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const router = express.Router();


router.post("/registerevent", checkUser, async (req, res) => {
  try {
    const { eventId, user } = req.body;
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
        });
        return newUser.save();
      })
    );

    res.json({ message: "Users Added Successfully" });
  } catch (error) {
    console.error("Error in user registration route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/exportcsv", async (req, res) => {
  try {
    const { eventId } = req.body;
    const users = await User.find({ eventId: eventId });
    if (users.length === 0) {
      return res.status(404).json({ error: "No data to export" });
    }
    const filePath = path.join(__dirname, "exported_users.csv");
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: "eventId", title: "Event ID" },
        { id: "groupId", title: "Group ID" },
        { id: "email", title: "Email" },
        { id: "firstName", title: "First Name" },
        { id: "lastName", title: "Last Name" },
        { id: "contactNumber", title: "Contact Number" },
        { id: "dept", title: "Department" },
        { id: "college", title: "College" },
      ],
    });

    csvWriter
      .writeRecords(users)
      .then(() => {
        console.log("CSV file has been written successfully");
        res.json(users);
      })
      .catch((error) => {
        console.error("Error writing CSV file:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error in CSV export route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
