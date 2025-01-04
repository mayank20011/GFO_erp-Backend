import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then((res) => {
    console.log(`Db Connected Successfully`);
  })
  .catch((err) => {
    console.log(`DB Connection refused ${err.message}`);
  });

// For Session
export const startSessionAndTransaction = (operations) => {
  return mongoose.startSession().then((session) => {
    session.startTransaction();
    return operations(session)
      .then(() => session.commitTransaction())
      .then(() => {
        console.log("Transaction committed.");
      })
      .catch((error) => {
        return session.abortTransaction().then(() => {
          console.error("Transaction aborted. Error:", error);
          throw error;
        });
      })
      .finally(() => session.endSession());
  });
};
