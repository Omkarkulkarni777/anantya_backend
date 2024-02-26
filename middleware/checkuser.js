
const User = require("../Modal/user_table");

const checkUser = async (req, res, next) => {
    try {
      const { eventId, user } = req.body;
      
      const existingUsers = await Promise.all(user.map(item => 
        User.findOne({
          email: item.email,
          eventId: eventId,
        })
      ));
  
      const duplicateUser = existingUsers.find(existingUser => existingUser !== null);
  
      if (duplicateUser) {
        return res.status(401).json({ error: "One of Email already exists Of This Event" });
      }
  
      next();
    } catch (error) {
      console.error("Error checking user:", error);
      next(error);
    }
  };

module.exports={checkUser};
  